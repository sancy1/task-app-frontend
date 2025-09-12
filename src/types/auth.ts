
// src/types/auth.ts

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
  deviceId?: string;
}

// ✅ backend returns ApiResponse<LoginPayload>
export type LoginResponse = ApiResponse<LoginPayload>;
