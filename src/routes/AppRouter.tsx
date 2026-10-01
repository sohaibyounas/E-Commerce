import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, VerifyEmailPage } from '../pages/auth';
import { DashboardPage } from '../pages/dashboard';
import { ProductListPage, ProductDetailPage, ProductAddPage, ProductEditPage } from '../pages/products';
import { OrderListPage, OrderDetailPage } from '../pages/orders';
import { CustomerListPage, CustomerDetailPage } from '../pages/customers';
import { CategoriesPage } from '../pages/categories';
import { InventoryPage } from '../pages/inventory';
import { NotificationsPage } from '../pages/notifications';
import { ProfilePage } from '../pages/profile';
import { SettingsPage } from '../pages/settings';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/add', element: <ProductAddPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'products/:id/edit', element: <ProductEditPage /> },
      { path: 'orders', element: <OrderListPage /> },
      { path: 'orders/:id', element: <OrderDetailPage /> },
      { path: 'customers', element: <CustomerListPage /> },
      { path: 'customers/:id', element: <CustomerDetailPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);
