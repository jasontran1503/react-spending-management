export interface CategoryState {
  categories: Category[];
  icons: Icon[];
  colors: Color[];
  isLoading: boolean;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
  user: string;
}

export interface CategoryRequest {
  name: string;
  icon: string;
  color: string;
}

export interface Color {
  _id: string;
  name: string;
}

export interface Icon {
  _id: string;
  name: string;
}
