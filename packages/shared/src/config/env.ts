// Environment configuration utilities
import { Environment } from '../types/common';

export const getEnvironment = (): Environment => {
  const env = process.env.NODE_ENV || 'development';
  return env as Environment;
};

export const isDevelopment = (): boolean => {
  return getEnvironment() === 'development';
};

export const isProduction = (): boolean => {
  return getEnvironment() === 'production';
};

export const isStaging = (): boolean => {
  return getEnvironment() === 'staging';
};

export const isTest = (): boolean => {
  return process.env.NODE_ENV === 'test';
};

export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value || defaultValue!;
};

export const getEnvVarAsNumber = (key: string, defaultValue?: number): number => {
  const value = getEnvVar(key, defaultValue?.toString());
  const num = parseInt(value, 10);
  if (isNaN(num)) {
    throw new Error(`Environment variable ${key} must be a valid number`);
  }
  return num;
};

export const getEnvVarAsBoolean = (key: string, defaultValue?: boolean): boolean => {
  const value = getEnvVar(key, defaultValue?.toString());
  return value === 'true' || value === '1' || value === 'yes';
};

export const getEnvVarAsArray = (key: string, separator: string = ',', defaultValue?: string[]): string[] => {
  const value = getEnvVar(key, defaultValue?.join(separator));
  return value ? value.split(separator).map(item => item.trim()).filter(Boolean) : [];
};

export const validateRequiredEnvVars = (requiredVars: string[]): void => {
  const missing = requiredVars.filter(varName => !process.env[varName]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

export const getAppConfig = () => {
  return {
    environment: getEnvironment(),
    port: getEnvVarAsNumber('PORT', 3001),
    database: {
      host: getEnvVar('DB_HOST', 'localhost'),
      port: getEnvVarAsNumber('DB_PORT', 5432),
      name: getEnvVar('DB_NAME', 'agentic_todo_list'),
      username: getEnvVar('DB_USERNAME', 'postgres'),
      password: getEnvVar('DB_PASSWORD', 'postgres'),
    },
    cors: {
      origin: getEnvVarAsArray('CORS_ORIGIN', ',', ['http://localhost:3000']),
    },
    jwt: {
      secret: getEnvVar('JWT_SECRET', 'your-super-secret-jwt-key-change-in-production'),
      expiresIn: getEnvVar('JWT_EXPIRES_IN', '7d'),
    },
  };
};

export const getDatabaseConfig = () => {
  return {
    host: getEnvVar('DB_HOST', 'localhost'),
    port: getEnvVarAsNumber('DB_PORT', 5432),
    name: getEnvVar('DB_NAME', 'agentic_todo_list'),
    username: getEnvVar('DB_USERNAME', 'postgres'),
    password: getEnvVar('DB_PASSWORD', 'postgres'),
    synchronize: isDevelopment(),
    logging: isDevelopment(),
  };
};

export const getCorsConfig = () => {
  return {
    origin: getEnvVarAsArray('CORS_ORIGIN', ',', ['http://localhost:3000']),
    credentials: true,
  };
};

export const getJwtConfig = () => {
  return {
    secret: getEnvVar('JWT_SECRET', 'your-super-secret-jwt-key-change-in-production'),
    expiresIn: getEnvVar('JWT_EXPIRES_IN', '7d'),
  };
};
