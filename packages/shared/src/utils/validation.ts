// Validation utility functions
import { VALIDATION } from '../constants/validation';

export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return VALIDATION.PASSWORD_REGEX.test(password);
};

export const validateTitle = (title: string): { isValid: boolean; error?: string } => {
  if (!title || title.trim().length === 0) {
    return { isValid: false, error: 'Title is required' };
  }
  
  if (title.length < VALIDATION.MIN_TITLE_LENGTH) {
    return { isValid: false, error: `Title must be at least ${VALIDATION.MIN_TITLE_LENGTH} characters` };
  }
  
  if (title.length > VALIDATION.MAX_TITLE_LENGTH) {
    return { isValid: false, error: `Title must be no more than ${VALIDATION.MAX_TITLE_LENGTH} characters` };
  }
  
  return { isValid: true };
};

export const validateDescription = (description: string): { isValid: boolean; error?: string } => {
  if (description && description.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
    return { isValid: false, error: `Description must be no more than ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters` };
  }
  
  return { isValid: true };
};

export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (name.length < VALIDATION.MIN_NAME_LENGTH) {
    return { isValid: false, error: `Name must be at least ${VALIDATION.MIN_NAME_LENGTH} characters` };
  }
  
  if (name.length > VALIDATION.MAX_NAME_LENGTH) {
    return { isValid: false, error: `Name must be no more than ${VALIDATION.MAX_NAME_LENGTH} characters` };
  }
  
  return { isValid: true };
};

export const validatePasswordStrength = (password: string): { isValid: boolean; error?: string } => {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    return { isValid: false, error: `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters` };
  }
  
  if (password.length > VALIDATION.MAX_PASSWORD_LENGTH) {
    return { isValid: false, error: `Password must be no more than ${VALIDATION.MAX_PASSWORD_LENGTH} characters` };
  }
  
  if (!VALIDATION.PASSWORD_REGEX.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' };
  }
  
  return { isValid: true };
};

export const validatePriority = (priority: string): { isValid: boolean; error?: string } => {
  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(priority)) {
    return { isValid: false, error: 'Invalid priority level' };
  }
  
  return { isValid: true };
};

export const validateFileSize = (fileSize: number, maxSize: number = VALIDATION.MAX_FILE_SIZE): { isValid: boolean; error?: string } => {
  if (fileSize > maxSize) {
    return { isValid: false, error: `File size must be no more than ${formatFileSize(maxSize)}` };
  }
  
  return { isValid: true };
};

export const validateFileType = (fileType: string, allowedTypes: readonly string[] = VALIDATION.ALLOWED_IMAGE_TYPES): { isValid: boolean; error?: string } => {
  if (!allowedTypes.includes(fileType)) {
    return { isValid: false, error: `File type ${fileType} is not allowed` };
  }
  
  return { isValid: true };
};

export const validatePagination = (page: number, limit: number): { isValid: boolean; error?: string } => {
  if (page < VALIDATION.MIN_PAGE || page > VALIDATION.MAX_PAGE) {
    return { isValid: false, error: `Page must be between ${VALIDATION.MIN_PAGE} and ${VALIDATION.MAX_PAGE}` };
  }
  
  if (limit < VALIDATION.MIN_LIMIT || limit > VALIDATION.MAX_LIMIT) {
    return { isValid: false, error: `Limit must be between ${VALIDATION.MIN_LIMIT} and ${VALIDATION.MAX_LIMIT}` };
  }
  
  return { isValid: true };
};

export const validateSearchQuery = (query: string): { isValid: boolean; error?: string } => {
  if (query && query.length < VALIDATION.MIN_SEARCH_LENGTH) {
    return { isValid: false, error: `Search query must be at least ${VALIDATION.MIN_SEARCH_LENGTH} characters` };
  }
  
  if (query && query.length > VALIDATION.MAX_SEARCH_LENGTH) {
    return { isValid: false, error: `Search query must be no more than ${VALIDATION.MAX_SEARCH_LENGTH} characters` };
  }
  
  return { isValid: true };
};

// Helper function for file size formatting
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
