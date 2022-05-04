import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataResponse } from 'app/axiosApi';
import { RootState } from 'app/store';
import { ExpensesItem, ExpensesState } from './expensesModel';

const initialState: ExpensesState = {
  isLoading: false,
  expensesList: []
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    // Get all expenses
    getAllExpensesBegin: (state) => {
      state.isLoading = true;
    },
    getAllExpensesSuccess: (state, action: PayloadAction<DataResponse<ExpensesItem[]>>) => {
      state.isLoading = false;
      state.expensesList = action.payload.data;
    },
    getAllExpensesFail: (state) => {
      state.isLoading = false;
      state.expensesList = [];
    },

    // Create new expenses
    createExpensesBegin: (state, action) => {
      state.isLoading = true;
    },
    createExpensesSuccess: (state, action: PayloadAction<DataResponse<ExpensesItem>>) => {
      state.isLoading = false;
      state.expensesList = [...state.expensesList, action.payload.data];
    },
    createExpensesFail: (state) => {
      state.isLoading = false;
      state.expensesList = [];
    },

    // Delete new expenses
    deleteExpensesBegin: (state, action) => {
      state.isLoading = true;
    },
    deleteExpensesSuccess: (state, action: PayloadAction<DataResponse<ExpensesItem>>) => {
      state.isLoading = false;
    },
    deleteExpensesFail: (state) => {
      state.isLoading = false;
    },

    // Update expenses
    updateExpensesBegin: (state, action) => {
      state.isLoading = true;
    },
    updateExpensesSuccess: (state, action: PayloadAction<DataResponse<ExpensesItem>>) => {
      state.isLoading = false;
      state.expensesList = state.expensesList.map((item) => {
        const { _id, category, createdAt, money, note } = action.payload.data;
        return item._id === _id ? { ...item, category, createdAt, money, note } : item;
      });
    },
    updateExpensesFail: (state) => {
      state.isLoading = false;
    }
  }
});

export const expensesActions = expensesSlice.actions;

export const selectExpensesList = (state: RootState) => state.expenses.expensesList;
export const selectExpensesLoading = (state: RootState) => state.expenses.isLoading;

const expensesReducer = expensesSlice.reducer;
export default expensesReducer;
