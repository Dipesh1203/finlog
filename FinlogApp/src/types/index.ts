export interface User {
  id?: string;
  userName: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export interface Expense {
  id?: string;
  description: string;
  amount: number;
  date: string;
  categories: string[];
  sender?: User;
  receiver?: User;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface SignupRequest {
  userName: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}