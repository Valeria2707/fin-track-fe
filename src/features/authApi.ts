import { Login, NewPassword, SignUp } from '@/types/auth';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    signUp: builder.mutation<string, SignUp>({
      query: body => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),

    signIn: builder.mutation<string, Login>({
      query: body => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<string, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    refreshTokens: builder.mutation<string, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),

    resetPassword: builder.mutation<string, { email: string }>({
      query: body => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),

    updatePassword: builder.mutation<string, NewPassword>({
      query: body => ({
        url: '/auth/update-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation, useRefreshTokensMutation, useResetPasswordMutation, useUpdatePasswordMutation } =
  authApi;
