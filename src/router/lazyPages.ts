import React from 'react'

export const LoginPage = React.lazy(() => import('@/features/auth/pages/login/LoginPage'))
export const RegisterPage = React.lazy(() => import('@/features/auth/pages/register/RegisterPage'))
export const ForgotPasswordPage = React.lazy(
  () => import('@/features/auth/pages/forgot-password/ForgotPasswordPage')
)
export const ResetPasswordPage = React.lazy(
  () => import('@/features/auth/pages/reset-password/ResetPasswordPage')
)
export const UserProfilePage = React.lazy(() => import('@/features/user/pages/UserProfilePage'))
export const HomePage = React.lazy(() => import('@/pages/home-page/HomePage'))
export const TaskDetailPage = React.lazy(
  () => import('@/features/task/pages/task-detail-page/TaskDetailPage')
)
export const TaskCreatePage = React.lazy(
  () => import('@/features/task/pages/task-create-page/TaskCreatePage')
)
export const TaskEditPage = React.lazy(
  () => import('@/features/task/pages/task-edit-page/TaskEditPage')
)
export const CalendarPage = React.lazy(
  () => import('@/features/calendar/pages/calendar-page/CalendarPage')
)
export const SeeAllPage = React.lazy(() => import('@/features/dashboard/see-all-page/SeeAllPage'))
