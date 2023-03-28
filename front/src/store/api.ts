// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const API_URL = 'https://j8d109.p.ssafy.io/';

// function API() {
//   const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));

//   useEffect(() => {
//     const updateAccessToken = () => {
//       setAccessToken(Cookies.get('access_token'));
//     };

//     // access_token 값 변경 시 호출
//     updateAccessToken();
//     const intervalId = setInterval(updateAccessToken, 5000);
//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     const apiClient = axios.create({
//       baseURL: API_URL,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     // GET 요청 함수
//     const get = async (url: string): Promise<any> => {
//       try {
//         const response = await apiClient.get(url);
//         return response.data;
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     };

//     // POST 요청 함수
//     const post = async (url: string, data: any): Promise<any> => {
//       try {
//         const response = await apiClient.post(url, data);
//         return response.data;
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     };

//     // PUT 요청 함수
//     const put = async (url: string, data: any): Promise<any> => {
//       try {
//         const response = await apiClient.put(url, data);
//         return response.data;
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     };

//     // DELETE 요청 함수
//     const deleteRequest = async (url: string): Promise<any> => {
//       try {
//         const response = await apiClient.delete(url);
//         return response.data;
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     };

//     // API 클라이언트 객체 반환
//     return {
//       get,
//       post,
//       put,
//       deleteRequest,
//     };
//   }, [accessToken]);

//   // `API` 객체를 반환하는 코드는 삭제합니다.
// }

// export default API;
import React, { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://j8d109.p.ssafy.io/';

function API(): AxiosInstance {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    Cookies.get('access_token')
  );

  useEffect(() => {
    // Listen for changes to access_token cookie and update the state accordingly
    const handleAccessTokenChange = () => {
      setAccessToken(Cookies.get('access_token'));
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

  // Interceptor to refresh the access token if it has expired
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await apiClient.post('/api/auth/refresh', {
            refresh_token: Cookies.get('refresh_token'),
          });
          const newAccessToken = response.data.access_token;
          Cookies.set('access_token', newAccessToken);
          window.dispatchEvent(new Event('access_token_change'));
          return apiClient(originalRequest);
        } catch (error) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
}

export default API;
