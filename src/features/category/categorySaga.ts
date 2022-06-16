import { PayloadAction } from '@reduxjs/toolkit';
import categoryApi from 'apis/categoryApi';
import { DataResponse } from 'app/axiosApi';
import { useToastify } from 'common/hooks/useToastify';
import { history } from 'common/logic/history';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { Category, Color, Icon, CategoryRequest } from './categoryModel';
import { categoryActions } from './categorySlice';

function* handleGetIcons() {
  try {
    const response: DataResponse<Icon[]> = yield call(categoryApi.getIcons);
    yield put(categoryActions.getIconsSuccess(response));
  } catch (error) {
    yield put(categoryActions.getIconsFail());
  }
}

function* handleGetColors() {
  try {
    const response: DataResponse<Color[]> = yield call(categoryApi.getColors);
    yield put(categoryActions.getColorsSuccess(response));
  } catch (error) {
    yield put(categoryActions.getColorsFail());
  }
}

function* handleGetCategories() {
  const toastify = useToastify;
  try {
    const response: DataResponse<Category[]> = yield call(categoryApi.getCategoriesByUser);
    yield put(categoryActions.getCategorySuccess(response));
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(categoryActions.getCategoryFail());
    yield call(toastify, 'error', errorResponse?.message);
  }
}

function* handleDeleteCategory(action: PayloadAction<string>) {
  const toastify = useToastify;
  try {
    const response: DataResponse<Category> = yield call(categoryApi.deleteCategory, action.payload);
    yield put(categoryActions.deleteCategorySuccess(response));
    yield call(toastify, 'success', response.message);
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(categoryActions.deleteCategoryFail());
    yield call(toastify, 'error', errorResponse?.message);
  }
}

function* handleCreateCategory(action: PayloadAction<CategoryRequest>) {
  const toastify = useToastify;
  try {
    const response: DataResponse<Category> = yield call(categoryApi.createCategory, action.payload);
    yield put(categoryActions.createCategorySuccess(response));
    yield call(toastify, 'success', response.message);
    yield call(history.push, '/category/list');
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(categoryActions.createCategoryFail());
    yield call(toastify, 'error', errorResponse?.message);
  }
}

function* handleUpdateCategory(
  action: PayloadAction<{ request: CategoryRequest; categoryId: string }>
) {
  const toastify = useToastify;
  try {
    const response: DataResponse<Category> = yield call(
      categoryApi.updateCategory,
      action.payload.request,
      action.payload.categoryId
    );
    yield put(categoryActions.updateCategorySuccess(response));
    yield call(toastify, 'success', response.message);
    yield call(history.push, '/category/list');
  } catch (error) {
    const errorResponse = error as DataResponse<null>;
    yield put(categoryActions.updateCategoryFail());
    yield call(toastify, 'error', errorResponse?.message);
  }
}

export default function* categorySaga() {
  yield takeEvery(categoryActions.getIconsBegin.type, handleGetIcons);
  yield takeEvery(categoryActions.getColorsBegin.type, handleGetColors);

  yield takeEvery(categoryActions.getCategoryBegin.type, handleGetCategories);
  yield takeLeading(categoryActions.deleteCategoryBegin.type, handleDeleteCategory);
  yield takeLeading(categoryActions.createCategoryBegin.type, handleCreateCategory);
  yield takeLeading(categoryActions.updateCategoryBegin.type, handleUpdateCategory);
}
