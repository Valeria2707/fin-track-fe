import { analyticApi } from '@/features/analyticApi';
import { authApi } from '@/features/authApi';
import { categoryApi } from '@/features/categoryApi';
import { goalApi } from '@/features/goalApi';
import { transactionApi } from '@/features/transactionApi';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [transactionApi.reducerPath]: transactionApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [goalApi.reducerPath]: goalApi.reducer,
    [analyticApi.reducerPath]: analyticApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(transactionApi.middleware, categoryApi.middleware, authApi.middleware, goalApi.middleware, analyticApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
