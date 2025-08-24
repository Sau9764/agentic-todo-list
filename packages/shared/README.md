# Shared Package

This is the shared library package for the Agentic Todo List monorepo. It contains common types, constants, utilities, and configurations used across both the backend and frontend applications.

## 🚀 Features

- **TypeScript Types**: Comprehensive type definitions for the entire application
- **Constants**: Centralized constants for API endpoints, validation rules, and messages
- **Utilities**: Reusable utility functions for common operations
- **Configuration**: Environment and application configuration helpers
- **Logging**: Enhanced logger with console fallback
- **Cross-Platform**: Works in both Node.js and browser environments

## 📁 Project Structure

```
src/
├── types/              # TypeScript type definitions
│   ├── index.ts       # Main types export
│   ├── todo.ts        # Todo-related types
│   ├── user.ts        # User-related types
│   ├── api.ts         # API-related types
│   └── common.ts      # Common types and error classes
├── constants/          # Application constants
│   ├── index.ts       # Main constants export
│   ├── app.ts         # Application constants
│   ├── api.ts         # API constants and endpoints
│   ├── validation.ts  # Validation rules and constants
│   └── messages.ts    # Error and success messages
├── utils/             # Utility functions
│   ├── index.ts       # Main utils export
│   ├── date.ts        # Date manipulation utilities
│   ├── string.ts      # String manipulation utilities
│   ├── validation.ts  # Validation utilities
│   ├── object.ts      # Object manipulation utilities
│   ├── array.ts       # Array manipulation utilities
│   └── crypto.ts      # Cryptographic utilities
├── config/            # Configuration utilities
│   ├── index.ts       # Main config export
│   ├── env.ts         # Environment configuration
│   ├── database.ts    # Database configuration
│   └── app.ts         # Application configuration
├── logger/            # Logging utilities
│   ├── index.ts       # Main logger export
│   ├── logger.ts      # Enhanced logger with fallback
│   └── console-logger.ts # Console logger fallback
└── index.ts           # Main package entry point
```

## 🛠️ Installation

```bash
# Install dependencies
yarn install

# Build the package
yarn build

# Watch for changes
yarn dev
```

## 📦 Usage

### Importing Types

```typescript
import { Todo, User, ApiResponse, BaseEntity } from '@agentic-todo-list/shared';

// Use types in your code
const todo: Todo = {
  id: '1',
  title: 'Complete project',
  description: 'Finish the todo app',
  completed: false,
  priority: 'high',
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

### Using Constants

```typescript
import { 
  APP_NAME, 
  API_BASE_URL, 
  TODO_PRIORITIES, 
  MESSAGES 
} from '@agentic-todo-list/shared';

console.log(APP_NAME); // "Agentic Todo List"
console.log(API_BASE_URL); // "http://localhost:3001/api/v1"
console.log(TODO_PRIORITIES.HIGH); // "high"
console.log(MESSAGES.SUCCESS.TODO_CREATED); // "Todo created successfully"
```

### Using Utilities

```typescript
import { 
  formatDate, 
  validateEmail, 
  generateUUID, 
  isEmpty 
} from '@agentic-todo-list/shared';

// Date utilities
const formattedDate = formatDate(new Date(), 'YYYY-MM-DD');

// Validation utilities
const isValidEmail = validateEmail('user@example.com');

// Generation utilities
const uuid = generateUUID();

// Object utilities
const isEmptyObject = isEmpty({});
```

### Using Configuration

```typescript
import { 
  getEnvironment, 
  getDatabaseConfig, 
  getAppConfig 
} from '@agentic-todo-list/shared';

// Environment utilities
const env = getEnvironment(); // 'development' | 'production' | 'staging'

// Configuration utilities
const dbConfig = getDatabaseConfig();
const appConfig = getAppConfig();
```

### Using Logger

```typescript
import { 
  logInfo, 
  logError, 
  logWarn, 
  logDebug 
} from '@agentic-todo-list/shared';

// Logging with metadata
logInfo('User logged in', { userId: '123', timestamp: new Date() });
logError('Database connection failed', { error: 'Connection timeout' });
logWarn('Deprecated API endpoint used', { endpoint: '/api/v1/old' });
logDebug('Processing request', { method: 'POST', url: '/api/todos' });
```

## 🎯 Type Definitions

### Core Types

```typescript
// Todo types
interface Todo extends BaseEntity {
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

// User types
interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
}

// API types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}
```

### Error Classes

```typescript
// Custom error classes
class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
}

class ValidationError extends AppError {}
class NotFoundError extends AppError {}
class UnauthorizedError extends AppError {}
class ForbiddenError extends AppError {}
```

## 🔧 Constants

### Application Constants

```typescript
// App information
APP_NAME = 'Agentic Todo List'
APP_VERSION = '1.0.0'
DEFAULT_BACKEND_PORT = 3001
DEFAULT_FRONTEND_PORT = 3000

// Environment
NODE_ENV = 'development' | 'production' | 'staging'
IS_PRODUCTION = boolean
IS_DEVELOPMENT = boolean
```

### API Constants

```typescript
// API configuration
API_BASE_URL = 'http://localhost:3001/api/v1'
API_VERSION = 'v1'
API_PREFIX = '/api/v1'

// Endpoints
API_ENDPOINTS = {
  HEALTH: '/health',
  TODOS: {
    BASE: '/todos',
    TOGGLE: (id: string) => `/todos/${id}/toggle`,
  },
  // ... more endpoints
}
```

### Validation Constants

```typescript
// Validation rules
VALIDATION = {
  MIN_TITLE_LENGTH: 1,
  MAX_TITLE_LENGTH: 200,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
}

// Todo priorities
TODO_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}
```

## 🛠️ Utilities

### Date Utilities

```typescript
// Date formatting
formatDate(date, format) // 'YYYY-MM-DD'
formatDateHuman(date) // 'Today', 'Yesterday', '2 days ago'

// Date validation
isToday(date)
isYesterday(date)
isTomorrow(date)
isOverdue(date)

// Date manipulation
addDays(date, days)
subtractDays(date, days)
startOfDay(date)
endOfDay(date)
```

### String Utilities

```typescript
// String manipulation
capitalize(str) // 'hello' -> 'Hello'
capitalizeWords(str) // 'hello world' -> 'Hello World'
truncate(str, length) // 'Hello world' -> 'Hello...'
slugify(str) // 'Hello World!' -> 'hello-world'

// Validation
isEmail(email)
isUrl(url)
isPhoneNumber(phone)

// Formatting
formatPhoneNumber(phone) // '(123) 456-7890'
formatCurrency(amount) // '$1,234.56'
formatFileSize(bytes) // '1.5 MB'
```

### Object Utilities

```typescript
// Object manipulation
isEmpty(obj)
isNotEmpty(obj)
pick(obj, keys)
omit(obj, keys)
deepClone(obj)
merge(target, ...sources)

// Object access
get(obj, path, defaultValue)
set(obj, path, value)
has(obj, path)
```

### Array Utilities

```typescript
// Array manipulation
chunk(array, size)
unique(array)
uniqueBy(array, key)
groupBy(array, key)
sortBy(array, key, direction)

// Array operations
flatten(array)
compact(array)
intersection(...arrays)
union(...arrays)
difference(array1, array2)
```

### Validation Utilities

```typescript
// Validation functions
validateEmail(email)
validatePassword(password)
validateTitle(title)
validateName(name)
validatePriority(priority)
validateFileSize(fileSize, maxSize)
validateFileType(fileType, allowedTypes)
```

## 🔧 Configuration

### Environment Configuration

```typescript
// Environment utilities
getEnvironment() // 'development' | 'production' | 'staging'
isDevelopment()
isProduction()
isStaging()
isTest()

// Environment variables
getEnvVar(key, defaultValue)
getEnvVarAsNumber(key, defaultValue)
getEnvVarAsBoolean(key, defaultValue)
getEnvVarAsArray(key, separator, defaultValue)
```

### Database Configuration

```typescript
// Database configuration
getDefaultDatabaseConfig()
createDatabaseUrl(config)
validateDatabaseConfig(config)
getTypeOrmConfig(config)
```

### Application Configuration

```typescript
// App configuration
getDefaultAppConfig()
validateAppConfig(config)
getCorsConfig(config)
getRateLimitConfig(config)
getSecurityConfig(config)
```

## 📝 Logging

### Logger Features

- **Winston Integration**: Full Winston logger support when available
- **Console Fallback**: Automatic fallback to console logging
- **Structured Logging**: JSON format with metadata support
- **Environment Aware**: Different log levels based on environment
- **File Logging**: Automatic file logging in production

### Usage Examples

```typescript
// Basic logging
logInfo('Application started');
logError('Database connection failed');

// Logging with metadata
logInfo('User action', { 
  userId: '123', 
  action: 'create_todo',
  timestamp: new Date() 
});

logError('API error', { 
  statusCode: 500, 
  endpoint: '/api/todos',
  error: error.message 
});
```

## 🔗 Integration

### Backend Integration

```typescript
// In NestJS backend
import { Todo, logInfo, API_BASE_URL } from '@agentic-todo-list/shared';

@Injectable()
export class TodosService {
  async createTodo(todo: Todo): Promise<Todo> {
    logInfo('Creating todo', { title: todo.title });
    // ... implementation
  }
}
```

### Frontend Integration

```typescript
// In Next.js frontend
import { Todo, validateTitle, TODO_PRIORITIES } from '@agentic-todo-list/shared';

const TodoForm = () => {
  const handleSubmit = (data: any) => {
    const validation = validateTitle(data.title);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    // ... submit logic
  };
};
```

## 🚀 Development

### Building

```bash
# Build the package
yarn build

# Watch for changes
yarn dev

# Type checking
yarn type-check
```

### Testing

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test:coverage
```

### Linting

```bash
# Run linter
yarn lint

# Fix linting issues
yarn lint:fix
```

## 📦 Publishing

```bash
# Build for production
yarn build

# Publish to npm (if needed)
npm publish
```

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper TypeScript types for all new functions
3. Include JSDoc comments for complex functions
4. Add tests for new utilities
5. Update this README for new features

## 📄 License

This package is part of the Agentic Todo List monorepo and follows the same license terms.
