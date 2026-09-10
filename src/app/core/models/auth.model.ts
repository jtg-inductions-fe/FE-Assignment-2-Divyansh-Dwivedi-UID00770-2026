export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponseData {
  user: LoginUser;
  token: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
  timestamp: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: RegisterResponseData;
  timestamp: string;
}

export interface RegisterResponseData {
  user: RegisterUser;
  token: string;
}
export interface RegisterUser {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
