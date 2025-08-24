// API constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

// API Endpoints
export const API_ENDPOINTS = {
  // Health
  HEALTH: '/health',
  INFO: '/info',
  
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Users
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    AVATAR: '/users/avatar',
  },
  
  // Todos
  TODOS: {
    BASE: '/todos',
    TOGGLE: (id: string) => `/todos/${id}/toggle`,
    BY_ID: (id: string) => `/todos/${id}`,
  },
} as const;

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Request/Response headers
export const HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  USER_AGENT: 'User-Agent',
  CACHE_CONTROL: 'Cache-Control',
} as const;

// Content types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  TEXT: 'text/plain',
  HTML: 'text/html',
} as const;

// Timeouts
export const TIMEOUTS = {
  REQUEST: 10000, // 10 seconds
  UPLOAD: 30000, // 30 seconds
  DOWNLOAD: 60000, // 60 seconds
} as const;
