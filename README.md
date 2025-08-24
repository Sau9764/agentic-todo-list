# Agentic Todo List

A modern, scalable todo list application built with NestJS backend and NextJS frontend in a Yarn workspace monorepo.

## 🏗️ Architecture

This project follows a monorepo structure with the following packages:

- **`packages/shared`** - Common utilities, types, constants, and logging
- **`packages/backend`** - NestJS API server with TypeORM and MySQL
- **`packages/frontend`** - NextJS React application with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Yarn 1.22+
- Docker & Docker Compose (for containerized development)
- MySQL 8.0 (if running locally)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agentic-todo-list
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start with Docker (Recommended)**
   ```bash
   # Build and start all services
   yarn docker:up
   
   # View logs
   yarn docker:logs
   
   # Stop services
   yarn docker:down
   ```

5. **Or start locally**
   ```bash
   # Start backend
   cd packages/backend
   yarn dev
   
   # Start frontend (in another terminal)
   cd packages/frontend
   yarn dev
   ```

## 📁 Project Structure

```
agentic-todo-list/
├── packages/
│   ├── shared/                 # Shared utilities and types
│   │   ├── src/
│   │   │   ├── types.ts        # Common TypeScript types
│   │   │   ├── constants.ts    # Application constants
│   │   │   ├── utils.ts        # Utility functions
│   │   │   ├── logger.ts       # Winston logger
│   │   │   └── index.ts        # Main exports
│   │   └── package.json
│   │
│   ├── backend/                # NestJS API server
│   │   ├── src/
│   │   │   ├── config/         # Configuration files
│   │   │   ├── common/         # Common modules (interceptors, guards)
│   │   │   ├── modules/        # Feature modules
│   │   │   │   ├── auth/       # Authentication
│   │   │   │   ├── users/      # User management
│   │   │   │   └── todos/      # Todo CRUD operations
│   │   │   ├── database/       # Database migrations
│   │   │   ├── app.module.ts   # Root module
│   │   │   └── main.ts         # Application entry point
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── frontend/               # NextJS React app
│       ├── src/
│       │   ├── app/            # Next.js 13+ app directory
│       │   ├── components/     # React components
│       │   ├── lib/            # Utilities and API client
│       │   ├── hooks/          # Custom React hooks
│       │   └── types/          # Frontend-specific types
│       ├── Dockerfile
│       └── package.json
│
├── docker-compose.yml          # Docker services configuration
├── package.json               # Root workspace configuration
├── tsconfig.json              # Root TypeScript configuration
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
└── README.md                 # This file
```

## 🛠️ Development

### Available Scripts

#### Root Level
```bash
yarn dev              # Start all packages in development mode
yarn build            # Build all packages
yarn test             # Run tests across all packages
yarn lint             # Lint all packages
yarn lint:fix         # Fix linting issues
yarn format           # Format code with Prettier
yarn clean            # Clean build artifacts
yarn docker:build     # Build Docker images
yarn docker:up        # Start Docker services
yarn docker:down      # Stop Docker services
yarn docker:logs      # View Docker logs
```

#### Backend (packages/backend)
```bash
yarn dev        # Start in development mode with hot reload
yarn debug      # Start with debugging enabled
yarn prod       # Start in production mode
yarn test             # Run unit tests
yarn test:e2e         # Run end-to-end tests
yarn test:cov         # Run tests with coverage
```

#### Frontend (packages/frontend)
```bash
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server
yarn lint             # Run ESLint
yarn type-check       # Run TypeScript type checking
```

### API Documentation

Once the backend is running, you can access the Swagger API documentation at:
- **Development**: http://localhost:3001/api/docs
- **Production**: https://your-domain.com/api/docs

### Database

The application uses MySQL 8.0 with the following default configuration:

- **Host**: localhost (or `mysql` in Docker)
- **Port**: 3306
- **Database**: agentic_todo_list
- **Username**: todo_user
- **Password**: todo_password

### Environment Variables

Copy `env.example` to `.env` and configure the following variables:

```bash
# Application
NODE_ENV=development
PORT=3001

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=agentic_todo_list
DB_USERNAME=todo_user
DB_PASSWORD=todo_password

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## 🏛️ Architecture Patterns

### Backend (NestJS)

- **Modular Architecture**: Feature-based modules (auth, users, todos)
- **Dependency Injection**: Built-in DI container
- **Decorators**: Extensive use of TypeScript decorators
- **Guards**: Authentication and authorization guards
- **Interceptors**: Request/response transformation and logging
- **Pipes**: Validation and transformation pipes
- **TypeORM**: Database ORM with entity relationships

### Frontend (NextJS)

- **App Router**: Next.js 13+ app directory structure
- **TypeScript**: Full TypeScript support
- **Tailwind CSS**: Utility-first CSS framework
- **Component Composition**: Reusable React components
- **API Integration**: Axios-based API client with interceptors
- **State Management**: React hooks and Zustand for global state

### Shared Package

- **Type Safety**: Common TypeScript interfaces and types
- **Utilities**: Reusable utility functions
- **Constants**: Application-wide constants
- **Logging**: Winston-based logging with multiple transports
- **Error Handling**: Custom error classes and handlers

## 🔧 Configuration

### TypeScript

The project uses a hierarchical TypeScript configuration:
- Root `tsconfig.json` provides base configuration
- Package-specific configs extend the root with specific settings

### ESLint & Prettier

- **ESLint**: TypeScript-aware linting with recommended rules
- **Prettier**: Code formatting with consistent style
- **Integration**: ESLint and Prettier work together without conflicts

### Docker

- **Multi-stage builds**: Optimized production images
- **Development volumes**: Hot reload for development
- **Network isolation**: Services communicate via Docker network
- **Environment variables**: Configurable via Docker Compose

## 🚀 Deployment

### Production Build

```bash
# Build all packages
yarn build

# Build Docker images
yarn docker:build

# Start production services
docker-compose -f docker-compose.prod.yml up -d
```

### Environment-Specific Configurations

- **Development**: Hot reload, detailed logging, CORS enabled
- **Staging**: Production-like with debugging capabilities
- **Production**: Optimized builds, minimal logging, security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api/docs`
- Review the code examples in the components

## 🔮 Roadmap

- [ ] User authentication and authorization
- [ ] Todo categories and tags
- [ ] Real-time updates with WebSockets
- [ ] Mobile app with React Native
- [ ] Advanced search and filtering
- [ ] Export/import functionality
- [ ] Team collaboration features
- [ ] Performance monitoring and analytics