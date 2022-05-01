import axiosApi from 'app/axiosApi';

export function setToken(token: string | null) {
  if (token) {
    axiosApi.defaults.headers.common['Authorization'] = token;
  } else {
    delete axiosApi.defaults.headers.common['Authorization'];
  }
}
