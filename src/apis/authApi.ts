import axiosApi, { DataResponse } from 'app/axiosApi';
import { setStorage } from 'common/logic/storage';
import { setToken } from 'common/logic/token';
import { LoginRequest, RegisterRequest, User } from 'features/auth/authModel';

const login = async (body: LoginRequest) => {
  return axiosApi.post<DataResponse<string>>('auth/login', body).then((res) => {
    const token = res.data.data;
    setStorage('token', token);
    setToken(token);
    return res.data;
  });
};

const register = async (body: RegisterRequest) => {
  return axiosApi.post<DataResponse<User>>('auth/register', body).then((res) => res.data);
};

const getCurrentUser = async () => {
  return axiosApi.get<DataResponse<User>>('auth/user').then((res) => res.data);
};

const authApi = {
  login,
  register,
  getCurrentUser
};

export default authApi;
