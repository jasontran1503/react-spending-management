import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'apis/authApi';
import { DataResponse } from 'app/axiosApi';
import { useToastify } from 'common/hooks/useToastify';
import { history } from 'common/logic/history';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { LoginRequest, RegisterRequest, User } from './authModel';
import { authActions } from './authSlice';

function* handleLogin(action: PayloadAction<LoginRequest>) {
  const toastify = useToastify;
  try {
    const response: DataResponse<string> = yield call(authApi.login, action.payload);
    yield put(authActions.loginSuccess(response));
    yield call(history.push, '/expenses');
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(authActions.loginFail(error as DataResponse<null>));
    yield call(toastify, 'error', errorResponse?.message);
  }
}

function* handleRegister(action: PayloadAction<RegisterRequest>) {
  const toastify = useToastify;
  try {
    const response: DataResponse<User> = yield call(authApi.register, action.payload);
    yield put(authActions.registerSuccess(response));
    yield call(toastify, 'success', response.message);
    yield call(history.push, '/auth/login');
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(authActions.registerFail());
    yield call(toastify, 'error', errorResponse?.message);
  }
}

function* handleGetCurrentUser() {
  const toastify = useToastify;
  try {
    const response: DataResponse<User> = yield call(authApi.getCurrentUser);
    yield put(authActions.getCurrentUserSuccess(response));
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(authActions.getCurrentUserFail());
    yield call(toastify, 'error', errorResponse?.message);
  }
}

export default function* authSaga() {
  yield takeLeading(authActions.loginBegin.type, handleLogin);
  yield takeLeading(authActions.registerBegin.type, handleRegister);
  yield takeEvery(authActions.getCurrentUserBegin.type, handleGetCurrentUser);
}
