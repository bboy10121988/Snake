# Overview

This is a full-stack web application featuring a Snake game built with React Three.js for 3D graphics. The project uses a modern tech stack with Express.js backend, React frontend, PostgreSQL database with Drizzle ORM, and comprehensive UI components from Radix UI. The application is designed as a modular, game-focused platform with potential for expansion into other interactive experiences.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **3D Graphics**: React Three Fiber (@react-three/fiber) with post-processing effects
- **UI Framework**: Radix UI components with Tailwind CSS for styling
- **State Management**: Zustand for game state and audio management
- **Build Tool**: Vite with custom configuration for game assets (GLSL shaders, 3D models, audio files)
- **Game Structure**: Component-based architecture with custom hooks for game logic (useSnakeGame)

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API structure with route registration system
- **Development**: Hot reload with Vite middleware integration
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

## Data Storage
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database schema management
- **Current Schema**: User management system with username/password authentication

## Game Engine Design
- **State Management**: Centralized game state with phase-based transitions (ready → playing → ended)
- **Audio System**: Zustand-based audio store with mute controls and sound effect management
- **Input Handling**: Keyboard event system with direction-based controls
- **Rendering**: Canvas-based 2D rendering with grid system for game logic
- **Performance**: RequestAnimationFrame-based game loop with configurable speed progression

## Development Tooling
- **Type Safety**: Comprehensive TypeScript configuration across client, server, and shared modules
- **Code Quality**: ESLint and Prettier integration
- **Asset Processing**: Support for 3D models (GLTF/GLB), shaders (GLSL), and audio files
- **Hot Reload**: Development server with runtime error overlay
- **Path Aliases**: Simplified imports with @ and @shared path mappings

# External Dependencies

## Core Frameworks
- **React Ecosystem**: React 18, React DOM, React Three Fiber for 3D rendering
- **Backend**: Express.js with TypeScript support via tsx runtime
- **Build Tools**: Vite with React plugin and custom GLSL shader support

## Database & ORM
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for schema validation and type inference

## UI & Styling
- **Component Library**: Comprehensive Radix UI component suite (40+ components)
- **Styling**: Tailwind CSS with PostCSS processing
- **Typography**: Inter font family via Fontsource
- **Utilities**: Class variance authority for component variants, clsx for conditional classes

## Game & 3D Features
- **3D Graphics**: React Three Drei for helpers, React Three Post-processing for effects
- **State Management**: Zustand with subscribeWithSelector middleware
- **Audio**: HTML5 Audio API integration through custom store
- **Utilities**: Date-fns for time formatting, cmdk for command interfaces

## Development & Quality
- **Development**: Runtime error modal plugin for better debugging
- **Type Checking**: Comprehensive TypeScript configuration
- **Asset Support**: GLTF/GLB 3D models, audio files (MP3, OGG, WAV), GLSL shaders

## Session Management
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **HTTP Client**: TanStack React Query for server state management with custom fetch utilities