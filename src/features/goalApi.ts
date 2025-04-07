import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { Goal, GoalData, RecommendedOrderGoal } from '@/types/goal';

export const goalApi = createApi({
  reducerPath: 'goalApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Goal'],
  endpoints: builder => ({
    getGoals: builder.query<Goal[], void>({
      query: () => ({
        url: '/goals',
      }),
      providesTags: ['Goal'],
    }),
    getGoalById: builder.query<Goal, number>({
      query: id => `/goals/${id}`,
      providesTags: (result, error, id) => [{ type: 'Goal', id }],
    }),
    getOrderGoals: builder.query<RecommendedOrderGoal[], void>({
      query: () => ({
        url: '/goals/order-by-weight',
      }),
      providesTags: ['Goal'],
    }),
    createGoal: builder.mutation<Goal, GoalData>({
      query: body => ({
        url: '/goals',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Goal'],
    }),
    updateGoal: builder.mutation<Goal, { id: number; data: GoalData }>({
      query: ({ id, data }) => ({
        url: `/goals/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Goal'],
    }),
    removeGoal: builder.mutation<Goal, number>({
      query: id => ({
        url: `/goals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Goal'],
    }),
  }),
});

export const { useGetGoalsQuery, useGetGoalByIdQuery, useGetOrderGoalsQuery, useCreateGoalMutation, useUpdateGoalMutation, useRemoveGoalMutation } = goalApi;
