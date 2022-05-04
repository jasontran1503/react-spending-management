import { PayloadAction } from '@reduxjs/toolkit';
import expensesApi from 'apis/expensesApi';
import { DataResponse } from 'app/axiosApi';
import { useToastify } from 'common/hooks/useToastify';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { ExpensesItem, NewExpensesRequest } from './expensesModel';
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

function* handleGetAllExpenses() {
  try {
    const response: DataResponse<ExpensesItem[]> = yield call(expensesApi.getAllExpenses);
    yield put(expensesActions.getAllExpensesSuccess(response));
  } catch (error) {
    yield put(expensesActions.getAllExpensesFail());
  }
}

export default function* expensesSaga() {
  yield takeLeading(expensesActions.createExpensesBegin.type, handleCreateExpenses);
  yield takeLeading(expensesActions.updateExpensesBegin.type, handleUpdateExpenses);
  yield takeLeading(expensesActions.deleteExpensesBegin.type, handleDeleteExpenses);
  yield takeEvery(expensesActions.getAllExpensesBegin.type, handleGetAllExpenses);
}
