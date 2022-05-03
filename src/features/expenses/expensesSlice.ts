import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataResponse } from 'app/axiosApi';
import { RootState } from 'app/store';
import { ExpensesDaily, ExpensesItem, ExpensesState } from './expensesModel';

const initialState: ExpensesState = {
  isLoading: false,
  expensesList: [],
  expensesDaily: {
    dailyExpensesList: [],
    totalMoney: 0
  }
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
    },

    // Report daily expenses
    reportDailyBegin: (state, action) => {
      state.isLoading = true;
    },
    reportDailySuccess: (state, action: PayloadAction<DataResponse<ExpensesDaily>>) => {
      state.isLoading = false;
      state.expensesDaily = action.payload.data;
    },
    reportDailyFail: (state) => {
      state.isLoading = false;
    }
  }
});

export const expensesActions = expensesSlice.actions;

export const selectExpensesList = (state: RootState) => state.expenses.expensesList;
export const selectExpensesLoading = (state: RootState) => state.expenses.isLoading;

export const selectExpensesDailyList = (state: RootState) =>
  state.expenses.expensesDaily.dailyExpensesList;
export const selectExpensesDailyMoney = (state: RootState) =>
  state.expenses.expensesDaily.totalMoney;

const expensesReducer = expensesSlice.reducer;
export default expensesReducer;
