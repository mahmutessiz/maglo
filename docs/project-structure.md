# Maglo Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Authentication System](#authentication-system)
4. [Dashboard Implementation](#dashboard-implementation)
5. [API Integration](#api-integration)
6. [Component Architecture](#component-architecture)
7. [Type Definitions](#type-definitions)
8. [Libraries and Dependencies](#libraries-and-dependencies)
9. [Development Notes](#development-notes)

## Project Overview

Maglo is a financial tracking platform built with Next.js and TypeScript. It allows users to track financial movements, total balances, and working capital. The application follows a desktop-first approach with responsive design.

### Tech Stack

- Next.js (App Router)
- TypeScript
- React Query for API state management
- Tailwind CSS for styling
- Recharts for data visualization
- Geist font family

## Project Structure

```
maglo/
├── components/
│   └── providers/
│       └── QueryProvider.tsx
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── financial/
│   │   │   ├── users/
│   │   │   └── wallet/
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── Wallet/
│   │   │   │   │   ├── CreditCard.tsx
│   │   │   │   │   └── Wallet.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── LoadingSkeleton.tsx
│   │   │   │   ├── RecentTransactions.tsx
│   │   │   │   ├── ScheduledTransfers.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── StatCard.tsx
│   │   │   │   └── WorkingCapitalChart.tsx
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx (home page)
│   ├── lib/
│   │   ├── utils.ts
│   │   └── workingCapitalChart.ts
│   └── types/
│       └── types.ts
├── components/
│   └── providers/
│       └── QueryProvider.tsx
├── public/
│   └── [asset files]
├── docs/
│   └── project-structure.md (this file)
```

### Directory Purpose

- `src/app/`: Contains all Next.js pages and route-specific components
- `src/app/dashboard/components/`: Dashboard-specific components organized by feature
- `src/types/`: TypeScript type definitions for the entire application
- `src/lib/`: Utility functions and helper modules
- `components/providers/`: Global providers (React Query provider)

## Authentication System

### Files

- `src/app/page.tsx` - Sign-in page
- `src/app/sign-up/page.tsx` - Sign-up page

### Features Implemented

- Form state management using `useState`
- React Query mutations for API calls
- Loading states during form submission
- JWT token storage in localStorage
- Protected route checking with redirect logic
- Basic error handling with alerts

### Auth Flow

1. User enters credentials on sign-in page
2. Login mutation sends credentials to API
3. If successful, token is stored in localStorage
4. User is redirected to dashboard
5. Dashboard checks for token and redirects to sign-in if not present

## Dashboard Implementation

### Main Page

- `src/app/dashboard/page.tsx` - Main dashboard page
- Uses multiple React Query hooks to fetch data simultaneously
- Implements proper loading and error states
- Organizes components in a responsive grid layout

### Dashboard Components

#### Header Component

- `src/app/dashboard/components/Header.tsx`
- Displays user information
- Part of the navigation structure

#### Sidebar Component

- `src/app/dashboard/components/Sidebar.tsx`
- Provides navigation between dashboard sections
- Maintains consistent layout across dashboard views

#### Financial Summary

- `src/app/dashboard/components/StatCard.tsx`
- Displays total balance, spending, and savings
- Uses currency formatting utility
- Color-coded for different financial metrics

#### Working Capital Chart

- `src/app/dashboard/components/WorkingCapitalChart.tsx`
- Interactive chart using Recharts library
- Implements custom tooltip with hover functionality
- Shows income and expenses over time
- Includes period selection dropdown

#### Recent Transactions

- `src/app/dashboard/components/RecentTransactions.tsx`
- Displays list of recent financial transactions
- Fetches data from API endpoint

#### Wallet Components

- `src/app/dashboard/components/Wallet/Wallet.tsx`
- `src/app/dashboard/components/Wallet/CreditCard.tsx`
- Displays user's credit cards
- Shows card details and balances

#### Scheduled Transfers

- `src/app/dashboard/components/ScheduledTransfers.tsx`
- Shows upcoming automated payments
- Displays transfer details and timing

#### Loading States

- `src/app/dashboard/components/LoadingSkeleton.tsx`
- Provides skeleton loading states for dashboard components

## API Integration

### React Query Implementation

- Global QueryProvider in `components/providers/QueryProvider.tsx`
- Multiple data fetching hooks on dashboard page
- Proper error and loading state management
- Automatic cache management

### API Endpoints Used

- `/api/users/login` - User authentication
- `/api/users/register` - User registration
- `/api/users/profile` - User profile data
- `/api/financial/summary` - Financial summary data
- `/api/financial/working-capital` - Working capital data
- `/api/financial/wallet` - Wallet data
- `/api/financial/transfers/scheduled` - Scheduled transfers
- `/api/financial/transactions/recent` - Recent transactions

### Data Fetching Pattern

- Custom fetcher function with authentication token
- Error handling with automatic redirects
- Type-safe data fetching with TypeScript interfaces

## Component Architecture

### Feature-Based Organization

Components are organized by feature rather than component type, which improves maintainability and scalability:

```
dashboard/
├── components/
│   ├── Wallet/          # Feature-specific subcomponents
│   │   ├── CreditCard.tsx
│   │   └── Wallet.tsx
│   ├── Header.tsx       # Dashboard-specific components
│   ├── LoadingSkeleton.tsx
│   ├── RecentTransactions.tsx
│   ├── ScheduledTransfers.tsx
│   ├── Sidebar.tsx
│   └── StatCard.tsx
```

### Component Reusability

- Each component has a single responsibility
- Props are well-defined with TypeScript interfaces
- Components are designed to be composable
- Shared logic is extracted to utility functions

### Styling Approach

- Tailwind CSS for utility-first styling
- Consistent color palette across components
- Responsive design principles implemented
- Component-specific styling mixed with global styles

## Type Definitions

### Key Interfaces

Located in `src/types/types.ts`:

#### User Types

- `UserProfile` - User profile information

#### Financial Types

- `FinancialSummary` - Total balance, spending, savings
- `WorkingCapital` - Working capital data with income/expense breakdown
- `WorkingCapitalData` - Monthly income/expense data points

#### Wallet Types

- `WalletCard` - Individual card information
- `WalletData` - Collection of user's cards

#### Transaction Types

- `Transaction` - Individual transaction details
- `TransactionsData` - Collection of transactions

#### Transfer Types

- `ScheduledTransfer` - Upcoming transfer details
- `ScheduledTransfersData` - Collection of scheduled transfers

## Libraries and Dependencies

### Core Libraries

- **Next.js**: Framework for React applications
- **React Query**: Server state management and caching
- **TypeScript**: Type safety across the application
- **Recharts**: Data visualization for financial charts
- **Tailwind CSS**: Utility-first CSS framework

### Key Dependencies

- `@tanstack/react-query` for API state management
- `recharts` for data visualization
- `next/font` for font optimization
- `react` and `react-dom` for UI components

## Development Notes

### Best Practices Implemented

1. **Type Safety**: Complete TypeScript integration with well-defined interfaces
2. **Component Organization**: Feature-based component structure
3. **State Management**: Proper React Query integration for server state
4. **Responsive Design**: Mobile-first approach with responsive layouts
5. **Performance**: Loading states and skeleton screens
6. **Security**: JWT token management

### Areas for Enhancement

1. **Form Validation**: Add proper validation with error messages
2. **Toast Notifications**: Replace alerts with toast notifications
3. **Error Boundaries**: Add global error boundary handling
4. **Auto-Redirect**: Add redirect for already authenticated users
5. **Testing**: Add unit and integration tests

### File Naming Conventions

- PascalCase for React components
- camelCase for utility functions
- kebab-case for URL routes
- Consistent naming across related components

### Environment Setup

- Uses NEXT_PUBLIC_API_URL for API base URL
- LocalStorage for JWT token persistence
- Geist font family for typography
