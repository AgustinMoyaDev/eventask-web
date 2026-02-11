import React from 'react'

export const LoginPage = React.lazy(() => import('../auth/pages/login/LoginPage'))
export const RegisterPage = React.lazy(() => import('../auth/pages/register/RegisterPage'))
export const ForgotPasswordPage = React.lazy(
  () => import('../auth/pages/forgot-password/ForgotPasswordPage')
)
export const ResetPasswordPage = React.lazy(
  () => import('../auth/pages/reset-password/ResetPasswordPage')
)
export const UserProfilePage = React.lazy(() => import('../user/pages/UserProfilePage'))
export const HomePage = React.lazy(() => import('../task/pages/home-page/HomePage'))
export const TaskDetailPage = React.lazy(
  () => import('../task/pages/task-detail-page/TaskDetailPage')
)
export const TaskCreatePage = React.lazy(
  () => import('../task/pages/task-create-page/TaskCreatePage')
)
export const TaskEditPage = React.lazy(() => import('../task/pages/task-edit-page/TaskEditPage'))
export const CalendarPage = React.lazy(() => import('../calendar/pages/calendar-page/CalendarPage'))
export const SeeAllPage = React.lazy(() => import('../dashboard/see-all-page/SeeAllPage'))
