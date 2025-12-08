# 🎯 EvenTask

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.5-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-9.x-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

**Collaborative task manager with integrated calendar and real-time notifications**

[Features](#-key-features) • [Installation](#-installation--setup) • [Architecture](#️-architecture) • [Testing](#-testing)

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

## 📸 Interface Preview

<div align="center">
  <img src="public/images/demo-preview.gif" alt="EvenTask Dashboard Demo" width="100%" />
</div>

<details>
<summary>👀 See more screenshots</summary>
<br>

| Login & Auth           | Task Board (Kanban)    |
| ---------------------- | ---------------------- |
| ![Login](url_to_image) | ![Board](url_to_image) |

| Mobile View             | Dark Mode             |
| ----------------------- | --------------------- |
| ![Mobile](url_to_image) | ![Dark](url_to_image) |

</details>

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

---

## 🛠️ Tech Stack

### Core

| Technology     | Version | Purpose                                  |
| -------------- | ------- | ---------------------------------------- |
| **React**      | 18.x    | UI library with concurrent features      |
| **TypeScript** | 5.x     | Type-safe development                    |
| **Vite**       | 5.x     | Lightning-fast build tool and dev server |

### State Management

| Technology        | Version    | Purpose                      |
| ----------------- | ---------- | ---------------------------- |
| **Redux Toolkit** | 2.5.1      | Centralized state management |
| **RTK Query**     | (included) | Data fetching and caching    |
| **React Redux**   | 9.2.0      | React bindings for Redux     |

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
| **dayjs**  | 1.11.13 | Lightweight date manipulation |

### Real-time & API

| Technology           | Version         | Purpose                                |
| -------------------- | --------------- | -------------------------------------- |
| **socket.io-client** | 4.8.1           | WebSocket client for real-time updates |
| **Axios**            | (via RTK Query) | HTTP client with interceptors          |

### Authentication

| Technology              | Version | Purpose                  |
| ----------------------- | ------- | ------------------------ |
| **@react-oauth/google** | 0.12.2  | Google OAuth integration |

### Testing

| Technology                      | Version | Purpose                                                   |
| ------------------------------- | ------- | --------------------------------------------------------- |
| **Vitest**                      | 3.2.4   | Unit and integration testing                              |
| **@testing-library/react**      | 16.3.0  | React component testing                                   |
| **@testing-library/user-event** | 14.6.1  | User interaction simulation                               |
| **@testing-library/jest-dom**   | 6.6.3   | Custom DOM matchers                                       |
| **happy-dom**                   | 18.0.1  | Lightweight DOM environment (Faster execution than jsdom) |
| **@vitest/ui**                  | 3.2.4   | Visual test runner interface                              |
| **@vitest/coverage-v8**         | 3.2.4   | Code coverage reports                                     |

### Code Quality

| Technology            | Version | Purpose                           |
| --------------------- | ------- | --------------------------------- |
| **ESLint**            | 9.x     | JavaScript/TypeScript linting     |
| **Prettier**          | 3.4.2   | Code formatting                   |
| **TypeScript ESLint** | 8.x     | TypeScript-specific linting rules |

### Build & Development

| Technology                   | Version | Purpose                                    |
| ---------------------------- | ------- | ------------------------------------------ |
| **pnpm**                     | 9.x     | Fast, disk space efficient package manager |
| **@vitejs/plugin-react-swc** | 3.8.0   | SWC-powered React plugin for Vite          |

---

## 📁 Project Structure

```
eventask/
├── .github/
│   └── instructions/          # Copilot and development guidelines
├── coverage/                  # Test coverage reports (generated)
├── dist/                     # Production build output (generated)
├── node_modules/             # Dependencies (generated)
├── public/
│   └── images/               # Static assets (auth, landing, onboarding)
├── src/
│   ├── api/                  # API configuration and types
│   │   ├── helpers/          # Error handling utilities
│   │   └── types/            # API response types, HTTP status codes
│   │
│   ├── auth/                 # Authentication module
│   │   ├── components/       # Auth-specific components (AuthBlob, etc.)
│   │   ├── constants/        # Auth status constants
│   │   ├── layout/           # AuthLayout for login/register pages
│   │   ├── pages/            # Login, Register, ForgotPassword, ResetPassword
│   │   └── social/           # Social auth integrations (Google OAuth)
│   │
│   ├── calendar/             # Calendar module
│   │   ├── components/       # Calendar UI components
│   │   ├── event-timeline-item/ # Event display components
│   │   ├── hooks/            # Calendar-specific hooks
│   │   ├── layouts/          # CalendarLayout
│   │   ├── pages/            # CalendarPage
│   │   └── utils/            # Calendar helpers
│   │
│   ├── components/           # Shared reusable components
│   │   ├── avatar-dropdown/  # User avatar with dropdown menu
│   │   ├── breadcrumb/       # Navigation breadcrumb
│   │   ├── button/           # Button component
│   │   ├── button-link/      # Link styled as button
│   │   ├── button-theme/     # Theme toggle button
│   │   ├── chip/             # Chip/Tag component
│   │   ├── confirm-modal/    # Confirmation dialog
│   │   ├── drag-n-drop/      # DnD wrappers and overlays
│   │   ├── draggable-user-avatar/ # Draggable avatar for participant assignment
│   │   ├── dropdown/         # Generic dropdown component
│   │   ├── event-form/       # Event creation/editing form
│   │   ├── fab-arrow/        # Floating action button with arrow
│   │   ├── icons/            # SVG icon components
│   │   ├── input/            # Text input component
│   │   ├── input-with-suggestions/ # Autocomplete input
│   │   ├── linear-progress/  # Progress bar
│   │   ├── loader/           # Loading spinner
│   │   ├── modal/            # Generic modal dialog
│   │   ├── multi-select-input/ # Multi-selection dropdown
│   │   ├── notification-dropdown/ # Notification center
│   │   ├── skeletons/        # UI Skeletons (AppShell, Calendar, Generic)
│   │   ├── scrollable-container/ # Horizontal scroll wrapper
│   │   ├── sidebar/          # Main navigation sidebar
│   │   ├── slide-transition/ # Slide animation wrapper
│   │   ├── table/            # Generic data table
│   │   ├── text-area/        # Textarea component
│   │   ├── toast/            # Toast notification system
│   │   ├── user-avatar/      # User avatar display
│   │   └── users-avatars/    # Multiple user avatars group
│   │
│   ├── context/              # React Context providers
│   │   ├── drag/             # DnD context (DragProviders)
│   │   ├── navigation/       # Navigation history tracking
│   │   ├── search/           # Search state management
│   │   ├── sidebar/          # Sidebar collapse state
│   │   └── websocket/        # Socket.io connection provider
│   │
│   ├── helpers/              # Helper functions
│   │   ├── form-validations/ # Form validation schemas
│   │   │   ├── getEventFormValidations.ts
│   │   │   ├── getLoginFormValidations.ts
│   │   │   ├── getRegisterFormValidations.ts
│   │   │   ├── getTaskFormValidations.ts
│   │   │   └── ...
│   │   ├── buildImageUrl.ts  # Image URL builder
│   │   ├── getEnvVariables.ts # Environment variable helper
│   │   └── getValidEmail.ts  # Email validation regex
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useForm.ts        # Form state management
│   │   ├── useHorizontalScroll.ts # Horizontal scroll handler
│   │   └── useTransitionPage.ts # Page transition animations
│   │
│   ├── layouts/              # Layout components
│   │   └── RootLayout.tsx    # Main app layout with sidebar
│   │
│   ├── pages/                # Standalone pages
│   │   ├── 404Page/          # Not found page
│   │   ├── landing-page/     # Public landing page
│   │   ├── loader-page/      # Loading screen
│   │   ├── see-all-page/     # Generic table view (tasks, categories, notifications)
│   │   └── welcome-onboarding/ # First-time user onboarding
│   │
│   ├── router/               # Routing configuration
│   │   ├── AppRouter.tsx     # Main router with route guards
│   │   ├── lazyPages.ts      # Lazy-loaded page components
│   │   ├── PrivateRoute.tsx  # Protected route wrapper
│   │   └── PublicRoute.tsx   # Public route wrapper
│   │
│   ├── services/             # RTK Query API services
│   │   ├── baseApi.ts        # Base API configuration with auth interceptors
│   │   ├── authApi.ts        # Authentication endpoints
│   │   ├── categoryApi.ts    # Category CRUD operations
│   │   ├── eventApi.ts       # Event CRUD operations
│   │   ├── invitationApi.ts  # Invitation management
│   │   ├── notificationApi.ts # Notification operations
│   │   ├── securityApi.ts    # CSRF token management
│   │   ├── taskApi.ts        # Task CRUD operations
│   │   ├── userApi.ts        # User profile and contacts
│   │   └── websocket/        # WebSocket event handlers
│   │
│   ├── store/                # Redux store configuration
│   │   ├── slices/           # Redux slices
│   │   │   ├── auth/         # Authentication state
│   │   │   ├── calendar/     # Calendar state
│   │   │   ├── event/        # Events state (EntityAdapter)
│   │   │   ├── security/     # CSRF token state
│   │   │   ├── task/         # Tasks state (EntityAdapter)
│   │   │   ├── ui/           # UI state (modals, toasts)
│   │   │   └── user/         # User profile state
│   │   ├── hooks/            # Typed Redux hooks
│   │   ├── middlewares/      # Custom middlewares (toast notifications)
│   │   ├── listenerMiddleware.ts # RTK listener middleware
│   │   ├── reduxStore.ts     # Store configuration
│   │   ├── rootReducer.ts    # Combined reducers
│   │   └── store.ts          # Main store export
│   │
│   ├── styles/               # Global styles
│   │   ├── base.css          # CSS custom properties (colors, spacing, etc.)
│   │   ├── styles.css        # Global base styles
│   │   ├── browser-fixes.css # Browser-specific fixes
│   │   └── transition-page.css # Page transition animations
│   │
│   ├── sys-events/           # System event handlers
│   │
│   ├── task/                 # Task module
│   │   ├── components/       # Task-specific components
│   │   │   ├── categories/   # Category list view
│   │   │   ├── clock/        # Clock display
│   │   │   ├── header/       # Task module header
│   │   │   ├── ongoing-tasks/ # Task cards
│   │   │   ├── schedule/     # Event schedule view
│   │   │   ├── search/       # Task search
│   │   │   └── task-info/    # Task details display
│   │   ├── consts/           # Task constants
│   │   ├── hooks/            # Task-specific hooks
│   │   └── pages/            # Task pages
│   │       ├── HomePage.tsx      # Dashboard with tasks and categories
│   │       ├── TaskDetailPage.tsx      # Individual task view
│   │       └── TaskFormPage.tsx  # Task creation/editing
│   │
│   ├── tests/                # Test configuration
│   │   ├── setup.ts          # Vitest setup file
│   │   └── vitest.d.ts       # Vitest type definitions
│   │
│   ├── types/                # TypeScript type definitions
│   │   ├── dtos/             # Data Transfer Objects
│   │   ├── ui/               # UI-specific types (DnD, table, modals, etc.)
│   │   ├── ITask.ts          # Task interface
│   │   ├── IEvent.ts         # Event interface
│   │   ├── IUser.ts          # User interface
│   │   ├── ICategory.ts      # Category interface
│   │   ├── INotification.ts  # Notification interface
│   │   └── ...
│   │
│   ├── user/                 # User profile module
│   │   └── pages/            # User profile page
│   │
│   ├── utils/                # Utility functions
│   │   ├── computedEvents.ts # Event calculation helpers
│   │   └── eventNotificationMapping.ts # Event-to-notification mapping
│   │
│   ├── main.tsx              # Application entry point
│   ├── EvenTask.tsx          # Root app component with providers
│   └── vite-env.d.ts         # Vite type definitions
│
├── .gitignore
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── pnpm-lock.yaml            # pnpm lock file
├── pnpm-workspace.yaml       # pnpm workspace configuration
├── README.md                 # This file
├── tsconfig.json             # TypeScript configuration (root)
├── tsconfig.app.json         # TypeScript configuration (app)
├── tsconfig.node.json        # TypeScript configuration (node)
├── vercel.json               # Vercel deployment config
└── vite.config.ts            # Vite configuration
```

### 🏛️ Architecture Patterns

- **Feature-based organization**: Modules grouped by domain (auth, task, calendar, user)
- **Shared components**: Reusable UI components in `src/components/`
- **Service layer**: API calls centralized in `src/services/` using RTK Query
- **Type safety**: All types defined in `src/types/` with strict TypeScript
- **Context providers**: React Context for cross-cutting concerns (WebSocket, navigation, sidebar)
- **Custom hooks**: Reusable logic in `src/hooks/` and domain-specific hooks in module folders

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **pnpm**: v9.x or higher ([Installation guide](https://pnpm.io/installation))

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Verify installation
pnpm --version
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:4000/api

# Google OAuth (optional - for social login)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Environment
VITE_ENV=development
```

> **Note**: All environment variables must be prefixed with `VITE_` to be accessible in the client-side code.
>
> 🔑 **Setup**: To get your `VITE_GOOGLE_CLIENT_ID`, create a project in Google Cloud Console following the [official guide](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid).

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/agusmoya/eventask.git
cd eventask
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start the development server**

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `pnpm dev`       | Starts the Vite development server with HMR      |
| `pnpm build`     | Builds the app for production to `dist/` folder  |
| `pnpm preview`   | Serves the production build locally for preview  |
| `pnpm lint`      | Runs ESLint to check for code quality issues     |
| `pnpm lint:fix`  | Automatically fixes ESLint errors where possible |
| `pnpm format`    | Formats code with Prettier                       |
| `pnpm typecheck` | Runs TypeScript compiler without emitting files  |
| `pnpm test`      | Runs tests in watch mode                         |
| `pnpm test:ui`   | Opens Vitest UI for interactive test running     |
| `pnpm test:run`  | Runs all tests once (CI mode)                    |
| `pnpm test:ci`   | Runs tests with coverage report                  |

### Development Workflow

```bash
# Start development server
pnpm dev

# In another terminal, run tests in watch mode
pnpm test

# Before committing, run quality checks
pnpm typecheck
pnpm lint
pnpm format
```

---

## 🏗️ Architecture

### State Management (Redux Toolkit)

EvenTask uses **Redux Toolkit** with **RTK Query** for centralized state management and data fetching.

#### Redux Slices

| Slice                | Purpose                 | Key Features                        |
| -------------------- | ----------------------- | ----------------------------------- |
| **authSlice**        | Authentication state    | JWT tokens, user ID, auth status    |
| **userSlice**        | User profile & contacts | Profile data, contact list          |
| **taskSlice**        | Task entities           | EntityAdapter for normalized tasks  |
| **eventSlice**       | Event entities          | EntityAdapter for normalized events |
| **calendarDaySlice** | Calendar state          | Selected date, view mode            |
| **modalSlice**       | UI modals               | Modal open/close state by ID        |
| **toastSlice**       | Toast notifications     | Toast queue with auto-dismiss       |
| **securitySlice**    | CSRF protection         | CSRF token storage                  |

#### Store Configuration

```typescript
// store/store.ts
configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend(listenerMiddleware.middleware)
      .concat(baseApi.middleware),
})
```

**Key Features:**

- **Listener Middleware**: Handles side effects (toast notifications on CRUD operations)
- **RTK Query Middleware**: Automatic cache invalidation and refetching
- **Non-serializable Check Disabled**: Allows Date objects and complex types in state

### API Services (RTK Query)

All API calls are managed through RTK Query with automatic caching, deduplication, and refetching.

#### Base API Configuration

```typescript
// services/baseApi.ts
createApi({
  reducerPath: 'baseApi',
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ['Auth', 'User', 'Task', 'Event', 'Category', 'Notification', 'Invitation'],
  endpoints: () => ({}), // Injected by feature APIs
})
```

**Features:**

- **Automatic Token Refresh**: Intercepts 401 responses and refreshes JWT tokens
- **CSRF Protection**: Includes CSRF token in all state-changing requests
- **Promise Deduplication**: Prevents multiple simultaneous refresh calls
- **Error Handling**: Centralized error transformation with `getErrorMessage()`

#### Available API Services

| Service             | Endpoints                                                       | Purpose                   |
| ------------------- | --------------------------------------------------------------- | ------------------------- |
| **authApi**         | login, register, refresh, logout, forgotPassword, resetPassword | Authentication operations |
| **taskApi**         | getTasks, getTaskById, createTask, updateTask, deleteTask       | Task CRUD                 |
| **eventApi**        | getEvents, createEvent, updateEvent, deleteEvent                | Event CRUD                |
| **categoryApi**     | getCategories, createCategory, updateCategory, deleteCategory   | Category CRUD             |
| **userApi**         | getProfile, updateProfile, getContacts, removeContact           | User management           |
| **invitationApi**   | inviteContact, acceptInvitation, rejectInvitation               | Invitation flow           |
| **notificationApi** | getNotifications, markAsRead, deleteNotification                | Notification management   |
| **securityApi**     | getCsrfToken                                                    | CSRF token retrieval      |

### Routing System

#### Route Structure

```
/ (root)
├── /auth/*           [PUBLIC]  - Login, Register, ForgotPassword, ResetPassword
├── /calendar/*       [PRIVATE] - CalendarPage
├── /home             [PRIVATE] - HomePage (dashboard)
├── /task/:id         [PRIVATE] - TaskDetailPage (individual task view)
├── /task-form        [PRIVATE] - TaskFormPage (create)
├── /task-form/:id    [PRIVATE] - TaskFormPage (edit)
├── /profile          [PRIVATE] - UserProfilePage
├── /see-all          [PRIVATE] - SeeAllPage (generic table view)
└── /not-found        [PUBLIC]  - 404 Page
```

#### Route Guards

**PrivateRoute**

```typescript
// Protects authenticated routes
// Checks: AUTH_STATUS === 'authenticated' && accessToken exists
// Redirects to: /auth/login if not authenticated
```

**PublicRoute**

```typescript
// Protects public-only routes (login, register)
// Checks: AUTH_STATUS !== 'authenticated' || !accessToken
// Redirects to: /home if already authenticated
```

**Why Both Checks?**

- Prevents access to private routes without valid token
- Prevents authenticated users from accessing login/register
- Ensures consistency between Redux state and actual token presence

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

> **Note**: Domain-specific event handlers (task/event/notification CRUD) are planned but not yet implemented. See [Roadmap](#-roadmap).

**Connection Lifecycle:**

1. Connect after successful login (auth status changes to `authenticated`)
2. Disconnect on logout or auth errors
3. Auto-reconnect on connection loss (max 5 attempts)

### React Context Providers

| Context                | Purpose                     | Usage                                              |
| ---------------------- | --------------------------- | -------------------------------------------------- |
| **SocketProvider**     | WebSocket connection state  | Provides `isConnected`, `socketId`                 |
| **NavigationProvider** | Navigation history tracking | Tracks previous route for breadcrumbs              |
| **SidebarProvider**    | Sidebar collapse state      | Manages sidebar open/close state                   |
| **SearchProvider**     | Search functionality        | Task/event search state                            |
| **DragProviders**      | Drag & drop context         | Wraps DndContext, sensors, and collision detection |

### Custom Hooks

#### Domain-Specific Hooks

| Hook                   | Location       | Purpose                                  |
| ---------------------- | -------------- | ---------------------------------------- |
| **useAuthActions**     | `store/hooks/` | Auth operations (login, logout, refresh) |
| **useTaskActions**     | `store/hooks/` | Task CRUD operations                     |
| **useEventActions**    | `store/hooks/` | Event CRUD operations                    |
| **useCategoryActions** | `store/hooks/` | Category operations                      |
| **useModalActions**    | `store/hooks/` | Modal open/close control                 |
| **useToastActions**    | `store/hooks/` | Toast notifications                      |

#### Utility Hooks

| Hook                    | Location | Purpose                                       |
| ----------------------- | -------- | --------------------------------------------- |
| **useForm**             | `hooks/` | Generic form state management with validation |
| **useHorizontalScroll** | `hooks/` | Horizontal scroll with wheel event handling   |
| **useTransitionPage**   | `hooks/` | Page transition animations                    |
| **useServerWarmup**     | `hooks/` | Triggers backend wake-up on app mount         |


### 🧠 UX Architecture

EvenTask implements the **App Shell Model** to improve perceived performance:

1. **Immediate Feedback**: The application structure (Header, Sidebar) renders immediately upon visit, bypassing the "white screen" effect.
2. **Smart Skeletons**: Instead of generic spinners, the app uses context-aware skeletons:
   - **AppShellSkeleton**: For initial auth checking.
   - **CalendarSkeleton**: Mimics the grid layout for the calendar module.
   - **TaskFormSkeleton**: Simulates inputs and controls for editing states.
3. **Server Warm-up**: A "fire-and-forget" hook triggers a lightweight request to the backend on initial load to mitigate cold-start latency on serverless infrastructure.

---

## 🎨 Design System

### CSS Custom Properties (Theming)

EvenTask uses **CSS custom properties** (CSS variables) for a consistent, maintainable design system located in `src/styles/base.css`.

#### Color System

Based on **Material Design 3** color roles with full light/dark theme support:

```css
:root {
  /* Light theme (default) */
  --color-primary: hsl(244, 84%, 60%);
  --color-on-primary: hsl(0, 0%, 100%);
  --color-primary-container: hsl(240, 80%, 95%);
  --color-surface: hsl(0, 0%, 98%);
  --color-on-surface: hsl(0, 0%, 10%);
  /* ... more color roles */
}

[data-theme='dark'] {
  /* Dark theme overrides */
  --color-primary: hsl(244, 70%, 70%);
  --color-surface: hsl(0, 0%, 10%);
  --color-on-surface: hsl(0, 0%, 95%);
  /* ... more color roles */
}
```

#### Typography Scale

EvenTask uses a global typography utility system inspired by Material Design 3. All text styles are defined as utility classes in `src/styles/base.css` and applied via `className` (e.g., `text-title-lg`, `text-title-md`). This ensures consistent, accessible, and maintainable typography across the app.

**Key Features:**
- Utility classes for headings, subtitles, body, and captions (e.g., `text-title-lg`, `text-body-md`, `text-caption-sm`)
- Responsive font sizes and weights
- Accessible contrast and line-height
- Used in components via `className`, e.g.:
  ```tsx
  <h1 className="text-title-lg">Title</h1>
  <p className="text-title-md">Subtitle</p>
  ```
- All typography utilities are documented and maintained in `src/styles/base.css`

**Example Utility Classes:**
```css
.text-title-lg {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}
.text-title-md {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}
.text-body-md {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

```

> **Note:** Typography utilities are global for consistency and accessibility. For component-specific styles, use CSS Modules.

#### Spacing System

Consistent spacing scale based on multiples of 0.25rem (4px):

```css
--spacing-2xl: 3rem;
--spacing-xl: 2rem;
--spacing-lg: 1.5rem;
--spacing-md-plus: 1.25rem;
--spacing-md: 1rem;
--spacing-sm-plus: 0.75rem;
--spacing-sm: 0.5rem;
--spacing-xs: 0.25rem;
```

#### Elevation System

Material Design 3 elevation with shadow layers:

```css
--elevation-1: 0 1px 4px var(--color-shadow); /* Cards */
--elevation-2: 0 2px 6px var(--color-shadow); /* Raised elements */
--elevation-3: 0 3px 7px var(--color-shadow); /* Hover states */
```

#### Visual Effects

```css
--noise-texture: url('data:image/svg+xml,...'); /* Grain overlay */
--color-shimmer-effect: hsla(0, 0%, 100%, 0.4); /* Shimmer animation */
```

### Theme Implementation

#### Light/Dark Mode Toggle

```typescript
// components/button-theme/ButtonTheme.tsx
const [theme, setTheme] = useState<'light' | 'dark'>('light')

useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme)
}, [theme])
```

**Features:**

- System preference detection
- Persisted in localStorage
- Instant theme switching without page reload
- CSS variables cascade automatically

### Material Design 3 Principles

#### State Layers

Interactive elements use state layers for feedback:

```css
--state-layer-hover-opacity: 0.08;
--state-layer-focus-opacity: 0.1;
--state-layer-pressed-opacity: 0.13;
--state-layer-dragged-opacity: 0.16;
```

#### Border Radius System

```css
--radius-xl: 2rem; /* 32px - Large cards */
--radius-lg: 1.5rem; /* 24px - Cards */
--radius-md: 1rem; /* 16px - Buttons */
--radius-sm: 0.5rem; /* 8px - Chips */
--radius-xs: 0.25rem; /* 4px - Input fields */
```

### Component Styling Patterns

#### Card Components (Modern Effects)

Example: `OngoingTask.css`, `Categories.css`

**4-Layer Visual System:**

1. **Base Gradient**

```css
background: linear-gradient(
  135deg,
  var(--color-primary-container),
  color-mix(in srgb, var(--color-primary-container) 80%, var(--color-primary))
);
```

2. **Noise Texture Overlay**

```css
.card::after {
  content: '';
  background-image: var(--noise-texture);
  opacity: 0.1;
  mix-blend-mode: overlay;
}
```

3. **Shimmer Effect**

```css
.card::before {
  content: '';
  background: linear-gradient(90deg, transparent, var(--color-shimmer-effect), transparent);
  animation: shimmer 3s infinite;
}
```

4. **Elevation on Hover**

```css
.card:hover {
  box-shadow: var(--elevation-3);
  transform: translateY(-4px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Accessibility (a11y)

#### Keyboard Navigation

- **Tab order**: Logical navigation flow
- **Focus indicators**: Visible focus rings on all interactive elements
- **Skip links**: Skip to main content functionality

#### Screen Reader Support

```html
<!-- Semantic HTML with ARIA labels -->
<button aria-label="Delete task" aria-describedby="task-name">
  <DeleteIcon />
</button>

<!-- Role attributes for custom components -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <!-- Modal content -->
</div>
```

#### Color Contrast

- **WCAG AA compliance**: Minimum 4.5:1 contrast ratio for text
- **Focus indicators**: High contrast focus rings
- **State communication**: Not relying solely on color (icons + text)

---

## 🧪 Testing

EvenTask uses **Vitest** with **@testing-library/react** for comprehensive testing coverage.

### Test Configuration

#### Vitest Setup

```typescript
// vite.config.ts
export default defineConfig({
  test: {
    environment: 'happy-dom', // Lightweight DOM environment
    globals: true, // Global test APIs (describe, it, expect)
    setupFiles: './src/tests/setup.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
})
```

#### Setup File

```typescript
// src/tests/setup.ts
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

afterEach(() => cleanup())
```

**Features:**

- **happy-dom**: Fast, lightweight DOM implementation (faster than jsdom)
- **Global APIs**: No need to import `describe`, `it`, `expect` in every test
- **Auto cleanup**: Automatic DOM cleanup after each test
- **jest-dom matchers**: Extended assertions (`toBeInTheDocument`, `toHaveAttribute`, etc.)

### Test Structure

#### Component Tests Location

Tests are co-located with their components:

```
src/components/
├── button/
│   ├── Button.tsx
│   ├── Button.test.tsx    ✅
│   └── Button.css
├── input/
│   ├── Input.tsx
│   ├── Input.test.tsx     ✅
│   └── Input.css
```

#### Test Coverage

Current test files (20+ component tests):

| Component                | Test File                       | Coverage                       |
| ------------------------ | ------------------------------- | ------------------------------ |
| **UserAvatar**           | `UserAvatar.test.tsx`           | Basic rendering, props         |
| **UsersAvatars**         | `UsersAvatars.test.tsx`         | Multiple users, draggable mode |
| **Toast**                | `Toast.test.tsx`                | All variants, auto-dismiss     |
| **ToastContainer**       | `ToastContainer.test.tsx`       | Toast queue, removal           |
| **Textarea**             | `Textarea.test.tsx`             | Validation, error states, a11y |
| **Modal**                | `Modal.test.tsx`                | Open/close, backdrop click     |
| **LinearProgress**       | `LinearProgress.test.tsx`       | Progress values, labels        |
| **Loader**               | `Loader.test.tsx`               | Loading state                  |
| **Input**                | `Input.test.tsx`                | Validation, error messages     |
| **InputWithSuggestions** | `InputWithSuggestions.test.tsx` | Autocomplete, selection        |
| **MultiSelectInput**     | `MultiSelectInput.test.tsx`     | Multi-selection, filtering     |
| **EventForm**            | `EventForm.test.tsx`            | Form submission, validation    |
| **ScrollableContainer**  | `ScrollableContainer.test.tsx`  | Scroll behavior                |
| **SlideTransition**      | `SlideTransition.test.tsx`      | Animation directions           |
| **NotificationDropdown** | `NotificationDropdown.test.tsx` | Dropdown views, actions        |
| **NotificationList**     | `NotificationList.test.tsx`     | List rendering, filtering      |
| **InvitationDetailView** | `InvitationDetailView.test.tsx` | Accept/reject actions          |

### Testing Patterns

#### Basic Component Test

```typescript
// Example: UserAvatar.test.tsx
import { render, screen } from '@testing-library/react'
import { UserAvatar } from './UserAvatar'

describe('UserAvatar', () => {
  it('should render user initials when no image URL', () => {
    render(<UserAvatar firstName="John" lastName="Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })
})
```

#### User Interaction Test

```typescript
// Example: Toast.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('should call onClose when close button clicked', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()

  render(<Toast message="Test" onClose={onClose} />)

  const closeButton = screen.getByRole('button', { name: /close/i })
  await user.click(closeButton)

  expect(onClose).toHaveBeenCalledTimes(1)
})
```

#### Mocking Components

```typescript
// Mocking child components to isolate tests
vi.mock('../user-avatar/UserAvatar', () => ({
  UserAvatar: vi.fn(({ firstName, lastName }) => (
    <div data-testid="user-avatar">
      {firstName} {lastName}
    </div>
  )),
}))
```

#### Redux Integration Tests

```typescript
// Testing components with Redux
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

const mockStore = configureStore({
  reducer: { /* mock reducers */ },
})

render(
  <Provider store={mockStore}>
    <ComponentWithRedux />
  </Provider>
)
```

### Running Tests

#### Watch Mode (Development)

```bash
pnpm test
```

**Features:**

- Auto-reruns tests on file changes
- Filtered mode (only run related tests)
- Interactive CLI

#### Visual UI (Recommended)

```bash
pnpm test:ui
```

**Features:**

- Browser-based test runner
- Visual test results
- File tree navigation
- Console output inspection

#### Single Run (CI/CD)

```bash
pnpm test:run
```

**Output:**

- Summary of passed/failed tests
- Exit code 0 (success) or 1 (failure)
- Suitable for CI pipelines

#### Coverage Report

```bash
pnpm test:ci
```

**Generates:**

- `coverage/index.html` - Interactive HTML report
- `coverage/clover.xml` - Clover XML format
- `coverage/coverage-final.json` - JSON coverage data
- Console summary with coverage percentages

> **Note**: To enable additional formats (LCOV for CI tools), add coverage configuration to `vite.config.ts`:
>
> ```typescript
> test: {
>   coverage: {
>     reporter: ['text', 'html', 'clover', 'lcov', 'json']
>   }
> }
> ```

**Coverage Metrics:**

- **Statements**: % of executed code statements
- **Branches**: % of executed conditional branches
- **Functions**: % of called functions
- **Lines**: % of executed lines

### Accessibility Testing

Many tests include accessibility checks:

```typescript
// ARIA attributes
expect(textarea).toHaveAttribute('aria-describedby', 'desc-error')
expect(input).toHaveAttribute('aria-invalid', 'true')

// Roles and labels
const button = screen.getByRole('button', { name: /delete/i })
const dialog = screen.getByRole('dialog', { name: /confirm/i })
```

### Best Practices

✅ **Do:**

- Test user behavior, not implementation details
- Use `screen.getByRole()` for better accessibility
- Mock external dependencies (APIs, WebSocket)
- Test error states and edge cases
- Keep tests focused (one assertion per test when possible)

❌ **Don't:**

- Test internal component state directly
- Over-mock (test real integrations when possible)
- Write tests that depend on other tests
- Test third-party library implementations

---

## 🔐 Security

EvenTask implements multiple layers of security to protect user data and prevent common vulnerabilities.

### Authentication Flow

#### JWT Token Strategy

```
Client Login → Server validates → Returns { accessToken, refreshToken }
├── accessToken: Short-lived (15min), stored in memory (Redux state)
└── refreshToken: Long-lived (7 days), stored in HTTP-only cookie
```

**Token Lifecycle:**

1. **Login**: User receives both tokens
2. **API Requests**: `accessToken` sent in `Authorization` header
3. **Token Expiration**: 401 response triggers automatic refresh
4. **Refresh**: New `accessToken` obtained using `refreshToken` cookie
5. **Logout**: Both tokens invalidated on server

#### Automatic Token Refresh

```typescript
// services/baseApi.ts
// Intercepts 401 responses and refreshes token automatically
if (result.error?.status === 401 && !isAuthPath(url)) {
  const refreshResult = await attemptTokenRefresh(api)

  if (refreshResult.data) {
    // Retry original request with new token
    return await baseQuery(originalArgs, api, extraOptions)
  }
}
```

**Promise Deduplication Pattern:**

- Multiple simultaneous 401s trigger only ONE refresh call
- Other requests wait for the same refresh promise
- Prevents refresh token race conditions

### CSRF Protection

#### Double-Submit Cookie Pattern

```typescript
// 1. Client requests CSRF token on app load
const { data: csrfToken } = await getCsrfToken()

// 2. Token stored in Redux state
dispatch(setCsrfToken(csrfToken))

// 3. Included in all state-changing requests (POST, PUT, DELETE)
headers.set('X-CSRF-Token', csrfToken)
```

**Why This Works:**

- CSRF token stored in Redux state (client-side)
- Attacker cannot access token from different origin
- Server validates token matches for state-changing operations

### Route Protection

#### PrivateRoute Component

```typescript
// router/PrivateRoute.tsx
const PrivateRoute = ({ children }) => {
  const { status, accessToken } = useAppSelector(state => state.auth)

  // Dual validation: Redux state + token presence
  const isAuthenticated = status === 'authenticated' && !!accessToken

  return isAuthenticated ? children : <Navigate to="/auth/login" />
}
```

**Protection Layers:**

1. **Redux State Check**: Validates `AUTH_STATUS === 'authenticated'`
2. **Token Presence**: Verifies `accessToken` exists in memory
3. **Server Validation**: API validates token signature and expiration

#### PublicRoute Component

```typescript
// router/PublicRoute.tsx
const PublicRoute = ({ children }) => {
  const { status, accessToken } = useAppSelector(state => state.auth)

  // Prevent authenticated users from accessing login/register
  const isAuthenticated = status === 'authenticated' && !!accessToken

  return !isAuthenticated ? children : <Navigate to="/home" />
}
```

**Prevents:**

- Authenticated users accessing login/register pages
- Confusion about current auth state
- Unnecessary auth attempts

### HTTP-Only Cookies

**Refresh Token Storage:**

```
Set-Cookie: refreshToken=xxx; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

**Security Benefits:**

- `HttpOnly`: Not accessible via JavaScript (XSS protection)
- `Secure`: Only sent over HTTPS in production
- `SameSite=Strict`: CSRF protection at cookie level
- `Max-Age=604800`: 7-day expiration

### Input Validation

#### Client-Side Validation

```typescript
// helpers/form-validations/
export const loginFormValidations = {
  email: [(value: string) => emailRegex.test(value), 'Invalid email format'],
  password: [(value: string) => value.length >= 8, 'Minimum 8 characters'],
}
```

**Validation Layers:**

1. **Email Format**: Regex validation (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
2. **Password Strength**: Minimum length requirements
3. **Form State**: Error messages displayed on blur/submit
4. **Server-Side**: Final validation on backend (not client-only)

### WebSocket Security

#### Authentication

```typescript
// context/websocket/SocketProvider.tsx
const socket = io(VITE_API_URL, {
  auth: { token: accessToken }, // JWT sent on connection
  transports: ['websocket'],
})
```

**Connection Flow:**

1. Client sends `accessToken` in connection handshake
2. Server validates token before accepting connection
3. Invalid token → connection rejected
4. Token expiration → auto-disconnect

### Security Headers

While configured on the backend, the frontend cooperates with:

- **CORS**: Strict origin validation
- **Content-Security-Policy**: Restricts resource loading
- **X-Content-Type-Options**: Prevents MIME sniffing

### Best Practices Implemented

✅ **Access Token in Memory**: Never stored in localStorage (XSS protection)  
✅ **Refresh Token in HTTP-Only Cookie**: Safe from JavaScript access  
✅ **CSRF Token for Mutations**: Validates state-changing operations  
✅ **Route Guards**: Dual-layer validation (Redux + token)  
✅ **Automatic Token Refresh**: Seamless UX without security compromise  
✅ **Input Validation**: Client + server validation layers  
✅ **TypeScript Strict Mode**: Compile-time type safety  
✅ **Promise Deduplication**: Prevents race conditions in auth flow

### Security Considerations

⚠️ **Environment Variables**: Never commit `.env` with real credentials  
⚠️ **HTTPS Required**: Always use HTTPS in production  
⚠️ **Token Expiration**: Monitor and adjust based on security requirements  
⚠️ **Backend Dependency**: Frontend security complements backend validation

---

## 📦 Reusable Components

EvenTask provides **28 reusable components** in `src/components/`, designed for composition and consistency across the application.

### Form Components

| Component                | Purpose                  | Key Features                                                 |
| ------------------------ | ------------------------ | ------------------------------------------------------------ |
| **Input**                | Text input field         | Validation, error states, hint text, controlled/uncontrolled |
| **Textarea**             | Multi-line text input    | Auto-resize, character count, validation, ARIA support       |
| **InputWithSuggestions** | Autocomplete input       | Dropdown suggestions, keyboard navigation, filtering         |
| **MultiSelectInput**     | Multi-selection dropdown | Chip display, remove items, search filtering                 |
| **EventForm**            | Event creation/editing   | Date/time pickers, validation, overlap detection             |

**Usage Example:**

```typescript
<Input
  label="Task Title"
  value={title}
  onChange={handleChange}
  error={errors.title}
  touched={touched.title}
  hint="Enter a descriptive title"
/>
```

### Feedback Components

| Component          | Purpose              | Key Features                                                        |
| ------------------ | -------------------- | ------------------------------------------------------------------- |
| **Toast**          | Notification message | 4 variants (success, error, warning, info), auto-dismiss, closeable |
| **ToastContainer** | Toast queue manager  | Stacked toasts, animations, position control                        |
| **Loader**         | Loading spinner      | Centered overlay, customizable size                                 |
| **LinearProgress** | Progress bar         | Percentage display, color variants, labels                          |
| **Modal**          | Dialog overlay       | Backdrop click to close, focus trap, ARIA roles                     |
| **ConfirmModal**   | Confirmation dialog  | Confirm/cancel actions, customizable messages                       |

**Toast System:**

```typescript
// Dispatch from anywhere
dispatch(
  showToast({
    message: 'Task created successfully',
    status: 'success',
  })
)
```

### Navigation Components

| Component      | Purpose               | Key Features                                  |
| -------------- | --------------------- | --------------------------------------------- |
| **Sidebar**    | Main navigation       | Collapsible, active route highlighting, icons |
| **Breadcrumb** | Navigation path       | Dynamic route mapping, clickable segments     |
| **ButtonLink** | Link styled as button | React Router integration, button variants     |
| **FabArrow**   | Scroll-to-top FAB     | Visibility on scroll, smooth scroll behavior  |

### Display Components

| Component               | Purpose               | Key Features                                      |
| ----------------------- | --------------------- | ------------------------------------------------- |
| **UserAvatar**          | User profile picture  | Initials fallback, image loading, sizes           |
| **UsersAvatars**        | Multiple user avatars | Max 3 visible + counter, draggable mode           |
| **DraggableUserAvatar** | Draggable avatar      | DnD integration, participant assignment           |
| **Chip**                | Tag/label             | Color variants, removable, outlined/filled styles |
| **Table**               | Data table            | Sorting, pagination, custom columns, actions      |

**Avatar System:**

```typescript
// Single avatar
<UserAvatar firstName="John" lastName="Doe" imageUrl="..." />

// Multiple avatars with overflow
<UsersAvatars users={participants} />  // Shows max 3 + "+5"

// Draggable for participant assignment
<UsersAvatars users={contacts} draggable={dragData} />
```

### Interaction Components

| Component                | Purpose             | Key Features                                                   |
| ------------------------ | ------------------- | -------------------------------------------------------------- |
| **Button**               | Action button       | Variants (primary, secondary, danger), disabled state, loading |
| **ButtonTheme**          | Theme toggle        | Light/dark mode switch, icon animation                         |
| **Dropdown**             | Generic dropdown    | Click outside to close, keyboard navigation                    |
| **AvatarDropdown**       | User menu dropdown  | Profile link, logout action, user info display                 |
| **NotificationDropdown** | Notification center | Unread count badge, multiple views, actions                    |

### Layout Components

| Component               | Purpose           | Key Features                                          |
| ----------------------- | ----------------- | ----------------------------------------------------- |
| **ScrollableContainer** | Horizontal scroll | Touch support, wheel scroll, navigation arrows        |
| **SlideTransition**     | Slide animations  | Left/right/center transitions, animation end callback |

**Scroll Container:**

```typescript
<ScrollableContainer>
  <OngoingTask task={task1} />
  <OngoingTask task={task2} />
  <OngoingTask task={task3} />
</ScrollableContainer>
```

### Drag & Drop Components

| Component              | Purpose             | Key Features                            |
| ---------------------- | ------------------- | --------------------------------------- |
| **DragProviders**      | DnD context wrapper | Sensors, collision detection, modifiers |
| **DragOverlayContent** | Drag preview        | Custom overlay during drag operations   |

**DnD System:**

```typescript
<DragProviders onDragStart={handleStart} onDragEnd={handleEnd}>
  <DraggableUserAvatar user={user} data={dragData} />
  <DropZone data={dropData}>
    {/* Droppable area */}
  </DropZone>
</DragProviders>
```

### Icon System

**Icons Component** (`components/icons/Icons.tsx`):

- **50+ SVG icons** as React components
- Customizable size and color
- Semantic names (e.g., `DeleteIcon`, `EditIcon`, `CalendarIcon`)
- Consistent 24px default size
- `currentColor` for theme integration

```typescript
<DeleteIcon size={20} fill="var(--color-error)" />
```

### Component Design Principles

✅ **Composition over Configuration**: Components accept children and compose well  
✅ **Controlled & Uncontrolled**: Support both patterns where applicable  
✅ **Accessibility First**: ARIA labels, roles, keyboard navigation  
✅ **Theme Aware**: Use CSS variables for consistent theming  
✅ **TypeScript Strict**: Full type safety with interfaces  
✅ **Testable**: Co-located tests with high coverage  
✅ **Performance**: Memoization where beneficial, lazy loading

---

## 🔄 Real-Time Features

EvenTask uses **Socket.io** for real-time bidirectional communication between client and server.

### WebSocket Architecture

#### Connection Management

Located in `context/websocket/SocketProvider.tsx`:

```typescript
const socket = io(VITE_API_URL, {
  auth: cb => cb({ token: accessToken }),
  transports: ['websocket'],
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})
```

**Connection Lifecycle:**

1. User logs in → `status` changes to `authenticated`
2. `SocketProvider` detects auth change
3. Socket connects with JWT in auth payload
4. Server validates token and accepts/rejects connection
5. Client receives `connected` event → updates UI state
6. On logout → socket disconnects automatically

#### Implemented Event Handlers

Currently, only **basic connection events** are implemented in `services/websocket/SocketService.ts`:

```typescript
// Connection established
socket.on('connected', data => {
  console.log('Socket connected:', data)
})

// Connection lost
socket.on('disconnect', reason => {
  console.log('Socket disconnected:', reason)
})

// Connection error with token refresh
socket.on('connect_error', async error => {
  console.error('Connection error:', error)

  // Attempt token refresh
  const refreshResult = await attemptTokenRefresh()

  if (refreshResult.success) {
    socket.auth = { token: refreshResult.accessToken }
    socket.connect()
  }
})
```

#### Token Refresh on Connection Error

When a connection fails due to token expiration:

```
Connection attempt fails → 'connect_error' event
    ↓
attemptTokenRefresh() called
    ↓
If refresh succeeds → Update socket.auth with new token
    ↓
Reconnect with fresh token
    ↓
If refresh fails → User logged out
```

**Benefits:**

- **Automatic recovery**: Token expiration doesn't break real-time connection
- **Seamless UX**: User not aware of token refresh
- **Single refresh flow**: Reuses existing auth refresh logic

### Connection State

#### Context API

```typescript
// SocketProvider exposes connection state
export const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  socketId: null,
})

// Usage in components
const { isConnected, socketId } = useContext(SocketContext)
```

#### Reconnection Strategy

Socket.io reconnection is configured with:

- **Max Attempts**: 5 retries before giving up
- **Delay**: 1 second between attempts
- **Auto-Reconnect**: Enabled by default

**Reconnection Scenarios:**

- Network loss → auto-reconnect when network returns
- Server restart → clients reconnect automatically
- Token expiration → handled by `connect_error` handler

### Future Implementation

> **Note**: The following features are planned but not yet implemented. See [Roadmap](#-roadmap) for details.

- Domain-specific event handlers (tasks, events, notifications, invitations)
- Room-based subscriptions for targeted updates
- Real-time notification delivery
- Event throttling/debouncing
- UI connection status indicator

---

## 📝 Code Conventions

EvenTask follows strict coding standards to maintain consistency, readability, and maintainability across the codebase.

### ESLint Configuration

Located in `eslint.config.js`:

```javascript
export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
})
```

**Key Rules:**

- ❌ **No `any` type**: Enforces strict typing
- ⚠️ **Unused variables**: Warnings to clean up dead code
- ✅ **React Hooks**: Enforces Rules of Hooks
- ✅ **Dependency arrays**: Warns about missing dependencies

### TypeScript Configuration

#### Strict Mode Enabled

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Benefits:**

- Catches type errors at compile time
- Prevents `undefined` and `null` bugs
- Enforces explicit return types
- Improves IDE autocomplete

#### Type-First Development

```typescript
// ✅ Good: Explicit interfaces
interface Task {
  id: string
  title: string
  status: TaskStatus
  events: Event[]
}

// ❌ Bad: Using any
const task: any = fetchTask()

// ✅ Good: Generic types
const fetchData = <T>(url: string): Promise<T> => {}
```

### Prettier Configuration

```json
// .prettierrc (implicit)
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5",
  "arrowParens": "always"
}
```

**Auto-formatting:**

```bash
pnpm format  # Format all files
```

### Naming Conventions

#### Files & Folders

| Type              | Convention         | Example                           |
| ----------------- | ------------------ | --------------------------------- |
| **Components**    | PascalCase         | `Button.tsx`, `UserAvatar.tsx`    |
| **Hooks**         | camelCase with use | `useForm.ts`, `useAuthActions.ts` |
| **Utils/Helpers** | camelCase          | `buildImageUrl.ts`                |
| **Types**         | PascalCase with I  | `ITask.ts`, `IUser.ts`            |
| **Constants**     | UPPER_SNAKE_CASE   | `AUTH_STATUS.ts`                  |
| **Styles**        | Match component    | `Button.css` for `Button.tsx`     |
| **Tests**         | Match file + .test | `Button.test.tsx`                 |

#### Variables & Functions

```typescript
// ✅ Variables: camelCase
const userName = 'John'
const isAuthenticated = true

// ✅ Functions: camelCase, descriptive verbs
const fetchTasks = async () => {}
const handleSubmit = (e: FormEvent) => {}

// ✅ Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRIES = 3

// ✅ Components: PascalCase
const UserAvatar = ({ user }: Props) => {}

// ✅ Interfaces: PascalCase with I prefix
interface ITask {}
interface IUser {}

// ✅ Types: PascalCase
type TaskStatus = 'pending' | 'in-progress' | 'completed'
```

#### Redux Slices & Actions

```typescript
// ✅ Slice names: camelCase
const authSlice = createSlice({ name: 'auth', ... })

// ✅ Action names: descriptive with context
const { setAuthStatus, setAccessToken, logout } = authSlice.actions

// ✅ Selector names: selectX pattern
export const selectAuthStatus = (state: RootState) => state.auth.status
```

### File Organization

#### Component Structure

```typescript
// Button.tsx
import { type ButtonHTMLAttributes } from 'react'
import './Button.css'

// 1. Types/Interfaces
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
}

// 2. Component
export const Button = ({ variant = 'primary', loading, children, ...props }: ButtonProps) => {
  return (
    <button className={`button button--${variant}`} disabled={loading} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  )
}

// 3. Default export (if needed)
export default Button
```

#### Import Order

```typescript
// 1. External libraries
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. Internal absolute imports (aliases)
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectAuthStatus } from '@/store/slices/auth'

// 3. Relative imports (components, utils, types)
import { Button } from '../button/Button'
import { getErrorMessage } from '../../helpers/getErrorMessage'
import type { ITask } from '../../types/ITask'

// 4. Styles
import './Component.css'
```

### Component Patterns

#### Functional Components with TypeScript

```typescript
// ✅ Named export with explicit types
export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  return <div>{task.title}</div>
}

// ❌ Default export without types
export default function TaskCard(props) {
  return <div>{props.task.title}</div>
}
```

#### Props Destructuring

```typescript
// ✅ Destructure props with defaults
export const Input = ({
  label,
  error,
  touched = false,
  hint,
  ...rest
}: InputProps) => { }

// ❌ Accessing props object
export const Input = (props: InputProps) => {
  return <input value={props.value} />
}
```

#### Conditional Rendering

```typescript
// ✅ Short circuit for simple conditions
{isLoading && <Loader />}

// ✅ Ternary for binary conditions
{isAuthenticated ? <Dashboard /> : <Login />}

// ✅ Early return for complex conditions
if (!user) return <NotFound />
return <UserProfile user={user} />
```

### State Management Patterns

#### Redux Slice Structure

```typescript
// store/slices/task/taskSlice.ts
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

// 1. Entity Adapter (for normalized state)
const taskAdapter = createEntityAdapter<ITask>()

// 2. Initial State
const initialState = taskAdapter.getInitialState({
  status: 'idle',
  error: null,
})

// 3. Slice
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // Sync actions
    setTaskStatus: (state, action) => {
      state.status = action.payload
    },
  },
  extraReducers: builder => {
    // Async actions from RTK Query
    builder.addMatcher(taskApi.endpoints.getTasks.matchFulfilled, (state, action) => {
      taskAdapter.setAll(state, action.payload)
    })
  },
})

// 4. Exports
export const { setTaskStatus } = taskSlice.actions
export const taskSelectors = taskAdapter.getSelectors((state: RootState) => state.task)
export default taskSlice.reducer
```

#### Custom Hooks Pattern

```typescript
// store/hooks/useTaskActions.ts
export const useTaskActions = () => {
  const dispatch = useAppDispatch()

  return {
    createTask: (task: CreateTaskDto) => dispatch(taskApi.endpoints.createTask.initiate(task)),
    updateTask: (id: string, task: UpdateTaskDto) =>
      dispatch(taskApi.endpoints.updateTask.initiate({ id, ...task })),
    deleteTask: (id: string) => dispatch(taskApi.endpoints.deleteTask.initiate(id)),
  }
}
```

### Error Handling

#### API Error Handling

```typescript
// helpers/getErrorMessage.ts
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return 'An unexpected error occurred'
}

// Usage in components
try {
  await createTask(data)
} catch (error) {
  const message = getErrorMessage(error)
  dispatch(showToast({ message, status: 'error' }))
}
```

### Performance Best Practices

#### Memoization

```typescript
// ✅ useMemo for expensive calculations
const sortedTasks = useMemo(() => {
  return tasks.sort((a, b) => a.createdAt - b.createdAt)
}, [tasks])

// ✅ useCallback for event handlers passed as props
const handleDelete = useCallback(
  (id: string) => {
    deleteTask(id)
  },
  [deleteTask]
)

// ❌ Don't over-optimize
// Bad: Memoizing trivial operations
const isActive = useMemo(() => status === 'active', [status])
```

#### Lazy Loading

```typescript
// router/lazyPages.ts
import { lazy } from 'react'

export const HomePage = lazy(() => import('../task/pages/HomePage'))
export const CalendarPage = lazy(() => import('../calendar/pages/CalendarPage'))
```

### Comments & Documentation

#### JSDoc for Helpers/Utils

```typescript
/**
 * Builds a full image URL from a relative path
 * @param imagePath - Relative path to the image (e.g., 'auth/login-blob.svg')
 * @returns Full URL with base path from environment variables
 * @example
 * buildImageUrl('auth/login-blob.svg')
 * // Returns: 'http://localhost:5173/images/auth/login-blob.svg'
 */
export const buildImageUrl = (imagePath: string): string => {
  return `${import.meta.env.BASE_URL}images/${imagePath}`
}
```

#### Inline Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Prevent refresh token race condition with promise deduplication
if (refreshPromise) return refreshPromise

// ❌ Bad: Obvious comments
// Set isLoading to true
setIsLoading(true)
```

### Testing Conventions

#### Test File Structure

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  describe('Rendering', () => {
    it('should render button with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()

      render(<Button onClick={onClick}>Click me</Button>)
      await user.click(screen.getByRole('button'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
```

#### Test Naming

```typescript
// ✅ Descriptive test names
it('should display error message when email is invalid', () => {})
it('should disable submit button when form is loading', () => {})

// ❌ Vague test names
it('works', () => {})
it('test email', () => {})
```

### Git Commit Conventions

While not enforced, recommended commit message format:

```
<type>(<scope>): <subject>

[optional body]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

**Examples:**

```
feat(auth): add Google OAuth login
fix(task): prevent duplicate task creation
docs(readme): update installation instructions
refactor(api): simplify error handling logic
test(input): add validation tests
```

---

## 🗺️ Roadmap

> **Note for future implementation**: This roadmap was created on November 21, 2025. File paths and implementations may need adjustment if project structure changes significantly. All code examples are based on the current codebase structure as of this date.

### Planned Features

#### 🎨 UI/UX Enhancements

- [ ] **Motion Preferences Support**: Respect `prefers-reduced-motion` for users with vestibular disorders

  - **Current state**: Animations/transitions always active (e.g., `SlideTransition.css`, shimmer effects in `OngoingTask.css`)
  - **Implementation**:
    ```css
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
    ```
  - **Files to update**: `src/styles/base.css`, all component CSS files with animations
  - **Testing**: Manual testing with browser DevTools > Rendering > Emulate CSS media feature
  - **Reference**: [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

- [ ] **Connection Status Indicator**: Visual feedback for WebSocket connection state
  - **Current state**: `SocketContext` exposes `isConnected` and `socketId` but no UI component displays it
  - **Location**: Create `src/components/connection-status/ConnectionStatus.tsx`
  - **Integration**: Add to `RootLayout.tsx` header alongside `ButtonTheme` and `AvatarDropdown`
  - **Design**:
    ```tsx
    const ConnectionStatus = () => {
      const { isConnected } = useContext(SocketContext)
      return (
        <div className="connection-status">
          <div className={`status-dot ${isConnected ? 'online' : 'offline'}`} />
          <span>{isConnected ? 'Online' : 'Offline'}</span>
        </div>
      )
    }
    ```
  - **Toast integration**: Use `useToastActions().showToast()` on connect/disconnect events in `SocketProvider.tsx`

#### 📊 Testing & Quality

- [ ] **Coverage Report LCOV Format**: Enable LCOV output for CI/CD integration
  - **Current state**: `vite.config.ts` has basic test config, no coverage reporters defined
  - **File to update**: `vite.config.ts`
  - **Implementation**:
    ```typescript
    test: {
      environment: 'happy-dom',
      globals: true,
      setupFiles: './src/tests/setup.ts',
      include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'clover', 'json', 'lcov'],
        reportsDirectory: './coverage',
        exclude: [
          'node_modules/',
          'src/tests/',
          '**/*.d.ts',
          '**/*.config.*',
          '**/mockData',
        ],
      },
    }
    ```
  - **Output**: Will generate `coverage/lcov.info` for CI tools
  - **CI Integration**: Add to GitHub Actions workflow with `codecov/codecov-action@v3`

#### 🔄 Real-Time Features (WebSocket)

- [ ] **Task Event Handlers**: Real-time task synchronization

  - **Current state**: Only basic events (`connected`, `disconnect`, `connect_error`) in `SocketService.ts`
  - **Location**: `src/services/websocket/handlers/` (create new folder)
  - **Files to create**:
    - `taskHandlers.ts` - Task CRUD event handlers
    - `eventHandlers.ts` - Event CRUD event handlers
    - `notificationHandlers.ts` - Notification handlers
    - `invitationHandlers.ts` - Invitation handlers
  - **Implementation pattern**:

    ```typescript
    // src/services/websocket/handlers/taskHandlers.ts
    import { socket } from '../../../context/websocket/socket'
    import { store } from '../../../store/store'
    import { baseApi } from '../../baseApi'
    import { showToast } from '../../../store/slices/ui/toastSlice'

    export const registerTaskHandlers = () => {
      socket.on('task:created', (task: ITask) => {
        // Invalidate cache to trigger refetch
        store.dispatch(baseApi.util.invalidateTags([{ type: 'Task', id: 'LIST' }]))
        store.dispatch(
          showToast({
            message: `New task: ${task.title}`,
            status: 'info',
          })
        )
      })

      socket.on('task:updated', (task: ITask) => {
        store.dispatch(baseApi.util.invalidateTags([{ type: 'Task', id: task.id }]))
      })

      socket.on('task:deleted', (taskId: string) => {
        store.dispatch(baseApi.util.invalidateTags([{ type: 'Task', id: taskId }]))
      })
    }
    ```

  - **Registration**: Call `registerTaskHandlers()` in `SocketProvider.tsx` after `socket.connect()`
  - **Backend coordination**: Ensure backend emits these events after DB operations

- [ ] **Room-Based Subscriptions**: Optimize event delivery

  - **Current state**: All events broadcast to all connected clients (inefficient)
  - **Pattern**: Subscribe to specific rooms when viewing task/event
  - **Client-side implementation**:
    ```typescript
    // When entering TaskDetailPage
    useEffect(() => {
      if (taskId && isConnected) {
        socket.emit('room:join', { type: 'task', id: taskId })
        return () => socket.emit('room:leave', { type: 'task', id: taskId })
      }
    }, [taskId, isConnected])
    ```
  - **Backend rooms**:
    - `user:${userId}` - Personal notifications/invitations
    - `task:${taskId}` - Task-specific updates
    - `event:${eventId}` - Event-specific updates
  - **Benefit**: User only receives events for tasks/events they're viewing or participating in

- [ ] **Event Throttling/Debouncing**: Performance optimization
  - **Use case**: Prevent server overload from high-frequency events
  - **Example - Typing indicators**:

    ```typescript
    // src/hooks/useTypingIndicator.ts
    import { debounce } from 'lodash-es' // Add to dependencies

    const emitTyping = useCallback(
      debounce((taskId: string) => {
        socket.emit('user:typing', { taskId, userId })
      }, 300),
      []
    )
    ```

  - **Example - Task update throttle**:

    ```typescript
    import { throttle } from 'lodash-es'

    const emitTaskUpdate = throttle((task: ITask) => {
      socket.emit('task:update', task)
    }, 1000)
    ```

  - **Dependencies to add**: `pnpm add lodash-es && pnpm add -D @types/lodash-es`

#### 🗂️ Task Management

- [ ] **Category Filtering/Organization**: Enhanced task categorization
  - **Current state**: Categories exist but no filtering UI in HomePage
  - **Current files**:
    - `src/task/components/categories/Categories.tsx` - Category list display
    - `src/services/categoryApi.ts` - Category CRUD operations
    - Category data available in Redux via `taskApi.endpoints.fetchTasks`
  - **Implementation**:
    1. Add filter state to `HomePage.tsx`:
       ```typescript
       const [selectedCategories, setSelectedCategories] = useState<string[]>([])
       ```
    2. Add `MultiSelectInput` component for category selection above task list
    3. Filter tasks client-side:
       ```typescript
       const filteredTasks = useMemo(() => {
         if (selectedCategories.length === 0) return tasks
         return tasks.filter(task =>
           task.categories?.some(cat => selectedCategories.includes(cat.id))
         )
       }, [tasks, selectedCategories])
       ```
  - **UI Location**: Add filter dropdown in `src/task/components/header/Header.tsx`
  - **Persistence**: Save selected filters to `localStorage` or URL query params

#### 🔔 Notifications

- [ ] **Smart Notification Grouping**: Improve notification UX
  - **Current state**: Notifications displayed as flat list in `NotificationList.tsx`
  - **Current location**: `src/components/notification-dropdown/`
  - **Implementation approach**:

    ```typescript
    // src/components/notification-dropdown/utils/groupNotifications.ts
    interface NotificationGroup {
      type: string
      count: number
      notifications: INotification[]
      latestDate: string
    }

    export const groupNotifications = (notifications: INotification[]): NotificationGroup[] => {
      const groups = notifications.reduce(
        (acc, notif) => {
          const key = `${notif.type}_${notif.relatedEntityId}`
          if (!acc[key]) {
            acc[key] = { type: notif.type, count: 0, notifications: [], latestDate: '' }
          }
          acc[key].notifications.push(notif)
          acc[key].count++
          acc[key].latestDate = notif.createdAt
          return acc
        },
        {} as Record<string, NotificationGroup>
      )

      return Object.values(groups).sort(
        (a, b) => new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime()
      )
    }
    ```

  - **UI component**: Create `NotificationGroup.tsx` with expand/collapse functionality
  - **Example grouping**: "5 tasks assigned to you" instead of 5 separate notifications

#### 🚀 Performance

- [ ] **Code Splitting**: Reduce initial bundle size

  - **Current state**: Routes are lazy-loaded in `router/lazyPages.ts` ✅
  - **Additional opportunities**:
    1. **Heavy components** - Lazy load `EventForm` (calendar/time pickers):
       ```typescript
       // src/components/event-form/index.ts
       import { lazy } from 'react'
       export const EventForm = lazy(() => import('./EventForm'))
       ```
    2. **Modals** - Dynamic import for `ConfirmModal`:
       ```typescript
       const ConfirmModal = lazy(() => import('../components/confirm-modal/ConfirmModal'))
       ```
    3. **Icons** - Consider icon tree-shaking if bundle size becomes issue
  - **Measurement**: Use `pnpm build` and check `dist/assets/` sizes
  - **Target**: Keep main bundle < 200KB gzipped

- [ ] **Image Optimization**: Improve load times
  - **Current state**: PNG/SVG images in `public/images/` (unoptimized)
  - **Current sizes**: Check with `ls -lh public/images/**/*`
  - **Tools**:
    - Install: `pnpm add -D vite-plugin-imagemin`
    - Configure in `vite.config.ts`:

      ```typescript
      import viteImagemin from 'vite-plugin-imagemin'

      export default defineConfig({
        plugins: [
          react(),
          viteImagemin({
            gifsicle: { optimizationLevel: 7 },
            optipng: { optimizationLevel: 7 },
            svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
          }),
        ],
      })
      ```
  - **WebP conversion**: Use `sharp` or online tools for auth/landing images
  - **Lazy loading**: Add `loading="lazy"` to `<img>` tags below fold

#### 🔐 Security Enhancements

- [ ] **Two-Factor Authentication (2FA)**: Optional enhanced security

  - **Current auth**: JWT only in `authSlice` + `authApi`
  - **Library**: `pnpm add otpauth qrcode`
  - **Backend flow**:
    1. User enables 2FA → backend generates secret
    2. Display QR code with `qrcode.toDataURL(secret)`
    3. User scans with authenticator app
    4. Verify initial code before enabling
  - **Frontend changes**:
    - Add `twoFactorEnabled` to `IUser` interface
    - New component: `src/user/components/TwoFactorSetup.tsx`
    - Add 2FA input field to `LoginPage.tsx` when `requires2FA: true` in login response
  - **Login flow**:

    ```typescript
    // 1. POST /auth/login with email + password
    // Response: { requires2FA: true, tempToken: 'xxx' }

    // 2. POST /auth/verify-2fa with { tempToken, code }
    // Response: { accessToken, refreshToken } (normal auth)
    ```

  - **Backup codes**: Generate 10 codes, store hashed in backend, display once

- [ ] **Session Management**: Better control over active sessions
  - **Current state**: Only current session visible (no session list)
  - **Backend additions**:
    - Store sessions in database/Redis with metadata (device, IP, location, lastActive)
    - New endpoints: `GET /auth/sessions`, `DELETE /auth/sessions/:id`
  - **Frontend implementation**:
    - New page: `src/user/pages/SessionsPage.tsx`
    - Display table with columns: Device, Location, IP, Last Active, Actions
    - Component: `src/user/components/SessionList.tsx`
  - **UI mockup**:
    ```tsx
    <Table
      columns={['Device', 'Location', 'Last Active', 'Actions']}
      data={sessions}
      actions={session => <Button onClick={() => revokeSession(session.id)}>Revoke</Button>}
    />
    ```
  - **Current session indicator**: Mark with badge "Current Session" (match by `sessionId` from auth response)

#### 📱 Mobile Experience

- [ ] **Progressive Web App (PWA)**: Installable web app

  - **Plugin**: `pnpm add -D vite-plugin-pwa`
  - **Configuration** in `vite.config.ts`:

    ```typescript
    import { VitePWA } from 'vite-plugin-pwa'

    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'EvenTask',
          short_name: 'EvenTask',
          description: 'Collaborative task manager',
          theme_color: '#6366F1',
          icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\./,
              handler: 'NetworkFirst',
              options: { cacheName: 'api-cache' },
            },
          ],
        },
      }),
    ]
    ```

  - **Files to create**: `public/icon-192.png`, `public/icon-512.png`
  - **Testing**: Chrome DevTools > Application > Service Workers

- [ ] **Touch Gestures**: Mobile-friendly interactions
  - **Library**: `pnpm add react-swipeable`
  - **Swipe to delete example**:

    ```tsx
    import { useSwipeable } from 'react-swipeable'

    const TaskCard = ({ task, onDelete }) => {
      const handlers = useSwipeable({
        onSwipedLeft: () => onDelete(task.id),
        trackMouse: true,
      })
      return <div {...handlers}>{task.title}</div>
    }
    ```

  - **Pull to refresh**: Use `react-pull-to-refresh` library for HomePage
  - **Files to update**:
    - `src/task/components/ongoing-tasks/OngoingTask.tsx` - Add swipe
    - `src/task/pages/HomePage.tsx` - Add pull to refresh

#### 🌐 Internationalization

- [ ] **i18n Support**: Multi-language support
  - **Library**: `pnpm add react-i18next i18next i18next-browser-languagedetector`
  - **Folder structure**:
    ```
    src/i18n/
    ├── index.ts              # i18next config
    ├── locales/
    │   ├── en/
    │   │   ├── common.json
    │   │   ├── auth.json
    │   │   ├── tasks.json
    │   │   └── calendar.json
    │   └── es/
    │       ├── common.json
    │       ├── auth.json
    │       ├── tasks.json
    │       └── calendar.json
    ```
  - **Configuration**:

    ```typescript
    // src/i18n/index.ts
    import i18n from 'i18next'
    import { initReactI18next } from 'react-i18next'
    import LanguageDetector from 'i18next-browser-languagedetector'

    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        resources: {
          en: { common: require('./locales/en/common.json') },
          es: { common: require('./locales/es/common.json') },
        },
      })
    ```

  - **Usage example**:

    ```tsx
    import { useTranslation } from 'react-i18next'

    const LoginPage = () => {
      const { t } = useTranslation('auth')
      return <h1>{t('login.title')}</h1> // "Sign In" or "Iniciar Sesión"
    }
    ```

  - **Language switcher**: Add to `AvatarDropdown` menu
  - **Date localization**: Already using `dayjs`, add locale import:
    ```typescript
    import 'dayjs/locale/es'
    dayjs.locale(i18n.language)
    ```

### Future Considerations

**Lower priority features for future iterations:**

- **Analytics Integration**: Track user behavior, feature usage

  - Libraries: Google Analytics 4, Mixpanel, or PostHog
  - Track: Task creation rate, completion rate, feature adoption
  - Privacy: GDPR-compliant with user consent

- **Export/Import**: Backup tasks, export to CSV/JSON

  - Endpoint: `GET /api/tasks/export?format=json|csv`
  - Client-side: Use `file-saver` library to download
  - Import: File upload with validation

- **Task Templates**: Reusable task structures

  - New entity: `ITaskTemplate` with predefined events
  - UI: "Save as template" button in TaskFormPage
  - Usage: "Create from template" dropdown in HomePage

- **Recurring Events**: Repeat tasks daily/weekly/monthly

  - Add `recurrence` field to `IEvent` (rrule format)
  - Library: `rrule` for recurrence calculation
  - UI: Recurrence picker in EventForm

- **File Attachments**: Attach files to tasks/events

  - Backend: File upload to S3/Cloudinary
  - Frontend: Drag & drop file upload component
  - Max size: 10MB per file, 50MB per task

- **Comments System**: Thread discussions on tasks

  - New entity: `IComment` with replies support
  - Real-time: WebSocket event `comment:new`
  - UI: Comment section in TaskDetailPage

- **Activity Log**: Audit trail for task changes

  - Backend: Store all mutations (created, updated, deleted)
  - UI: Timeline component showing history
  - Filters: By user, by action type, by date range

- **Dark Mode Scheduling**: Auto-switch based on time

  - Detect user's timezone
  - Settings: "Auto (sunset to sunrise)", "Custom hours"
  - Use `theme` state in localStorage with schedule metadata

- **Keyboard Shortcuts**: Power user navigation
  - Library: `react-hotkeys-hook`
  - Shortcuts: `Ctrl+K` (command palette), `N` (new task), `Esc` (close modal)
  - UI: Shortcut hints in tooltips

---

## 🤝 Contributing & Development Workflow

This project enforces strict code quality standards using **Husky** and **Commitlint**.

### Commit Convention
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Your commit messages must follow this format:

```bash
<type>(<scope>): <description>

Allowed Types:

feat: New feature
fix: Bug fix
docs: Documentation only
style: Formatting, missing semi colons, etc; no code change
refactor: Refactoring production code
test: Adding tests, refactoring test; no production code change
chore: Updating build tasks, package manager configs, etc

# Examples:
feat(auth): add google oauth integration
fix(calendar): resolve event overlap issue
chore(deps): update react to v18.3
docs(readme): update installation guide
```
> **Note:** Husky will automatically block any commit that doesn't strictly follow this pattern.

---

## 📄 License

**Copyright © 2024-2025 Agustin Moya. All Rights Reserved.**

This code is made publicly available for **portfolio and demonstration purposes only**.

### ❌ Prohibited Uses

You are **NOT** permitted to:

- ✗ Use this code in commercial projects or products
- ✗ Distribute, sell, or sublicense this code
- ✗ Create derivative works based on this code
- ✗ Deploy this code in production environments
- ✗ Copy or replicate the business logic for commercial purposes

### ✅ Permitted Uses

You **MAY**:

- ✓ View and review the code for educational purposes
- ✓ Reference this project in technical discussions or interviews
- ✓ Analyze the code as part of hiring evaluation processes
- ✓ Study the implementation patterns and architecture

### 📧 Contact for Licensing

For any commercial use, licensing inquiries, or permissions beyond the scope above, please contact:

**Agustin Moya**  
📧 Email: [agustin.moya.dev@gmail.com]  
💼 LinkedIn: [www.linkedin.com/in/agustin-moya-dev]  
🐙 GitHub: [@agusmoya](https://github.com/agusmoya)

> **Note**: This project is part of my professional portfolio. The source code is available for review by potential employers and collaborators. Unauthorized commercial use will be pursued to the full extent of applicable law.

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Redux Toolkit**

[⬆ Back to Top](#-eventask)

</div>
