# BMI Calculator Application

## Overview

This is a full-stack web application built with React (TypeScript) frontend and Express.js backend, featuring a BMI (Body Mass Index) calculator. The application follows a modern monorepo structure with shared code between client and server, uses PostgreSQL with Drizzle ORM for data persistence, and implements a comprehensive UI component library using shadcn/ui with Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Hook Form for form handling, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Built-in session handling with connect-pg-simple

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend application  
├── shared/          # Shared TypeScript code (schemas, types)
├── migrations/      # Database migration files
└── dist/           # Built application output
```

## Key Components

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: User table with username/password fields defined in shared schema
- **Storage Interface**: Abstracted storage layer with memory implementation for development
- **Migrations**: Automatic schema management via drizzle-kit

### Authentication & Users
- **User Model**: Basic user entity with id, username, and password fields
- **Storage Operations**: CRUD operations for user management
- **Validation**: Zod schemas for data validation integrated with Drizzle

### Frontend Components
- **UI Library**: Complete shadcn/ui component set including forms, dialogs, cards, etc.
- **Form Handling**: React Hook Form with Zod validation resolvers
- **BMI Calculator**: Main application feature with metric/imperial unit support
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### API Layer
- **REST Architecture**: Express.js routes with /api prefix
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Automatic API request/response logging
- **Type Safety**: Shared types between client and server

## Data Flow

1. **Frontend Forms**: React Hook Form captures user input with Zod validation
2. **API Requests**: TanStack Query manages server communication with automatic retries
3. **Backend Processing**: Express routes handle business logic and data validation
4. **Database Operations**: Drizzle ORM provides type-safe database interactions
5. **Response Handling**: Standardized JSON responses with error handling

## External Dependencies

### Frontend Dependencies
- **Radix UI**: Accessible component primitives for complex UI elements
- **TanStack Query**: Server state management and caching
- **Lucide React**: Consistent icon library
- **Date-fns**: Date manipulation utilities

### Backend Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection (Neon)
- **Drizzle ORM**: Type-safe database operations
- **Express**: Web framework for API endpoints

### Development Tools
- **TypeScript**: Full type safety across the stack
- **Vite**: Fast development server and build tool
- **ESBuild**: Fast JavaScript bundler for production
- **Tailwind CSS**: Utility-first CSS framework

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite bundles React application to `dist/public`
2. **Backend Build**: ESBuild compiles TypeScript server to `dist/index.js`
3. **Database Setup**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Development**: Hot reloading with Vite dev server proxy
- **Production**: Static file serving with Express

### Development vs Production
- **Development**: Vite dev server with HMR, memory-based storage
- **Production**: Compiled static assets, PostgreSQL database
- **Replit Integration**: Special handling for Replit development environment