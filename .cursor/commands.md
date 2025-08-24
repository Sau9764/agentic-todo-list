# Quick Commands Reference - Agentic Todo List

## Development Commands

### Start Development
```bash
# Start all services (backend + frontend)
yarn dev

# Start only backend
yarn workspace @agentic-todo-list/backend dev

# Start only frontend
yarn workspace @agentic-todo-list/frontend dev

# Start shared package in watch mode
yarn workspace @agentic-todo-list/shared dev
```

### Build Commands
```bash
# Build all packages
yarn build

# Build specific package
yarn workspace @agentic-todo-list/backend build
yarn workspace @agentic-todo-list/frontend build
yarn workspace @agentic-todo-list/shared build
```

### Testing Commands
```bash
# Run all tests
yarn test

# Run tests for specific package
yarn workspace @agentic-todo-list/backend test
yarn workspace @agentic-todo-list/frontend test

# Run tests in watch mode
yarn workspace @agentic-todo-list/backend test:watch
```

### Code Quality Commands
```bash
# Lint all packages
yarn lint

# Lint specific package
yarn workspace @agentic-todo-list/backend lint
yarn workspace @agentic-todo-list/frontend lint
yarn workspace @agentic-todo-list/shared lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Type check
yarn workspace @agentic-todo-list/frontend type-check
```

### Clean Commands
```bash
# Clean all packages
yarn clean

# Clean specific package
yarn workspace @agentic-todo-list/backend clean
yarn workspace @agentic-todo-list/frontend clean
yarn workspace @agentic-todo-list/shared clean
```

## Docker Commands

### Container Management
```bash
# Start all services
yarn docker:up

# Build Docker images
yarn docker:build

# View logs
yarn docker:logs

# Stop all services
yarn docker:down

# Restart services
yarn docker:down && yarn docker:up
```

### Individual Docker Commands
```bash
# Start only database
docker-compose up postgres -d

# Start only backend
docker-compose up backend -d

# Start only frontend
docker-compose up frontend -d

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## Database Commands

### PostgreSQL (via Docker)
```bash
# Connect to database
docker exec -it agentic-todo-postgres psql -U postgres -d agentic_todo_list

# Run migrations (when implemented)
yarn workspace @agentic-todo-list/backend migration:run

# Generate migration
yarn workspace @agentic-todo-list/backend migration:generate -- -n MigrationName

# Revert migration
yarn workspace @agentic-todo-list/backend migration:revert
```

## Package Management

### Adding Dependencies
```bash
# Add dependency to specific package
yarn workspace @agentic-todo-list/backend add package-name
yarn workspace @agentic-todo-list/frontend add package-name
yarn workspace @agentic-todo-list/shared add package-name

# Add dev dependency
yarn workspace @agentic-todo-list/backend add -D package-name

# Add dependency to root (for dev tools)
yarn add -D package-name
```

### Removing Dependencies
```bash
# Remove dependency from specific package
yarn workspace @agentic-todo-list/backend remove package-name
yarn workspace @agentic-todo-list/frontend remove package-name
```

## Git Commands

### Common Git Workflow
```bash
# Check status
git status

# Add changes
git add .

# Commit with conventional format
git commit -m "feat: add new todo feature"

# Push changes
git push origin main

# Create feature branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
git checkout feature/new-feature
```

### Conventional Commit Format
```bash
# Feature
git commit -m "feat: add user authentication"

# Bug fix
git commit -m "fix: resolve todo deletion issue"

# Documentation
git commit -m "docs: update API documentation"

# Refactor
git commit -m "refactor: improve error handling"

# Test
git commit -m "test: add unit tests for todo service"

# Chore
git commit -m "chore: update dependencies"
```

## NestJS CLI Commands

### Generate Components
```bash
# Generate module
nest generate module modules/users

# Generate controller
nest generate controller modules/users

# Generate service
nest generate service modules/users

# Generate entity
nest generate entity modules/users/entities/user

# Generate DTO
nest generate class modules/users/dto/create-user.dto
nest generate class modules/users/dto/update-user.dto

# Generate guard
nest generate guard guards/auth

# Generate interceptor
nest generate interceptor interceptors/logging

# Generate filter
nest generate filter filters/http-exception
```

## NextJS Commands

### Development
```bash
# Start development server
yarn workspace @agentic-todo-list/frontend dev

# Build for production
yarn workspace @agentic-todo-list/frontend build

# Start production server
yarn workspace @agentic-todo-list/frontend start

# Export static site
yarn workspace @agentic-todo-list/frontend export
```

## Environment Setup

### Environment Variables
```bash
# Copy environment template
cp env.example .env

# Edit environment variables
nano .env

# Check environment variables
echo $NODE_ENV
echo $PORT
```

### Database Setup
```bash
# Start database
yarn docker:up postgres

# Check database connection
docker exec -it agentic-todo-postgres psql -U postgres -d agentic_todo_list -c "\dt"

# Reset database
docker-compose down -v
docker-compose up postgres -d
```

## Troubleshooting Commands

### Common Issues
```bash
# Clear all caches
yarn cache clean
rm -rf node_modules
rm -rf packages/*/node_modules
yarn install

# Reset Docker
docker-compose down -v
docker system prune -f
yarn docker:up

# Check port usage
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Kill process on port
kill -9 $(lsof -t -i:3000)
```

### Logs and Debugging
```bash
# View all logs
yarn docker:logs

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Debug backend
yarn workspace @agentic-todo-list/backend debug

# Check TypeScript errors
yarn workspace @agentic-todo-list/frontend type-check
yarn workspace @agentic-todo-list/backend build
```

## Performance Commands

### Bundle Analysis
```bash
# Analyze frontend bundle
yarn workspace @agentic-todo-list/frontend build
npx @next/bundle-analyzer packages/frontend/.next/static/chunks

# Check bundle size
du -sh packages/frontend/.next
du -sh packages/backend/dist
```

### Monitoring
```bash
# Monitor system resources
htop
docker stats

# Monitor logs in real-time
yarn docker:logs -f
```

## Deployment Commands

### Production Build
```bash
# Build all packages for production
NODE_ENV=production yarn build

# Build Docker images for production
docker-compose -f docker-compose.prod.yml build

# Deploy with Docker
docker-compose -f docker-compose.prod.yml up -d
```

### Health Checks
```bash
# Check backend health
curl http://localhost:3001/health

# Check frontend
curl http://localhost:3000

# Check database
docker exec -it agentic-todo-postgres pg_isready -U postgres
```

## Quick Development Workflow

### 1. Start Development Environment
```bash
# Start all services
yarn dev

# Or start individually
yarn docker:up postgres -d
yarn workspace @agentic-todo-list/backend dev
yarn workspace @agentic-todo-list/frontend dev
```

### 2. Make Changes
```bash
# Edit files in your preferred editor
# Changes will auto-reload in development mode
```

### 3. Test Changes
```bash
# Run tests
yarn test

# Check linting
yarn lint

# Type check
yarn workspace @agentic-todo-list/frontend type-check
```

### 4. Commit Changes
```bash
# Add changes
git add .

# Commit with conventional format
git commit -m "feat: add new feature"

# Push to repository
git push origin feature/branch-name
```

## Notes

- Always run `yarn install` after pulling changes
- Use `yarn workspace` to run commands in specific packages
- Docker commands require Docker to be running
- Environment variables should be set before starting services
- Use conventional commit format for better project history
- Run tests before committing changes
- Check logs when troubleshooting issues
