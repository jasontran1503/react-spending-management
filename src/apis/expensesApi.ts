import axiosApi, { DataResponse } from 'app/axiosApi';
import {
  ExpensesDaily,
  ExpensesItem,
  ExpensesMonthly,
  NewExpensesRequest
} from 'features/expenses/expensesModel';

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

const reportMonthly = async (date: string) => {
  return axiosApi
    .get<DataResponse<ExpensesMonthly>>('expenses/monthly', { params: { date } })
    .then((res) => res.data.data);
};

const getExpensesInMonthByCategory = async (date: string, categoryId: string) => {
  return axiosApi
    .get<DataResponse<ExpensesItem[]>>('expenses/monthly/detail', { params: { date, categoryId } })
    .then((res) => res.data.data);
};

const expensesApi = {
  createExpenses,
  deleteExpenses,
  reportDaily,
  getSingleExpenses,
  updateExpenses,
  getAllExpenses,
  reportMonthly,
  getExpensesInMonthByCategory
};

export default expensesApi;
