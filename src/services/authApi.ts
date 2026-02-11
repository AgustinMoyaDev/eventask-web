import { baseApi } from './baseApi'

import {
  AuthResponseDto,
  ResetPasswordDto,
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
  SetPasswordDto,
} from '@/types/dtos/auth.dto'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponseDto, LoginDto>({
      query: creds => ({
        url: '/auth/login',
        method: 'POST',
        body: creds,
      }),
    }),
    loginWithGoogle: builder.mutation<AuthResponseDto, { idToken: string }>({
      query: ({ idToken }) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: { idToken },
      }),
    }),
    register: builder.mutation<AuthResponseDto, RegisterDto>({
      query: form => ({
        url: '/auth/register',
        method: 'POST',
        body: form,
      }),
    }),
    refresh: builder.mutation<AuthResponseDto, void>({
      query: () => ({ url: '/auth/refresh', method: 'POST' }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordDto>({
      query: ({ token, newPassword, type }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, newPassword, type },
      }),
    }),
    setPassword: builder.mutation<void, SetPasswordDto>({
      query: ({ newPassword }) => ({
        url: '/auth/set-password',
        method: 'POST',
        body: { newPassword },
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['User']),
    }),
    changePassword: builder.mutation<void, ChangePasswordDto>({
      query: ({ currentPassword, newPassword }) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: { currentPassword, newPassword },
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['User']),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation,
  useLoginWithGoogleMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
  useChangePasswordMutation,
} = authApi
