import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { CountOfTransactions, DailyTransactions, DateRangeParams, ExpensesByCategory, IncomeVsExpenses } from '@/types/analytic';

export const analyticApi = createApi({
  reducerPath: 'analyticApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Analytics'],
  endpoints: builder => ({
    getExpensesByCategory: builder.query<ExpensesByCategory[], DateRangeParams>({
      query: params => ({
        url: '/analytics/expenses-by-category',
        params,
      }),
      providesTags: ['Analytics'],
    }),

    getIncomeVsExpenses: builder.query<IncomeVsExpenses, DateRangeParams>({
      query: params => ({
        url: '/analytics/income-vs-expenses',
        params,
      }),
      providesTags: ['Analytics'],
    }),

    getCountOfTransactions: builder.query<CountOfTransactions, DateRangeParams>({
      query: params => ({
        url: '/analytics/count-of-transactions',
        params,
      }),
      providesTags: ['Analytics'],
    }),

    getDailyTrend: builder.query<DailyTransactions[], DateRangeParams>({
      query: params => ({
        url: '/analytics/daily-trend',
        params,
      }),
      providesTags: ['Analytics'],
    }),
  }),
});

export const { useGetExpensesByCategoryQuery, useGetIncomeVsExpensesQuery, useGetCountOfTransactionsQuery, useGetDailyTrendQuery } = analyticApi;
