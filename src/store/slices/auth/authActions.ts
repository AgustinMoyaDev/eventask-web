import { createAction } from '@reduxjs/toolkit'

import { IAuthResponseDto } from '@/types/dtos/auth'

/**
 * Standalone action for updating auth credentials.
 *
 * Extracted to a separate file to avoid circular dependency:
 * baseApi.ts → authSlice.ts → authApi.ts → baseApi.ts
 *
 * This action can be:
 * - Dispatched by baseApi.ts (in refresh logic)
 * - Listened by authSlice.ts (via extraReducers)
 */
export const setCredentials = createAction<IAuthResponseDto>('auth/setCredentials')
