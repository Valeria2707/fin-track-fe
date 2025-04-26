import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { Queries, SendQuery, SendQueryDto } from '@/types/ai';

export const aiApi = createApi({
  reducerPath: 'aiApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AI'],
  endpoints: builder => ({
    sendQuery: builder.mutation<SendQuery, SendQueryDto>({
      query: body => ({
        url: '/ai-queries',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AI'],
    }),
    getAllQueries: builder.query<Queries[], void>({
      query: () => ({
        url: '/ai-queries',
        method: 'GET',
      }),
      providesTags: ['AI'],
    }),
  }),
});

export const { useSendQueryMutation, useGetAllQueriesQuery } = aiApi;
