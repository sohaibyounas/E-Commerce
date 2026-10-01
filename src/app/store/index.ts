import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../features/auth';
import { productsReducer } from '../../features/products';
import { ordersReducer } from '../../features/orders';
import { customersReducer } from '../../features/customers';
import { categoriesReducer } from '../../features/categories';
import { notificationsReducer } from '../../features/notifications';
import { settingsReducer } from '../../features/settings';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
    customers: customersReducer,
    categories: categoriesReducer,
    notifications: notificationsReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
