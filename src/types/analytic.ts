import { TransactionType } from './transaction';

export interface ExpensesByCategory {
  category: string;
  amount: number;
  type: TransactionType;
}

export interface IncomeVsExpenses {
  income: number;
  expenses: number;
  balance: number;
}

export interface CountOfTransactions {
  income: number;
  expenses: number;
}

export interface DailyTransactions {
  date: Date;
  income: number;
  expense: number;
}

export type DateRangeParams = {
  from: string;
  to: string;
};
