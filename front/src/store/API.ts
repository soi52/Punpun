import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://j8d109.p.ssafy.io/api/';

const API: AxiosInstance = axios.create({
  baseURL: API_URL,
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
    // const {
    //   response: { status },
    // } = error;
    console.log(error);
    // Handle error cases
    return Promise.reject(error);
  }
);

export default API;