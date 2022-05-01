import authSaga from 'features/auth/authSaga';
import categorySaga from 'features/category/categorySaga';
import expensesSaga from 'features/expenses/expensesSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), categorySaga(), expensesSaga()]);
}
