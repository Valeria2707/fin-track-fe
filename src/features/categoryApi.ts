import { Category } from '@/types/category';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: builder => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: '/category',
      }),
    }),
    getCategoryById: builder.query<Category, number>({
      query: id => `/category/${id}`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
