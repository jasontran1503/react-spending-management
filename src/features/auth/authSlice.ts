import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataResponse } from 'app/axiosApi';
import { RootState } from 'app/store';
import { removeStorage } from 'common/logic/storage';
import { AuthState, User } from './authModel';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Log out
    logout: (state) => {
      removeStorage('token');
      state.isAuthenticated = false;
    },

    // Login
    loginBegin: (state, action) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<DataResponse<string>>) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    loginFail: (state, action: PayloadAction<DataResponse<null>>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    },

    // Register
    registerBegin: (state, action) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action: PayloadAction<DataResponse<User>>) => {
      state.isLoading = false;
    },
    registerFail: (state) => {
      state.isLoading = false;
    },

    // Get current user
    getCurrentUserBegin: (state) => {
      state.isLoading = true;
    },
    getCurrentUserSuccess: (state, action: PayloadAction<DataResponse<User>>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
    },
    getCurrentUserFail: (state) => {
      state.isLoading = false;
      state.user = null;
    }
  }
});

export const authActions = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

const authReducer = authSlice.reducer;
export default authReducer;
