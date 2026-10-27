export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: TokenInfo;
  user: UserResponse;
}

export interface TokenInfo {
  key: string;
  expiryTime: string;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastModified: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: TokenInfo;
  user: UserResponse;
}

export interface LogoutResponse {
  status: boolean;
}
