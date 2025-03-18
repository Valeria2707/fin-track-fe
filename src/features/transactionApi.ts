import { Transaction, TransactionData } from '@/types/transaction';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
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
        body: { user_id: 1, ...body },
      }),
      invalidatesTags: ['Transactions'],
    }),
    updateTransaction: builder.mutation<Transaction, { id: number; data: TransactionData }>({
      query: ({ id, data }) => ({
        url: `/transaction/${id}`,
        method: 'PUT',
        body: { user_id: 1, ...data },
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
