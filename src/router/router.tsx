import { createBrowserRouter, Navigate } from 'react-router-dom'

import { MainLayout } from '@/layouts/MainLayout'
import { AuthLayout } from '@/features/auth/layout/AuthLayout'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

import {
  HomePage,
  TaskDetailPage,
  TaskCreatePage,
  TaskEditPage,
  UserProfilePage,
  SeeAllPage,
  CalendarPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from './lazyPages'
import { NotFoundPage } from '@/pages/404-page/NotFoundPage'

import { GlobalError } from '@/components/errors/GlobalError'
import { RootIndex } from './RouterIndex'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootIndex />,
    errorElement: <GlobalError />,
  },
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    errorElement: <GlobalError />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: '*', element: <Navigate to="/auth/login" replace /> },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    errorElement: <GlobalError />,
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/task/new', element: <TaskCreatePage /> },
      { path: '/task/:id/edit', element: <TaskEditPage /> },
      { path: '/task/:id', element: <TaskDetailPage /> },
      { path: '/profile', element: <UserProfilePage /> },
      { path: '/see-all', element: <SeeAllPage /> },
      { path: '/calendar', element: <CalendarPage /> },
    ],
  },
  {
    path: '/not-found',
    element: <NotFoundPage />,
    errorElement: <GlobalError />,
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
])
