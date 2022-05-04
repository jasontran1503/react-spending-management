import axiosApi, { DataResponse } from 'app/axiosApi';
import { ExpensesDaily, ExpensesItem, NewExpensesRequest } from 'features/expenses/expensesModel';

const createExpenses = async (body: NewExpensesRequest) => {
  return axiosApi.post<DataResponse<ExpensesItem>>('expenses/create', body).then((res) => res.data);
};

const deleteExpenses = async (expensesId: string) => {
  return axiosApi
    .delete<DataResponse<ExpensesItem>>('expenses/delete', { params: { expensesId } })
    .then((res) => res.data);
};

const getSingleExpenses = async (expensesId: string) => {
  return axiosApi
    .get<DataResponse<ExpensesItem>>('expenses/single', { params: { expensesId } })
    .then((res) => res.data.data);
};

const updateExpenses = async (body: NewExpensesRequest, expensesId: string) => {
  return axiosApi
    .put<DataResponse<ExpensesItem>>('expenses/update', body, { params: { expensesId } })
    .then((res) => res.data);
};

const getAllExpenses = async () => {
  return axiosApi.get<DataResponse<ExpensesItem[]>>('expenses').then((res) => res.data);
};

const reportDaily = async (day: string) => {
  return axiosApi
    .get<DataResponse<ExpensesDaily>>('expenses/daily', { params: { day } })
    .then((res) => res.data.data);
};

const expensesApi = {
  createExpenses,
  deleteExpenses,
  reportDaily,
  getSingleExpenses,
  updateExpenses,
  getAllExpenses
};

export default expensesApi;
