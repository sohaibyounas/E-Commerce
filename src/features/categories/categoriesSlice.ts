import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../../data';

interface CategoriesState {
  items: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => { state.items = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
  },
});

export const { setCategories, setLoading } = categoriesSlice.actions;
export default categoriesSlice.reducer;
