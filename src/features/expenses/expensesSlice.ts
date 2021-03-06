import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataResponse } from 'app/axiosApi';
import { RootState } from 'app/store';
import { ExpensesDaily, ExpensesItem, ExpensesMonthly, ExpensesState } from './expensesModel';

const initialState: ExpensesState = {
  isLoading: false,
  expensesInMonthByCategory: [],
  expensesDaily: {
    dailyExpensesList: [],
    totalMoney: 0
  }
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    // Get expenses in month by category
    getExpensesInMonthByCategoryBegin: (state, action) => {
      state.isLoading = true;
    },
    getExpensesInMonthByCategorySuccess: (state, action: PayloadAction<ExpensesItem[]>) => {
      state.isLoading = false;
      state.expensesInMonthByCategory = action.payload;
    },
    getExpensesInMonthByCategoryFail: (state) => {
      state.isLoading = false;
      state.expensesInMonthByCategory = [];
    },

    // Report daily expenses
    reportDailyExpensesBegin: (state, action) => {
      state.isLoading = true;
    },
    reportDailyExpensesSuccess: (state, action: PayloadAction<ExpensesDaily>) => {
      state.isLoading = false;
      state.expensesDaily.dailyExpensesList = action.payload.dailyExpensesList;
      state.expensesDaily.totalMoney = action.payload.totalMoney;
    },
    reportDailyExpensesFail: (state) => {
      state.isLoading = false;
      state.expensesDaily.dailyExpensesList = [];
      state.expensesDaily.totalMoney = 0;
    },

    // Report monthly expenses
    reportMonthlyExpensesBegin: (state, action) => {
      state.isLoading = true;
    },
    reportMonthlyExpensesSuccess: (state, action: PayloadAction<ExpensesMonthly>) => {
      state.isLoading = false;
    },
    reportMonthlyExpensesFail: (state) => {
      state.isLoading = false;
    },

    // Create new expenses
    createExpensesBegin: (state, action) => {
      state.isLoading = true;
    },
    createExpensesSuccess: (state, action: PayloadAction<DataResponse<ExpensesItem>>) => {
      state.isLoading = false;
      state.expensesDaily.dailyExpensesList = [
        ...state.expensesDaily.dailyExpensesList,
        action.payload.data
      ];
    },
    createExpensesFail: (state) => {
      state.isLoading = false;
    },

    // Delete new expenses
    deleteExpensesBegin: (state, action) => {
      state.isLoading = true;
    },
    deleteExpensesSuccess: (state, action: PayloadAction<DataResponse<ExpensesItem>>) => {
      state.isLoading = false;
      state.expensesDaily.dailyExpensesList = state.expensesDaily.dailyExpensesList.filter(
        (item) => {
          if (item._id === action.payload.data._id) {
            state.expensesDaily.totalMoney = state.expensesDaily.totalMoney - item.money;
          }
          return item._id !== action.payload.data._id;
        }
      );
      state.expensesInMonthByCategory = state.expensesInMonthByCategory.filter(
        (item) => item._id !== action.payload.data._id
      );
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
      state.expensesDaily.dailyExpensesList = state.expensesDaily.dailyExpensesList.map((item) => {
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

export const selectExpensesInMonthByCategory = (state: RootState) =>
  state.expenses.expensesInMonthByCategory;
export const selectExpensesLoading = (state: RootState) => state.expenses.isLoading;
export const selectDailyExpensesList = (state: RootState) =>
  state.expenses.expensesDaily.dailyExpensesList;
export const selectDailyExpensesMoney = (state: RootState) =>
  state.expenses.expensesDaily.totalMoney;

const expensesReducer = expensesSlice.reducer;
export default expensesReducer;
