# MindCare - AI-Powered Student Mental Health Platform

## Overview

MindCare is a comprehensive mental health support platform designed specifically for students. The application combines AI-powered stress detection, peer community features, and personalized wellness tools to create a privacy-first mental health ecosystem. The platform includes features like emotion recognition through facial analysis and voice patterns, an AI copilot for mental health guidance, mindfulness rooms, peer support forums, emergency SOS functionality, and comprehensive resource libraries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript running on Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing with support for multiple pages (home, dashboard, authentication, features)
- **UI Framework**: Custom design system built on Radix UI primitives with Tailwind CSS for styling
- **Component Library**: Shadcn/ui components with custom theming supporting light/dark modes
- **State Management**: Context API for global state (Auth, Theme, Language) with TanStack Query for server state

### Styling and Design System
- **CSS Framework**: Tailwind CSS with custom design tokens and color system
- **Theme System**: CSS custom properties with automatic dark/light mode switching
- **Color Palette**: Teal-green primary colors (168 76% 42%) with supporting gradients and wellness-focused color scheme
- **Typography**: Inter font with defined scale for headings, body text, and UI elements
- **Component Variants**: Class Variance Authority (CVA) for consistent component styling

### Backend Architecture
- **Server**: Express.js with TypeScript in ESM format
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL for production deployment
- **Schema**: User management system with username/password authentication
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

### Authentication System
- **Strategy**: Custom authentication using localStorage for session management (frontend-only currently)
- **User Management**: User profiles with mental health scores, badges, and progress tracking
- **Privacy**: Encrypted data storage with privacy-first messaging throughout the application

### AI and Mental Health Features
- **Stress Detection**: Simulated AI analysis of facial expressions and voice patterns for stress level assessment
- **AI Copilot**: Chatbot interface with predefined responses for mental health support and study guidance
- **Mindfulness Tools**: Breathing exercises, meditation timers, and ambient sound environments
- **Progress Tracking**: Mood diary, sleep tracking, and wellness score calculations stored in localStorage

### Internationalization
- **Language Support**: English and Hindi language support with context-based translation system
- **Cultural Considerations**: Localized mental health resources and culturally appropriate guidance

### Development and Build System
- **Build Tool**: Vite with React plugin and TypeScript support
- **Development**: Hot module replacement with error overlay for debugging
- **Production**: Optimized builds with code splitting and asset optimization
- **Type Safety**: Full TypeScript coverage across client, server, and shared code

## External Dependencies

### UI and Styling
- **Radix UI**: Complete set of accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library for consistent iconography throughout the application
- **Class Variance Authority**: Type-safe component variant management

### Data and State Management
- **TanStack Query**: Server state management with caching, synchronization, and background updates
- **React Hook Form**: Form validation and management with Zod schema validation
- **Date-fns**: Date manipulation and formatting utilities

### Database and Backend
- **Drizzle ORM**: Type-safe SQL query builder and ORM for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database platform
- **Drizzle Kit**: Database migration and schema management tools
- **Connect PG Simple**: PostgreSQL session store for Express sessions

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking for JavaScript
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility
- **ESBuild**: Fast JavaScript bundler for production builds

### Visualization and Charts
- **Chart.js**: Data visualization library for mental health progress tracking and analytics dashboards

### Routing and Navigation
- **Wouter**: Minimalist routing library for React single-page applications

The application is architected as a full-stack TypeScript application with a strong emphasis on type safety, user privacy, and modern development practices. The frontend simulates many AI and backend features using localStorage and mock data, providing a fully functional demo experience while maintaining the structure for future backend integration.