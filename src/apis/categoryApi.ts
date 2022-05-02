import axiosApi, { DataResponse } from 'app/axiosApi';
import { Category } from 'features/category/categoryModel';

const getCategoriesByUser = async () => {
  return axiosApi.get<DataResponse<Category[]>>('category').then((res) => res.data);
};

const deleteCategory = async (categoryId: string) => {
  return axiosApi
    .delete<DataResponse<Category>>('category/delete', {
      params: { categoryId }
    })
    .then((res) => res.data);
};

const categoryApi = {
  getCategoriesByUser,
  deleteCategory
};

export default categoryApi;
