// Main entry point for the shared package
export * from './types';
export * from './constants';
export * from './utils';
export * from './config';
export * from './logger';

// Legacy exports for backward compatibility
export { Todo } from './types/todo';
export { User } from './types/user';
export { BaseEntity } from './types/common';
export { APP_NAME, APP_VERSION } from './constants/app';
export { TODO_PRIORITIES } from './constants/validation';
export { API_BASE_URL, API_ENDPOINTS } from './constants/api';
export { logInfo, logError, logWarn, logDebug } from './logger/logger';
