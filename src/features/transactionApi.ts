import { Transaction, TransactionData } from '@/types/transaction';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Transactions'],
  endpoints: builder => ({
    getTransactions: builder.query<{ data: Transaction[]; limit: number; page: number; total: number }, Record<string, string>>({
      query: params => ({
        url: '/transaction',
        params,
      }),
      providesTags: ['Transactions'],
    }),
    getTransactionById: builder.query<Transaction, number>({
      query: id => `/transaction/${id}`,
      providesTags: (result, error, id) => [{ type: 'Transactions', id }],
    }),
    createTransaction: builder.mutation<Transaction, TransactionData>({
      query: body => ({
        url: '/transaction',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transactions'],
    }),

    updateTransaction: builder.mutation<Transaction, { id: number; data: TransactionData }>({
      query: ({ id, data }) => ({
        url: `/transaction/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Transactions'],
    }),
    removeTransaction: builder.mutation<Transaction, number>({
      query: id => ({
        url: `/transaction/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transactions'],
    }),
  }),
});

export const { useGetTransactionsQuery, useGetTransactionByIdQuery, useCreateTransactionMutation, useUpdateTransactionMutation, useRemoveTransactionMutation } =
  transactionApi;
