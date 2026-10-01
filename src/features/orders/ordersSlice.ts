import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Order } from '../../data';

interface OrdersState {
  items: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  filters: { search: string; status: string };
  pagination: { page: number; limit: number; total: number };
}

const initialState: OrdersState = {
  items: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
  filters: { search: '', status: 'all' },
  pagination: { page: 0, limit: 10, total: 0 },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => { state.items = action.payload; },
    selectOrder: (state, action: PayloadAction<Order | null>) => { state.selectedOrder = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; },
  },
});

export const { setOrders, selectOrder, setLoading, setError } = ordersSlice.actions;
export default ordersSlice.reducer;
