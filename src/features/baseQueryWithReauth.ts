import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { deleteCookie } from 'cookies-next';
import { ROUTES } from '@/constants/routes';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions);

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      window.location.href = ROUTES.login;
    }
  }

  return result;
};
