import { Category } from '@/types/category';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
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
