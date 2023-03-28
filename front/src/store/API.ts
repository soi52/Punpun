import React, { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://j8d109.p.ssafy.io/';

function API(): AxiosInstance {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    Cookies.get('accessToken')
  );

  useEffect(() => {
    const handleAccessTokenChange = () => {
      setAccessToken(Cookies.get('accessToken'));
    };
    window.addEventListener('access_token_change', handleAccessTokenChange);
    return () => {
      window.removeEventListener(
        'access_token_change',
        handleAccessTokenChange
      );
    };
  }, []);

  const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await apiClient.post('/api/auth/refresh', {
            refresh_token: Cookies.get('refreshToken'),
          });
          const newAccessToken = response.data.access_token;
          Cookies.set('accessToken', newAccessToken);
          window.dispatchEvent(new Event('access_token_change'));
          return apiClient(originalRequest);
        } catch (error) {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
}

export default API;
