import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../data';

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  filters: { search: string; category: string; status: string };
  pagination: { page: number; limit: number; total: number };
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  filters: { search: '', category: 'all', status: 'all' },
  pagination: { page: 0, limit: 10, total: 0 },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => { state.items = action.payload; },
    selectProduct: (state, action: PayloadAction<Product | null>) => { state.selectedProduct = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => { state.filters = { ...state.filters, ...action.payload }; },
    setPagination: (state, action: PayloadAction<Partial<ProductsState['pagination']>>) => { state.pagination = { ...state.pagination, ...action.payload }; },
  },
});

export const { setProducts, selectProduct, setLoading, setError, setFilters, setPagination } = productsSlice.actions;
export default productsSlice.reducer;
