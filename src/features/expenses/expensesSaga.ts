import { PayloadAction } from '@reduxjs/toolkit';
import expensesApi from 'apis/expensesApi';
import { DataResponse } from 'app/axiosApi';
import { useToastify } from 'common/hooks/useToastify';
import { call, put, takeLeading } from 'redux-saga/effects';
import { ExpensesItem, NewExpensesRequest } from './expensesModel';
import { expensesActions } from './expensesSlice';

function* handleCreateExpenses(action: PayloadAction<NewExpensesRequest>) {
  const toastify = useToastify;
  try {
    const response: DataResponse<ExpensesItem[]> = yield call(
      expensesApi.createExpenses,
      action.payload
    );
    yield put(expensesActions.createExpensesSuccess(response));
    yield toastify('success', response.message);
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(expensesActions.createExpensesFail());
    yield toastify('error', errorResponse.message);
  }
}

export default function* expensesSaga() {
  yield takeLeading(expensesActions.createExpensesBegin.type, handleCreateExpenses);
}
