import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://j8d109.p.ssafy.io/';

function API() {
  const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));

  useEffect(() => {
    // access_token 값 변경 시 호출
    setAccessToken(Cookies.get('access_token'));
  }, []);

  const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // GET 요청 함수
  const get = async (url: string): Promise<any> => {
    try {
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // POST 요청 함수
  const post = async (url: string, data: any): Promise<any> => {
    try {
      const response = await apiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // PUT 요청 함수
  const put = async (url: string, data: any): Promise<any> => {
    try {
      const response = await apiClient.put(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // DELETE 요청 함수
  const deleteRequest = async (url: string): Promise<any> => {
    try {
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    deleteRequest,
  };
}

export default API;
