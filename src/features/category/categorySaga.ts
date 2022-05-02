import { PayloadAction } from '@reduxjs/toolkit';
import categoryApi from 'apis/categoryApi';
import { DataResponse } from 'app/axiosApi';
import { useToastify } from 'common/hooks/useToastify';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { Category } from './categoryModel';
import { categoryActions } from './categorySlice';

function* handleGetCategories() {
  const toastify = useToastify;
  try {
    const response: DataResponse<Category[]> = yield call(categoryApi.getCategoriesByUser);
    yield put(categoryActions.getCategorySuccess(response));
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(categoryActions.getCategoryFail());
    yield toastify('error', errorResponse.message);
  }
}

function* handleDeleteCategory(action: PayloadAction<string>) {
  console.log(action.payload);
  const toastify = useToastify;
  try {
    const response: DataResponse<Category> = yield call(categoryApi.deleteCategory, action.payload);
    yield put(categoryActions.deleteCategorySuccess(response));
    yield toastify('success', response.message);
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(categoryActions.deleteCategoryFail());
    yield toastify('error', errorResponse.message);
  }
}

export default function* categorySaga() {
  yield takeEvery(categoryActions.getCategoryBegin.type, handleGetCategories);
  yield takeLeading(categoryActions.deleteCategoryBegin.type, handleDeleteCategory);
}
