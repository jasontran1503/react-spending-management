import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { history } from 'common/logic/history';
import { removeStorage } from 'common/logic/storage';

export interface DataResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const axiosApi = axios.create({
  // baseURL: 'http://localhost:8000/api/',
  baseURL: 'https://spending-management.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosApi.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        history.push('/auth/login');
        removeStorage('token');
        break;
      case 404:
        // case 403:
        // navigate('/');
        break;
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosApi;
