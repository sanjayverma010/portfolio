# AI Agent Instructions for Portfolio Project

## Project Architecture

This is a full-stack portfolio application with:

- **Backend**: Spring Boot (Java 11) REST API
- **Frontend**: React (v19) single-page application

### Key Components

#### Backend (`/backend`)
- Spring Boot 2.7.x with:
  - Spring Security + JWT for authentication
  - JPA + MySQL for data persistence
  - Redis for caching (optional)
  - OpenAPI/Swagger for API documentation
  - Spring Mail for email functionality

#### Frontend (`/frontend`)
- React 19 with:
  - React Router v7 for routing
  - Framer Motion for animations
  - JWT authentication
  - Email.js for contact form

## Development Workflows

### Backend Development
1. **Build & Run**:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   - API runs on `http://localhost:8080` by default
   - Swagger UI: `http://localhost:8080/swagger-ui/index.html`

2. **Security Implementation**:
   - JWT-based stateless authentication
   - Public endpoints in `SecurityConfig.java`:
     - `/api/auth/**`
     - `/api/visitors/**`
     - `/api/projects/**`
     - `/api/trainings/**`
     - `/api/skills/**`

### Frontend Development
1. **Start Development Server**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   - Runs on `http://localhost:3000`

## Code Patterns & Conventions

### Backend
1. **Package Structure**:
   - Controllers: `com.sanjayverma.portfolio.controller`
   - Services: `com.sanjayverma.portfolio.service`
   - Models: `com.sanjayverma.portfolio.model`
   - Repositories: `com.sanjayverma.portfolio.repository`

2. **Security**:
   - JWT authentication using `JwtUtil` and custom filters
   - Role-based access control through Spring Security

### Frontend
1. **Component Organization**:
   - Pages in `/pages`
   - Reusable components in `/components`
   - Context providers in `/context`
   - API services in `/services`

2. **State Management**:
   - React Context for global state (`AuthContext.jsx`, `PortfolioContext.jsx`)
   - Service modules for API calls

## Integration Points
1. **API Communication**:
   - Frontend uses service modules in `/services` for API calls
   - JWT tokens stored in localStorage and included in Authorization header
   - CORS configured in backend's `SecurityConfig` for frontend access

2. **Authentication Flow**:
   - Login through `/api/auth` endpoints
   - JWT token returned from backend
   - Protected routes in frontend use `ProtectedRoute.js` component

## Common Tasks
1. Adding new API endpoints:
   1. Create controller method with appropriate mapping
   2. Update `SecurityConfig.java` if public access needed
   3. Add corresponding service method
   4. Create/update model and repository if needed

2. Adding new frontend features:
   1. Create component in appropriate directory
   2. Add route in App.js if needed
   3. Create/update service methods for API integration
   4. Use context providers for state management