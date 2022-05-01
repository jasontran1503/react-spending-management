import axiosApi, { DataResponse } from 'app/axiosApi';
import { Category } from 'features/category/categoryModel';

const getCategoriesByUser = async () => {
  return axiosApi.get<DataResponse<Category[]>>('category').then((res) => res.data);
};

const categoryApi = {
  getCategoriesByUser
};

export default categoryApi;
