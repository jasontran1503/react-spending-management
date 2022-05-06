import { Category } from 'features/category/categoryModel';

export interface ExpensesState {
  isLoading: boolean;
  expensesInMonthByCategory: ExpensesItem[];
  expensesDaily: {
    dailyExpensesList: ExpensesItem[];
    totalMoney: number;
  };
}

export interface NewExpensesRequest {
  money: string;
  category: string;
  createdAt: string;
  note: string;
}

export interface ExpensesResponse {
  money: number;
  createdAt: string;
  note: string;
  category: string;
  user: string;
  _id: string;
}

export interface ExpensesItem {
  _id: string;
  money: number;
  createdAt: string;
  note: string;
  category: Category;
  user: string;
}

export interface ExpensesDaily {
  dailyExpensesList: ExpensesItem[];
  totalMoney: number;
}

export interface ExpensesMonthly {
  monthlyExpensesList: ExpensesItem[];
  totalMoney: number;
}
