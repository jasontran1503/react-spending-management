import axiosApi, { DataResponse } from 'app/axiosApi';
import { Category, CategoryRequest, Color, Icon } from 'features/category/categoryModel';

const getIcons = async () => {
  return axiosApi.get<DataResponse<Icon[]>>('icon').then((res) => res.data);
};

const getColors = async () => {
  return axiosApi.get<DataResponse<Color[]>>('color').then((res) => res.data);
};

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

const createCategory = async (body: CategoryRequest) => {
  return axiosApi.post<DataResponse<Category>>('category/create', body).then((res) => res.data);
};

const updateCategory = async (body: CategoryRequest, categoryId: string) => {
  return axiosApi
    .put<DataResponse<Category>>('category/update', body, { params: { categoryId } })
    .then((res) => res.data);
};

const categoryApi = {
  getIcons,
  getColors,
  getCategoriesByUser,
  deleteCategory,
  createCategory,
  updateCategory
};

export default categoryApi;
