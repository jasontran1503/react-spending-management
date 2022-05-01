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
    // Create new expenses
    createExpensesBegin: (state, action) => {
      state.isLoading = true;
    },
    createExpensesSuccess: (state, action: PayloadAction<DataResponse<ExpensesItem[]>>) => {
      state.isLoading = false;
      state.expensesList = action.payload.data;
    },
    createExpensesFail: (state) => {
      state.isLoading = false;
      state.expensesList = [];
    }
  }
});

export const expensesActions = expensesSlice.actions;

export const selectExpensesList = (state: RootState) => state.expenses.expensesList;
export const selectExpensesLoading = (state: RootState) => state.expenses.isLoading;

const expensesReducer = expensesSlice.reducer;
export default expensesReducer;
