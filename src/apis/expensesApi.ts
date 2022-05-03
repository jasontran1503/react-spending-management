import axiosApi, { DataResponse } from 'app/axiosApi';
import {
  ExpensesDaily,
  ExpensesResponse,
  NewExpensesRequest
} from 'features/expenses/expensesModel';

const createExpenses = async (body: NewExpensesRequest) => {
  return axiosApi
    .post<DataResponse<ExpensesResponse>>('expenses/create', body)
    .then((res) => res.data);
};

const reportDaily = async (day: string) => {
  return axiosApi
    .get<DataResponse<ExpensesDaily>>('expenses/daily', { params: { day } })
    .then((res) => res.data);
};

const expensesApi = {
  createExpenses,
  reportDaily
};

export default expensesApi;
