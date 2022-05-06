import { PayloadAction } from '@reduxjs/toolkit';
import expensesApi from 'apis/expensesApi';
import { DataResponse } from 'app/axiosApi';
import { useToastify } from 'common/hooks/useToastify';
import { history } from 'common/logic/history';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { ExpensesDaily, ExpensesItem, ExpensesMonthly, NewExpensesRequest } from './expensesModel';
import { expensesActions } from './expensesSlice';

function* handleCreateExpenses(action: PayloadAction<NewExpensesRequest>) {
  const toastify = useToastify;
  try {
    const response: DataResponse<ExpensesItem> = yield call(
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

function* handleUpdateExpenses(
  action: PayloadAction<{ expensesRequest: NewExpensesRequest; expensesId: string }>
) {
  const toastify = useToastify;
  try {
    const response: DataResponse<ExpensesItem> = yield call(
      expensesApi.updateExpenses,
      action.payload.expensesRequest,
      action.payload.expensesId
    );
    yield put(expensesActions.updateExpensesSuccess(response));
    yield call(toastify, 'success', response.message);
    yield call(history.push, `/expenses/calendar/${response.data.createdAt}`);
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(expensesActions.updateExpensesFail());
    yield call(toastify, 'error', errorResponse.message);
  }
}

function* handleDeleteExpenses(action: PayloadAction<string>) {
  const toastify = useToastify;
  try {
    const response: DataResponse<ExpensesItem> = yield call(
      expensesApi.deleteExpenses,
      action.payload
    );
    yield put(expensesActions.deleteExpensesSuccess(response));
    yield call(toastify, 'success', response.message);
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(expensesActions.deleteExpensesFail());
    yield call(toastify, 'error', errorResponse.message);
  }
}

function* handleReportDailyExpenses(action: PayloadAction<string>) {
  try {
    const response: ExpensesDaily = yield call(expensesApi.reportDaily, action.payload);
    yield put(expensesActions.reportDailyExpensesSuccess(response));
  } catch (error) {
    yield put(expensesActions.reportDailyExpensesFail());
  }
}

function* handleReportMonthlyExpenses(action: PayloadAction<string>) {
  try {
    const response: ExpensesMonthly = yield call(expensesApi.reportMonthly, action.payload);
    yield put(expensesActions.reportMonthlyExpensesSuccess(response));
  } catch (error) {
    yield put(expensesActions.reportMonthlyExpensesFail());
  }
}

function* handleGetExpensesInMonthByCategory(
  action: PayloadAction<{ date: string; categoryId: string }>
) {
  try {
    const response: ExpensesItem[] = yield call(
      expensesApi.getExpensesInMonthByCategory,
      action.payload.date,
      action.payload.categoryId
    );
    yield put(expensesActions.getExpensesInMonthByCategorySuccess(response));
  } catch (error) {
    yield put(expensesActions.getExpensesInMonthByCategoryFail());
  }
}

export default function* expensesSaga() {
  yield takeLeading(expensesActions.createExpensesBegin.type, handleCreateExpenses);
  yield takeLeading(expensesActions.updateExpensesBegin.type, handleUpdateExpenses);
  yield takeLeading(expensesActions.deleteExpensesBegin.type, handleDeleteExpenses);
  yield takeEvery(expensesActions.reportDailyExpensesBegin.type, handleReportDailyExpenses);
  yield takeEvery(expensesActions.reportMonthlyExpensesBegin.type, handleReportMonthlyExpenses);
  yield takeEvery(
    expensesActions.getExpensesInMonthByCategoryBegin.type,
    handleGetExpensesInMonthByCategory
  );
}
