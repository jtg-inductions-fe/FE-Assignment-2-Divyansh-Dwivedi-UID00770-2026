export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
  timestamp: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
