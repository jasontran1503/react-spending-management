import axiosApi, { DataResponse } from 'app/axiosApi';
import { ExpensesResponse, NewExpensesRequest } from 'features/expenses/expensesModel';

const createExpenses = async (body: NewExpensesRequest) => {
  return axiosApi
    .post<DataResponse<ExpensesResponse>>('expenses/create', body)
    .then((res) => res.data);
};

const expensesApi = {
  createExpenses
};

export default expensesApi;
