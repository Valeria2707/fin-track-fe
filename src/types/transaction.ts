import { Category } from './category';

export type Transaction = {
  id: number;
  user_id: number;
  type: string;
  category: Category;
  amount: string;
  date: Date;
  description?: string;
};

export type TransactionPost = {
  type: 'income' | 'expense';
  category_id: number;
  amount: number;
  date: Date;
  description: string;
};
