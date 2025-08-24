import axios from 'axios';
import { Todo, User, ApiResponse } from '@agentic-todo-list/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

// Todos API
export const todosAPI = {
  getAll: async (): Promise<ApiResponse<Todo[]>> => {
    const response = await api.get('/todos');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Todo>> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  create: async (todo: Partial<Todo>): Promise<ApiResponse<Todo>> => {
    const response = await api.post('/todos', todo);
    return response.data;
  },

  update: async (id: string, todo: Partial<Todo>): Promise<ApiResponse<Todo>> => {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  toggleComplete: async (id: string, completed: boolean): Promise<ApiResponse<Todo>> => {
    const response = await api.put(`/todos/${id}`, { completed });
    return response.data;
  },
};

export default api;
