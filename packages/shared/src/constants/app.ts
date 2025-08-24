// Application constants
export const APP_NAME = 'Agentic Todo List';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'A modern todo list application built with Next.js and NestJS';

// Environment
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_TEST = NODE_ENV === 'test';

// Ports
export const DEFAULT_BACKEND_PORT = 3001;
export const DEFAULT_FRONTEND_PORT = 3000;

// Database
export const DEFAULT_DB_HOST = 'localhost';
export const DEFAULT_DB_PORT = 5432;
export const DEFAULT_DB_NAME = 'agentic_todo_list';
export const DEFAULT_DB_USERNAME = 'postgres';
export const DEFAULT_DB_PASSWORD = 'postgres';

// JWT
export const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// CORS
export const DEFAULT_CORS_ORIGIN = 'http://localhost:3000';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
export const MIN_PAGE_SIZE = 1;

// File uploads
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const UPLOAD_DIR = 'uploads';

// Cache
export const CACHE_TTL = 300; // 5 minutes
export const CACHE_MAX_SIZE = 1000;

// Rate limiting
export const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;
