import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '../../data';

interface CustomersState {
  items: Customer[];
  selectedCustomer: Customer | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CustomersState = {
  items: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => { state.items = action.payload; },
    selectCustomer: (state, action: PayloadAction<Customer | null>) => { state.selectedCustomer = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
  },
});

export const { setCustomers, selectCustomer, setLoading } = customersSlice.actions;
export default customersSlice.reducer;
