import { baseApi } from './baseApi'

import { ILoginDto } from '../types/dtos/auth'
import { IAuthResponseDto, IRegisterDto } from '../types/dtos/auth'
import { IResetPasswordDto } from '../types/dtos/token'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<IAuthResponseDto, ILoginDto>({
      query: creds => ({
        url: '/auth/login',
        method: 'POST',
        body: creds,
      }),
    }),
    loginWithGoogle: builder.mutation<IAuthResponseDto, { idToken: string }>({
      query: ({ idToken }) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: { idToken },
      }),
    }),
    register: builder.mutation<IAuthResponseDto, IRegisterDto>({
      query: form => ({
        url: '/auth/register',
        method: 'POST',
        body: form,
      }),
    }),
    refresh: builder.mutation<IAuthResponseDto, void>({
      query: () => ({ url: '/auth/refresh', method: 'POST' }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: '/auth/request-password-reset',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<void, IResetPasswordDto>({
      query: ({ token, newPassword, type }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, newPassword, type },
      }),
    }),
    setPassword: builder.mutation<void, { newPassword: string }>({
      query: ({ newPassword }) => ({
        url: '/auth/set-password',
        method: 'POST',
        body: { newPassword },
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['User']),
    }),
    changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
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
