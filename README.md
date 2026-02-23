# 🎯 EvenTask

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Commitlint](https://img.shields.io/badge/commitlint-enabled-brightgreen?style=for-the-badge&logo=commitlint)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.5-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

**Collaborative task manager with integrated calendar and real-time notifications**

[Live Demo](#-live-demo) • [Features](#-key-features) • [Architecture](#️-architecture) • [Testing](#-testing)

</div>

---

## 📸 Interface Preview

![App Preview](public/images/landing/preview-eventask.webp)

---

## 🌐 Live Demo

<div align="center">

### 🚀 Production

[![Netlify Status](https://api.netlify.com/api/v1/badges/c9c092ac-e9c4-46c9-a48c-76f3b733c0e7/deploy-status)](https://app.netlify.com/projects/prod-eventask/deploys)

**[prod-eventask.netlify.app](https://prod-eventask.netlify.app)**

_Full-stack deployment with real backend (may take 30-60s for cold start)_

---

### 🎭 Demo Mode

[![Netlify Status](https://api.netlify.com/api/v1/badges/c60310ae-fad5-464a-a482-7c0823f09409/deploy-status)](https://app.netlify.com/projects/demo-eventask/deploys)

**[demo-eventask.netlify.app](https://demo-eventask.netlify.app)**

_Fully functional offline demo with MSW mocks (instant load, no backend required)_

**Demo Credentials:**

```
Email: demo@eventask.com
Password: mock-password
```

> 💡 **Tip:** Use demo mode to explore all features instantly without waiting for backend cold start.

</div>

---

## 📖 Overview

**EvenTask** is a modern web application for collaborative task management based on events. Its core focus is organizing work into 8-hour workday sessions, where each task is broken down into specific events that determine its total duration.

### 🎯 Core Concept: Event-Based Tasks

- **Tasks**: Work units with a maximum duration of 8 hours (standard workday)
- **Events**: Temporal components that make up a task (e.g., "Initial Meeting", "Development", "Testing")
- **Participants**: Collaborative users who can be assigned to both tasks and specific events
- **Integrated Calendar**: Temporal visualization of all scheduled events
- **Real-time Notifications**: Instant updates via WebSocket
- **App Shell Architecture**: Instant initial load perception using Skeleton screens instead of blocking spinners

The application is designed with a scalable architecture, following **Material Design 3** principles, with full support for **light/dark themes** and a strong focus on **accessibility (a11y)**.

---

## ✨ Key Features

### 📋 Task Management

- **Event-driven tasks**: Break down complex work into manageable time-boxed events
- **8-hour workday constraint**: Ensures realistic task planning aligned with standard work schedules
- **Drag & drop interface**: Intuitive task and participant assignment using [@dnd-kit](https://dndkit.com/)
- **Progress tracking**: Visual progress indicators based on completed events
- **Status management**: Track tasks through their lifecycle (Pending, In Progress, Completed)
- **Category organization**: Group and filter tasks by custom categories

### 👥 Collaboration

- **Multi-user support**: Invite team members and manage contacts
- **Participant assignment**: Assign collaborators to specific tasks and events
- **Real-time synchronization**: Instant updates across all connected clients via WebSocket
- **Invitation system**: Send and accept collaboration invitations

### 📅 Calendar Integration

- **Event timeline**: Visualize all scheduled events in an interactive calendar
- **Date-based filtering**: Navigate through different time periods
- **Event overlap detection**: Prevent scheduling conflicts
- **Quick event creation**: Add events directly from the calendar view

### 🔔 Notifications

- **Real-time alerts**: Instant notifications for task updates, invitations, and assignments
- **WebSocket-powered**: No polling, zero latency updates
- **Notification center**: Review all notifications with dropdown interface
- **Smart grouping**: Organized by type (task updates, invitations, system alerts)

### 🎨 Modern UI/UX

- **Material Design 3**: Latest design system with elevation, state layers, and dynamic colors
- **Light/Dark themes**: System-aware theme switching with custom CSS properties
- **Responsive design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility first**: WCAG compliant with keyboard navigation and screen reader support
- **Visual feedback**: Shimmer effects, gradients, and smooth transitions

### 🔐 Security

- **JWT authentication**: Secure token-based auth with refresh mechanism
- **CSRF protection**: Double-submit cookie pattern for state-changing operations
- **Protected routes**: Route guards with `PrivateRoute` and `PublicRoute` components
- **Secure HTTP-only cookies**: Refresh tokens stored securely

### 🧪 Quality Assurance

- **Unit & Integration tests**: Comprehensive test coverage with Vitest
- **Component testing**: React Testing Library for UI component validation
- **TypeScript strict mode**: Type safety across the entire codebase
- **ESLint + Prettier**: Automated code quality and formatting

### 🎭 Demo Mode

- **MSW-powered mocking**: Fully functional demo without backend
- **37 mocked endpoints**: Complete CRUD operations across all domains
- **Realistic fake data**: Generated with Faker.js for authentic UX
- **Network simulation**: Configurable delays for realistic API behavior
- **State management**: In-memory persistence during session
- **Production-ready**: Seamless switch between mock and real API

---

## 🛠️ Tech Stack

### Core

| Technology     | Version | Purpose                                  |
| -------------- | ------- | ---------------------------------------- |
| **React**      | 18.3    | UI library with concurrent features      |
| **TypeScript** | 5.6     | Type-safe development                    |
| **Vite**       | 6.0     | Lightning-fast build tool and dev server |

### State Management

| Technology        | Version    | Purpose                      |
| ----------------- | ---------- | ---------------------------- |
| **Redux Toolkit** | 2.11       | Centralized state management |
| **RTK Query**     | (included) | Data fetching and caching    |
| **React Redux**   | 9.2        | React bindings for Redux     |

### Routing & Navigation

| Technology           | Version | Purpose                      |
| -------------------- | ------- | ---------------------------- |
| **React Router DOM** | 6.28.1  | Client-side routing (v6 API) |

### UI & Interactions

| Technology             | Version | Purpose                       |
| ---------------------- | ------- | ----------------------------- |
| **@dnd-kit/core**      | 6.3.1   | Drag and drop functionality   |
| **@dnd-kit/sortable**  | 10.0.0  | Sortable lists                |
| **@dnd-kit/modifiers** | 9.0.0   | DnD behavior modifiers        |
| **clsx**               | 2.1.1   | Conditional className utility |

### Date & Time

| Technology | Version | Purpose                       |
| ---------- | ------- | ----------------------------- |
| **dayjs**  | 1.11.19 | Lightweight date manipulation |

### Real-time & API

| Technology           | Version         | Purpose                                |
| -------------------- | --------------- | -------------------------------------- |
| **socket.io-client** | 4.8.1           | WebSocket client for real-time updates |
| **Axios**            | (via RTK Query) | HTTP client with interceptors          |

### Authentication

| Technology              | Version | Purpose                  |
| ----------------------- | ------- | ------------------------ |
| **@react-oauth/google** | 0.13    | Google OAuth integration |

### Testing

| Technology                      | Version | Purpose                                                   |
| ------------------------------- | ------- | --------------------------------------------------------- |
| **Vitest**                      | 3.2.4   | Unit and integration testing                              |
| **@testing-library/react**      | 16.3.0  | React component testing                                   |
| **@testing-library/user-event** | 14.6    | User interaction simulation                               |
| **@testing-library/jest-dom**   | 6.9     | Custom DOM matchers                                       |
| **happy-dom**                   | 20.0    | Lightweight DOM environment (Faster execution than jsdom) |
| **@vitest/ui**                  | 3.2     | Visual test runner interface                              |
| **@vitest/coverage-v8**         | 3.2     | Code coverage reports                                     |
| **MSW (Mock Service Worker)**   | 2.12    | API mocking for demo mode and testing                     |
| **@faker-js/faker**             | 10.1    | Realistic fake data generation                            |

### Code Quality

| Technology            | Version | Purpose                           |
| --------------------- | ------- | --------------------------------- |
| **ESLint**            | 9.x     | JavaScript/TypeScript linting     |
| **Prettier**          | 3.5     | Code formatting                   |
| **TypeScript ESLint** | 8.x     | TypeScript-specific linting rules |

### Build & Development

| Technology                   | Version | Purpose                                    |
| ---------------------------- | ------- | ------------------------------------------ |
| **pnpm**                     | 10.x    | Fast, disk space efficient package manager |
| **@vitejs/plugin-react-swc** | 3.5     | SWC-powered React plugin for Vite          |

---

## 🎭 Demo Mode

EvenTask includes a fully functional **demo mode** using Mock Service Worker (MSW), allowing you to explore features without a backend.

Demo mode intercepts API calls and responds with realistic fake data generated by Faker.js. All CRUD operations work normally, with state persisting during the session.

### Mocked Endpoints

**37 endpoints** across 8 domains:

| Domain            | Endpoints | Coverage                               |
| ----------------- | --------- | -------------------------------------- |
| **Auth**          | 9         | Login, register, refresh, password ops |
| **Tasks**         | 5         | CRUD with event synchronization        |
| **Events**        | 7         | CRUD, status updates, collaborators    |
| **Categories**    | 5         | CRUD with referential integrity        |
| **Notifications** | 4         | Mark as read, unread count             |
| **Users**         | 4         | Profile, contacts, avatar upload       |
| **Invitations**   | 3         | Send, accept, reject                   |
| **Security**      | 1         | CSRF token                             |

### Implementation

**Mock Data** (`src/tests/mocks/data/mockData.ts`):

- Tasks with events
- Notifications with varied statuses
- Categories
- Contacts

**Handlers** (`src/tests/mocks/handlers/`):

- Network delay simulation (FAST/NORMAL/SLOW)
- Circular reference handling (tasks ↔ events)
- Progress recalculation on event status change
- Cascade operations (delete task → delete events)

**Factories** (`src/tests/mocks/factories/`):

- Faker.js data generators for realistic content
- Overrides support for custom data
- Coherent relationships between entities

### Limitations

⚠️ Session-only persistence (resets on refresh)  
⚠️ Single-user simulation (no multi-user invitations)  
⚠️ No WebSocket mocking (real-time requires backend)

### Production Mode

MSW is excluded from production builds. Set `VITE_API_URL` in `.env` to point to your real backend.

---

## 🏗️ Architecture

### State Management (Redux Toolkit)

EvenTask uses **Redux Toolkit** with **RTK Query** for centralized state management and data fetching. State is organized into domain slices (auth, user, task, event, calendar) and UI slices (modals, toasts).
Entity data (tasks, events) uses **EntityAdapter** for normalized state with efficient CRUD operations.

**Key Features:**

- **Listener Middleware**: Handles side effects (toast notifications on CRUD operations)
- **RTK Query Middleware**: Automatic cache invalidation and refetching
- **Non-serializable Check Disabled**: Allows Date objects and complex types in state

### API Services (RTK Query)

All API calls are managed through RTK Query with automatic caching, deduplication, and refetching.

#### Base API Configuration

**Features:**

- **Automatic Token Refresh**: Intercepts 401 responses and refreshes JWT tokens
- **CSRF Protection**: Includes CSRF token in all state-changing requests
- **Promise Deduplication**: Prevents multiple simultaneous refresh calls
- **Error Handling**: Centralized error transformation with `parseRTKError()`

API services are organized by domain (auth, task, event, category, user, invitation, notification, security)
with standard CRUD operations injected into the base API using RTK Query's code splitting pattern.

### WebSocket Integration

Real-time features powered by **Socket.io**.

#### Connection Management

```typescript
// context/websocket/SocketProvider.tsx
const socket = io(VITE_API_URL, {
  auth: { token: accessToken },
  transports: ['websocket'],
  autoConnect: false, // Manual connection control
})
```

#### Event Handling

Currently, only **basic connection events** are implemented in `services/websocket/SocketService.ts`:

| Event             | Handler            | Action                               |
| ----------------- | ------------------ | ------------------------------------ |
| **connected**     | Connection handler | Logs connection, updates UI state    |
| **disconnect**    | Disconnect handler | Logs disconnection, updates UI state |
| **connect_error** | Error handler      | Attempts token refresh, logs error   |

**Connection Lifecycle:**

1. Connect after successful login (auth status changes to `authenticated`)
2. Disconnect on logout or auth errors
3. Auto-reconnect on connection loss (max 5 attempts)

### React Context & Custom Hooks

The app uses **React Context** for cross-cutting concerns (WebSocket connection, navigation history, sidebar state, search, drag & drop). **Custom hooks** encapsulate Redux operations (domain-specific actions for auth, tasks, events, categories, modals, toasts) and reusable UI logic (form management, horizontal scroll, page transitions, server warm-up).

### 🧠 UX Architecture

EvenTask implements the **App Shell Model** to improve perceived performance:

1. **Immediate Feedback**: The application structure (Header, Sidebar) renders immediately upon visit, bypassing the "white screen" effect.
2. **Smart Skeletons**: Instead of generic spinners, the app uses context-aware skeletons.
3. **Server Warm-up**: A "fire-and-forget" hook triggers a lightweight request to the backend on initial load to mitigate cold-start latency on serverless infrastructure.

---

## 🎨 Design System

EvenTask uses **CSS custom properties** and **Material Design 3** principles for a consistent, themeable design system.
All design tokens (colors, typography, spacing, elevation, border radius, state layers) are defined in `src/styles/base.css` following a semantic naming convention with light/dark theme support.

### Theming

**Light/Dark Mode:**

- System preference detection
- Persisted in localStorage
- Instant switching via `data-theme` attribute
- CSS variables cascade automatically

**Visual Effects:**

- Gradient backgrounds with color-mix
- Noise texture overlays for depth
- Shimmer animations on cards
- Elevation changes on hover/interaction

### Accessibility

**WCAG AA Compliance:**

- 4.5:1 minimum contrast ratio
- Keyboard navigation with visible focus rings
- Semantic HTML with ARIA labels
- Screen reader support for all interactive elements
- State communication via icons + text (not color alone)

---

## 🧪 Testing

### Test Stack

- **Vitest** (3.2) - Fast unit test runner with HMR
- **@testing-library/react** (16.3) - Component testing with user-centric queries
- **@testing-library/user-event** (14.6) - Realistic user interaction simulation
- **happy-dom** (20.0) - Lightweight DOM (faster than jsdom)
- **@testing-library/jest-dom** (6.9) - Custom DOM matchers

### Configuration

Tests co-located with components. Global test APIs enabled. Automatic cleanup after each test.

```bash
pnpm test       # Watch mode (development)
pnpm test:ui    # Visual UI (recommended)
pnpm test:run   # Single run (CI/CD)
pnpm test:ci    # With coverage report
```

**Coverage includes:**

- Form components (Input, Textarea, MultiSelect, EventForm)
- Feedback (Toast, Modal, LinearProgress, Loader)
- Interactive (Dropdowns, Avatars, DnD components)
- Accessibility validation (ARIA attributes, roles, keyboard navigation)

---

## 🔐 Security

EvenTask implements multiple layers of security to protect user data and prevent common vulnerabilities.

### Authentication Strategy

**JWT Token System:**

- **Access Token**: Short-lived (15min), stored in memory (Redux state)
- **Refresh Token**: Long-lived (7 days), HTTP-only cookie
- **Auto-Refresh**: 401 responses trigger automatic token refresh with promise deduplication
- **Route Guards**: Dual validation (Redux state + token presence)

### Security Features

| Feature               | Implementation                  | Protection                          |
| --------------------- | ------------------------------- | ----------------------------------- |
| **CSRF Protection**   | Double-submit cookie pattern    | State-changing operations validated |
| **XSS Prevention**    | Access token in memory only     | Never stored in localStorage        |
| **HTTP-Only Cookies** | Refresh token in secure cookie  | JavaScript cannot access            |
| **Input Validation**  | Client + server validation      | Email format, password strength     |
| **WebSocket Auth**    | JWT in connection handshake     | Token validated before connection   |
| **Route Protection**  | PrivateRoute/PublicRoute guards | Prevents unauthorized access        |

### Best Practices Implemented

✅ Tokens in memory (access) and HTTP-only cookies (refresh)  
✅ CSRF token for all mutations (POST, PUT, DELETE)  
✅ Automatic token refresh with seamless UX  
✅ TypeScript strict mode for compile-time safety  
✅ Promise deduplication prevents race conditions  
✅ CORS and CSP headers (backend cooperation)

**Security Considerations:**  
⚠️ Always use HTTPS in production  
⚠️ Never commit credentials in `.env`  
⚠️ Frontend security complements backend validation

---

## 📦 Reusable Components

**Production-ready components** with full TypeScript typing, ARIA compliance, and theme-aware styling (CSS variables).

**Design Principles:**

- Composition over configuration
- Accessibility first (ARIA, keyboard navigation)
- Performance optimized (memoization, lazy loading)
- Co-located tests with high coverage

---

## 🔄 Real-Time Features

**Socket.io WebSocket integration** with JWT authentication and auto-reconnect (max 5 attempts).

**Connection Management:**

- Manual control (connects on login, disconnects on logout)
- Token refresh on connection errors
- State exposed via `SocketContext` (isConnected, socketId)\*\*\*\*
- Foundation ready for domain-specific event **handlers**

---

---

## 📝 Code Conventions

EvenTask follows strict coding standards enforced by **ESLint**, **TypeScript strict mode**, and **Prettier**. Configuration files: `eslint.config.js`, `tsconfig.json`, `.prettierrc`.

### Key **Standards**

**TypeScript:**

- Strict mode enabled (no `any`, null checks, explicit returns)
- Type-first development with interfaces and generics
- Typed Redux hooks and RTK Query endpoints

**Naming:**

- Components: PascalCase (`Button.tsx`)
- Hooks: camelCase with `use` prefix (`useForm.ts`)
- Types/Interfaces: PascalCase (`Task.ts`)
- Constants: UPPER_SNAKE_CASE
- Variables/Functions: camelCase with descriptive verbs

**File Organization:**

- Component structure: Types → Component → Exports
- Import order: External → Internal (aliases) → Relative → Styles
- Tests co-located with components
- Named exports preferred over default exports

**Patterns:**

- Functional components with explicit TypeScript types
- Props destructuring with defaults
- Redux slices with EntityAdapter for normalized state
- Custom hooks for encapsulating Redux operations
- useMemo/useCallback for performance optimization
- JSDoc for helpers/utilities
- Descriptive test names following "should + behavior" pattern

**Auto-formatting:**

```bash
pnpm format  # Prettier
pnpm lint    # ESLint
pnpm typecheck  # TypeScript
```

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Redux Toolkit**

[⬆ Back to Top](#-eventask)

</div>
