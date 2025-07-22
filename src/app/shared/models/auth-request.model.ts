export interface LoginRequest {
  username: string;
  password: string;
  role?: string;
}

export interface RegisterRequest extends LoginRequest {
  email: string;
}