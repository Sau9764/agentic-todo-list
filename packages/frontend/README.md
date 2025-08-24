# Frontend Package

This is the NextJS frontend for the Agentic Todo List application.

## 🚀 Features

- **NextJS 14+** with Pages Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **React Context** for state management
- **Axios** for API communication
- **Shared Package Integration** for common types and utilities

## 📁 Project Structure

```
src/
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper with providers
│   ├── index.tsx      # Home page
│   └── 404.tsx        # 404 error page
├── components/         # Reusable UI components
│   ├── Layout.tsx     # Main layout component
│   ├── TodoList.tsx   # Todo list component
│   ├── TodoItem.tsx   # Individual todo item
│   ├── Loading.tsx    # Loading spinner
│   └── Error.tsx      # Error display
├── hooks/             # Custom React hooks
│   └── useTodos.ts    # Todo management hook
├── lib/               # Utilities and API client
│   └── api.ts         # Axios API client
├── context/           # React context providers
│   └── AppContext.tsx # Global app state
├── styles/            # Global styles
│   └── globals.css    # TailwindCSS imports
└── types/             # TypeScript type definitions
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint

# Fix linting issues
yarn lint:fix

# Type checking
yarn type-check
```

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_NAME=Agentic Todo List
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🎨 Components

### Layout Component

The main layout component that provides:
- Header with app name and version
- Navigation
- Footer
- Loading overlay
- Error toast
- Theme support

### TodoList Component

A comprehensive todo management component with:
- Add new todo form
- Todo list display
- Loading states
- Error handling
- Mock data integration

### TodoItem Component

Individual todo item component with:
- Checkbox for completion
- Priority badges
- Due date display
- Edit and delete actions
- Responsive design

## 🔧 Custom Hooks

### useTodos Hook

Provides todo management functionality:
- Fetch all todos
- Create new todo
- Update todo
- Delete todo
- Toggle completion
- Loading and error states

## 🌐 API Integration

### API Client

The `lib/api.ts` file provides:
- Axios instance with interceptors
- Request/response logging
- Error handling
- Type-safe API methods
- Environment-based configuration

### API Methods

```typescript
// Health check
api.health.check()
api.health.info()

// Todo operations
api.todos.getAll()
api.todos.getById(id)
api.todos.create(data)
api.todos.update(id, data)
api.todos.delete(id)
api.todos.toggleComplete(id)
```

## 🎯 Shared Package Integration

The frontend uses the shared package for:
- **Types**: Todo, User, API response types
- **Constants**: App name, version, priority levels
- **Utilities**: Logging, validation, formatting
- **Error Classes**: Custom error handling

## 🚀 Deployment

### Build Process

```bash
# Build the application
yarn build

# The build output will be in the .next directory
```

### Docker Deployment

The frontend includes a Dockerfile for containerized deployment:

```bash
# Build Docker image
docker build -t agentic-todo-frontend .

# Run container
docker run -p 3000:3000 agentic-todo-frontend
```

## 📝 Development Notes

### Mock Data

Currently, the application uses mock data for todos. To integrate with the real API:

1. Update the `useTodos` hook in `hooks/useTodos.ts`
2. Replace mock API calls with real API calls
3. Update error handling for network issues

### Styling

The application uses TailwindCSS with custom components:
- Button variants: `btn`, `btn-primary`, `btn-secondary`, `btn-danger`
- Form inputs: `input`
- Cards: `card`, `card-header`, `card-body`, `card-footer`

### State Management

Global state is managed through React Context:
- Loading states
- Error handling
- Theme management
- Sidebar state

## 🔗 Related Packages

- **Backend**: `@agentic-todo-list/backend` - NestJS API
- **Shared**: `@agentic-todo-list/shared` - Common types and utilities
