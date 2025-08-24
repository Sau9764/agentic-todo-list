import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { logError, logInfo } from '@agentic-todo-list/shared';
import { Todo } from '@agentic-todo-list/shared';

// API Response types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
  
  const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      logInfo(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        method: config.method,
        url: config.url,
        data: config.data,
      });
      return config;
    },
    (error) => {
      logError('API Request Error', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      logInfo(`API Response: ${response.status} ${response.config.url}`, {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
      return response;
    },
    (error: AxiosError) => {
      logError('API Response Error', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
      return Promise.reject(error);
    }
  );

  return api;
};

// API client instance
const apiClient = createApiClient();

// API methods
export const api = {
  // Health check
  health: {
    check: () => apiClient.get<ApiResponse>('/health'),
    info: () => apiClient.get<ApiResponse>('/info'),
  },

  // Todos
  todos: {
    getAll: () => apiClient.get<PaginatedResponse<Todo>>('/todos'),
    getById: (id: string) => apiClient.get<ApiResponse<Todo>>(`/todos/${id}`),
    create: (data: Partial<Todo>) => apiClient.post<ApiResponse<Todo>>('/todos', data),
    update: (id: string, data: Partial<Todo>) => 
      apiClient.patch<ApiResponse<Todo>>(`/todos/${id}`, data),
    delete: (id: string) => apiClient.delete(`/todos/${id}`),
    toggleComplete: (id: string) => 
      apiClient.patch<ApiResponse<Todo>>(`/todos/${id}/toggle`),
  },
};

// Export types
export type { ApiResponse, PaginatedResponse };

// Export axios instance for custom requests
export default apiClient;
