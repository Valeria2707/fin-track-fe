import { Category } from './category';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export type Transaction = {
  id: number;
  userId: string;
  type: TransactionType;
  category: Category;
  amount: string;
  date: Date;
  description?: string;
};

export type TransactionData = {
  type: TransactionType;
  category_id: number;
  amount: number;
  date: Date;
  description: string;
};
