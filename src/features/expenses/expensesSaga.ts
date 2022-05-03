import { PayloadAction } from '@reduxjs/toolkit';
import expensesApi from 'apis/expensesApi';
import { DataResponse } from 'app/axiosApi';
import { useToastify } from 'common/hooks/useToastify';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { ExpensesDaily, ExpensesItem, NewExpensesRequest } from './expensesModel';
import { expensesActions } from './expensesSlice';

function* handleCreateExpenses(action: PayloadAction<NewExpensesRequest>) {
  const toastify = useToastify;
  try {
    const response: DataResponse<ExpensesItem[]> = yield call(
      expensesApi.createExpenses,
      action.payload
    );
    yield put(expensesActions.createExpensesSuccess(response));
    yield call(toastify, 'success', response.message);
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(expensesActions.createExpensesFail());
    yield call(toastify, 'error', errorResponse.message);
  }
}

function* handleReportDailyExpenses(action: PayloadAction<string>) {
  const toastify = useToastify;
  try {
    const response: DataResponse<ExpensesDaily> = yield call(
      expensesApi.reportDaily,
      action.payload
    );
    yield put(expensesActions.reportDailySuccess(response));
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(expensesActions.reportDailyFail());
    yield call(toastify, 'error', errorResponse.message);
  }
}

export default function* expensesSaga() {
  yield takeLeading(expensesActions.createExpensesBegin.type, handleCreateExpenses);
  yield takeEvery(expensesActions.reportDailyBegin.type, handleReportDailyExpenses);
}
