import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// const API_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = 'https://j8d109.p.ssafy.io/api/';

const API: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const responseStatus = error?.response?.status || null;
    console.log(`Error: ${responseStatus}`);
    // Handle error cases
    return Promise.reject(error);
  }
);

export default API;
