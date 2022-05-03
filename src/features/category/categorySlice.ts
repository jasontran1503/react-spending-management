import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataResponse } from 'app/axiosApi';
import { RootState } from 'app/store';
import { Category, CategoryState, Color, Icon } from './categoryModel';

const initialState: CategoryState = {
  categories: [],
  icons: [],
  colors: [],
  isLoading: false
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // Get colors
    getColorsBegin: (state) => {
      state.isLoading = true;
    },
    getColorsSuccess: (state, action: PayloadAction<DataResponse<Color[]>>) => {
      state.isLoading = false;
      state.colors = action.payload.data;
    },
    getColorsFail: (state) => {
      state.isLoading = false;
    },

    // Get icons
    getIconsBegin: (state) => {
      state.isLoading = true;
    },
    getIconsSuccess: (state, action: PayloadAction<DataResponse<Icon[]>>) => {
      state.isLoading = false;
      state.icons = action.payload.data;
    },
    getIconsFail: (state) => {
      state.isLoading = false;
    },

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
    },

    // Delete category
    deleteCategoryBegin: (state, action) => {
      state.isLoading = true;
    },
    deleteCategorySuccess: (state, action: PayloadAction<DataResponse<Category>>) => {
      state.isLoading = false;
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload.data._id
      );
    },
    deleteCategoryFail: (state) => {
      state.isLoading = false;
    },

    // Create category
    createCategoryBegin: (state, action) => {
      state.isLoading = true;
    },
    createCategorySuccess: (state, action: PayloadAction<DataResponse<Category>>) => {
      state.isLoading = false;
      state.categories = [...state.categories, action.payload.data];
    },
    createCategoryFail: (state) => {
      state.isLoading = false;
    },

    // Update category
    updateCategoryBegin: (state, action) => {
      state.isLoading = true;
    },
    updateCategorySuccess: (state, action: PayloadAction<DataResponse<Category>>) => {
      state.isLoading = false;
      state.categories = state.categories.map((category) => {
        const { _id, color, name, icon } = action.payload.data;
        return category._id === _id ? { ...category, name, icon, color } : category;
      });
    },
    updateCategoryFail: (state) => {
      state.isLoading = false;
    }
  }
});

export const categoryActions = categorySlice.actions;

export const selectCategories = (state: RootState) => state.category.categories;
export const selectSingleCategory = (categoryId: string) => (state: RootState) =>
  state.category.categories.find((category) => category._id === categoryId);
export const selectColors = (state: RootState) => state.category.colors;
export const selectIcons = (state: RootState) => state.category.icons;
export const selectCategoryLoading = (state: RootState) => state.category.isLoading;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
