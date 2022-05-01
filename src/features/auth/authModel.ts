export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  username: string;
  password: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
