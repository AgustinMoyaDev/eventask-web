import React from 'react'

// AUTH
export const LoginPage = React.lazy(() => import('../auth/pages/login/LoginPage'))
export const RegisterPage = React.lazy(() => import('../auth/pages/register/RegisterPage'))
export const ForgotPasswordPage = React.lazy(
  () => import('../auth/pages/forgot-password/ForgotPasswordPage')
)
export const ResetPasswordPage = React.lazy(
  () => import('../auth/pages/reset-password/ResetPasswordPage')
)
// USER
export const UserProfilePage = React.lazy(() => import('../user/pages/UserProfilePage'))
// TASKS
export const HomePage = React.lazy(() => import('../task/pages/home-page/HomePage'))
export const TaskDetailPage = React.lazy(() => import('../task/pages/task-page/TaskDetailPage'))
export const TaskFormPage = React.lazy(() => import('../task/pages/task-form-page/TaskFormPage'))
// CALENDAR
export const CalendarPage = React.lazy(() => import('../calendar/pages/calendar-page/CalendarPage'))
// SEE ALL
export const SeeAllPage = React.lazy(() => import('../pages/see-all-page/SeeAllPage'))
