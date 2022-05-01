import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataResponse } from 'app/axiosApi';
import { RootState } from 'app/store';
import { Category, CategoryState } from './categoryModel';

const initialState: CategoryState = {
  categories: [],
  isLoading: false
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // Get categories
    getCategoryBegin: (state) => {
      state.isLoading = true;
    },
    getCategorySuccess: (state, action: PayloadAction<DataResponse<Category[]>>) => {
      state.isLoading = false;
      state.categories = action.payload.data;
    },
    getCategoryFail: (state) => {
      state.isLoading = false;
      state.categories = [];
    }
  }
});

export const categoryActions = categorySlice.actions;

export const selectCategories = (state: RootState) => state.category.categories;
export const selectCategoryLoading = (state: RootState) => state.category.isLoading;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
