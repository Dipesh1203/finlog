import api from './api';
import { User, Expense, LoginRequest, SignupRequest } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<{ token: string; user: User }> {
    try {
      const response = await api.post('/public/user/login', credentials);
      const token = response.data;
      
      if (token) {
        await AsyncStorage.setItem('jwt_token', token);
        // You might want to decode the JWT to get user info or make another API call
        const userInfo = { userName: credentials.userName, name: '', email: '' };
        await AsyncStorage.setItem('user_data', JSON.stringify(userInfo));
        return { token, user: userInfo };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async signup(userData: SignupRequest): Promise<boolean> {
    try {
      const response = await api.post('/public/user/sign-up', userData);
      return response.data === true;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    await AsyncStorage.removeItem('jwt_token');
    await AsyncStorage.removeItem('user_data');
  }

  static async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('jwt_token');
    return !!token;
  }

  static async getCurrentUser(): Promise<User | null> {
    const userData = await AsyncStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }
}

export class ExpenseService {
  static async getAllExpenses(): Promise<Expense[]> {
    try {
      const response = await api.get('/expense/all');
      return response.data || [];
    } catch (error) {
      console.error('Get expenses error:', error);
      throw error;
    }
  }

  static async createExpense(expense: Omit<Expense, 'id' | 'sender'>): Promise<Expense> {
    try {
      const response = await api.post('/expense/create', expense);
      return response.data;
    } catch (error) {
      console.error('Create expense error:', error);
      throw error;
    }
  }

  static async updateExpense(id: string, expense: Omit<Expense, 'id' | 'sender'>): Promise<Expense> {
    try {
      const response = await api.put(`/expense/${id}`, expense);
      return response.data;
    } catch (error) {
      console.error('Update expense error:', error);
      throw error;
    }
  }

  static async deleteExpense(id: string): Promise<void> {
    try {
      await api.delete(`/expense/${id}`);
    } catch (error) {
      console.error('Delete expense error:', error);
      throw error;
    }
  }

  static async getExpense(id: string): Promise<Expense> {
    try {
      const response = await api.get(`/expense/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get expense error:', error);
      throw error;
    }
  }
}