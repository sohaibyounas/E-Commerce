import { API_ENDPOINTS } from '../constants';

// API Service Layer - Ready for integration
// TODO: Implement actual API calls with axios or fetch

export const BASE_URL = '/api'; // Configure based on environment

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
}

// Placeholder for API client
const apiClient = {
  request: async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    const { method = 'GET', headers = {}, body } = options;
    // TODO: Implement actual fetch/axios call
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API ${method}] ${BASE_URL}${endpoint}`, { headers, body });
    }
    return Promise.resolve({} as T);
  },
  get: <T>(endpoint: string) => apiClient.request<T>(endpoint),
  post: <T>(endpoint: string, data: any) => apiClient.request<T>(endpoint, { method: 'POST', body: data }),
  put: <T>(endpoint: string, data: any) => apiClient.request<T>(endpoint, { method: 'PUT', body: data }),
  delete: <T>(endpoint: string) => apiClient.request<T>(endpoint, { method: 'DELETE' }),
};

export const authService = {
  login: (credentials: { email: string; password: string }) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  register: (data: { name: string; email: string; password: string }) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data),
  googleLogin: () => apiClient.post(API_ENDPOINTS.AUTH.GOOGLE, {}),
  microsoftLogin: () => apiClient.post(API_ENDPOINTS.AUTH.MICROSOFT, {}),
  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {}),
  getProfile: () => apiClient.get(API_ENDPOINTS.AUTH.PROFILE),
  forgotPassword: (email: string) => apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),
  resetPassword: (token: string, password: string) => apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password }),
  verifyEmail: (token: string) => apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token }),
  refreshToken: () => apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {}),
};

export const productService = {
  getAll: (_params?: { page?: number; limit?: number; search?: string; category?: string; status?: string }) => apiClient.get(API_ENDPOINTS.PRODUCTS),
  getById: (id: string) => apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${id}`),
  create: (data: any) => apiClient.post(API_ENDPOINTS.PRODUCTS, data),
  update: (id: string, data: any) => apiClient.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, data),
  delete: (id: string) => apiClient.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`),
};

export const orderService = {
  getAll: (_params?: { page?: number; limit?: number; search?: string; status?: string }) => apiClient.get(API_ENDPOINTS.ORDERS),
  getById: (id: string) => apiClient.get(`${API_ENDPOINTS.ORDERS}/${id}`),
  updateStatus: (id: string, status: string) => apiClient.put(`${API_ENDPOINTS.ORDERS}/${id}/status`, { status }),
};

export const customerService = {
  getAll: (_params?: { page?: number; limit?: number; search?: string; status?: string }) => apiClient.get(API_ENDPOINTS.CUSTOMERS),
  getById: (id: string) => apiClient.get(`${API_ENDPOINTS.CUSTOMERS}/${id}`),
};

export const categoryService = {
  getAll: () => apiClient.get(API_ENDPOINTS.CATEGORIES),
  create: (data: any) => apiClient.post(API_ENDPOINTS.CATEGORIES, data),
  update: (id: string, data: any) => apiClient.put(`${API_ENDPOINTS.CATEGORIES}/${id}`, data),
  delete: (id: string) => apiClient.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`),
};

export const inventoryService = {
  getAll: (_params?: { page?: number; limit?: number; status?: string }) => apiClient.get(API_ENDPOINTS.INVENTORY),
  updateStock: (id: string, quantity: number) => apiClient.put(`${API_ENDPOINTS.INVENTORY}/${id}`, { quantity }),
};

export const notificationService = {
  getAll: () => apiClient.get(API_ENDPOINTS.NOTIFICATIONS),
  markAsRead: (id: string) => apiClient.put(`${API_ENDPOINTS.NOTIFICATIONS}/${id}/read`, {}),
  markAllAsRead: () => apiClient.put(`${API_ENDPOINTS.NOTIFICATIONS}/read-all`, {}),
  delete: (id: string) => apiClient.delete(`${API_ENDPOINTS.NOTIFICATIONS}/${id}`),
};

export const settingsService = {
  get: () => apiClient.get(API_ENDPOINTS.SETTINGS),
  update: (data: any) => apiClient.put(API_ENDPOINTS.SETTINGS, data),
};

