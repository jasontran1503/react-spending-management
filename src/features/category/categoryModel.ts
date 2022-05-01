export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
  user: {
    _id: string;
    username: string;
  };
}
