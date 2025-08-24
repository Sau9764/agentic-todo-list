// Error and success messages
export const MESSAGES = {
  // Success messages
  SUCCESS: {
    TODO_CREATED: 'Todo created successfully',
    TODO_UPDATED: 'Todo updated successfully',
    TODO_DELETED: 'Todo deleted successfully',
    TODO_TOGGLED: 'Todo status updated successfully',
    USER_CREATED: 'User created successfully',
    USER_UPDATED: 'User updated successfully',
    USER_DELETED: 'User deleted successfully',
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    PASSWORD_CHANGED: 'Password changed successfully',
    PROFILE_UPDATED: 'Profile updated successfully',
  },
  
  // Error messages
  ERROR: {
    // General
    INTERNAL_SERVER_ERROR: 'Internal server error',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    VALIDATION_ERROR: 'Validation error',
    BAD_REQUEST: 'Bad request',
    
    // Auth
    INVALID_CREDENTIALS: 'Invalid email or password',
    TOKEN_EXPIRED: 'Token has expired',
    TOKEN_INVALID: 'Invalid token',
    TOKEN_MISSING: 'Token is required',
    PASSWORD_MISMATCH: 'Passwords do not match',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    USER_NOT_FOUND: 'User not found',
    
    // Todo
    TODO_NOT_FOUND: 'Todo not found',
    TODO_ALREADY_EXISTS: 'Todo with this title already exists',
    TODO_CREATE_FAILED: 'Failed to create todo',
    TODO_UPDATE_FAILED: 'Failed to update todo',
    TODO_DELETE_FAILED: 'Failed to delete todo',
    TODO_TOGGLE_FAILED: 'Failed to toggle todo status',
    
    // Validation
    TITLE_REQUIRED: 'Title is required',
    TITLE_TOO_LONG: 'Title is too long',
    TITLE_TOO_SHORT: 'Title is too short',
    DESCRIPTION_TOO_LONG: 'Description is too long',
    INVALID_PRIORITY: 'Invalid priority level',
    INVALID_EMAIL: 'Invalid email format',
    EMAIL_REQUIRED: 'Email is required',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: 'Password is too short',
    PASSWORD_TOO_WEAK: 'Password is too weak',
    NAME_REQUIRED: 'Name is required',
    NAME_TOO_SHORT: 'Name is too short',
    NAME_TOO_LONG: 'Name is too long',
    
    // File upload
    FILE_TOO_LARGE: 'File is too large',
    INVALID_FILE_TYPE: 'Invalid file type',
    FILE_UPLOAD_FAILED: 'File upload failed',
    
    // Database
    DATABASE_CONNECTION_ERROR: 'Database connection error',
    DATABASE_QUERY_ERROR: 'Database query error',
    
    // API
    API_RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
    API_TIMEOUT: 'Request timeout',
    API_NETWORK_ERROR: 'Network error',
  },
  
  // Warning messages
  WARNING: {
    PASSWORD_WEAK: 'Password is weak. Consider using a stronger password.',
    EMAIL_NOT_VERIFIED: 'Email is not verified. Please check your inbox.',
    SESSION_EXPIRING: 'Your session will expire soon.',
  },
  
  // Info messages
  INFO: {
    WELCOME: 'Welcome to Agentic Todo List',
    NO_TODOS: 'No todos found. Create your first todo!',
    NO_RESULTS: 'No results found for your search.',
    LOADING: 'Loading...',
    SAVING: 'Saving...',
    DELETING: 'Deleting...',
  },
} as const;
