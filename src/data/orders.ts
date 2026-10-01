export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'stripe' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: { street: string; city: string; state: string; country: string; zip: string };
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const orders: Order[] = [
  { id: 'ORD-001', customerId: '1', customerName: 'John Smith', customerEmail: 'john.smith@email.com', items: [{ productId: '1', productName: 'Wireless Bluetooth Headphones Pro', quantity: 1, price: 249.99, image: 'https://images.pexels.com/photos/339466/pexels-photo-339466.jpeg?w=100' }, { productId: '3', productName: 'Smart Watch Ultra', quantity: 1, price: 399.99, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?w=100' }], subtotal: 649.98, tax: 58.50, shipping: 0, discount: 50, total: 658.48, status: 'delivered', paymentMethod: 'credit_card', paymentStatus: 'paid', shippingAddress: { street: '123 Main St', city: 'New York', state: 'NY', country: 'USA', zip: '10001' }, trackingNumber: 'TRK123456789', createdAt: '2024-06-15T10:30:00', updatedAt: '2024-06-18T14:20:00' },
  { id: 'ORD-002', customerId: '2', customerName: 'Sarah Johnson', customerEmail: 'sarah.j@email.com', items: [{ productId: '5', productName: 'Running Shoes Elite', quantity: 2, price: 159.99, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=100' }, { productId: '7', productName: 'Yoga Mat Premium', quantity: 1, price: 69.99, image: 'https://images.pexels.com/photos/4220485/pexels-photo-4220485.jpeg?w=100' }], subtotal: 389.97, tax: 35.10, shipping: 9.99, discount: 0, total: 435.06, status: 'shipped', paymentMethod: 'paypal', paymentStatus: 'paid', shippingAddress: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', country: 'USA', zip: '90001' }, trackingNumber: 'TRK987654321', createdAt: '2024-06-18T08:15:00', updatedAt: '2024-06-19T11:30:00' },
  { id: 'ORD-003', customerId: '3', customerName: 'Michael Brown', customerEmail: 'm.brown@email.com', items: [{ productId: '4', productName: 'Leather Messenger Bag', quantity: 1, price: 189.99, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=100' }, { productId: '12', productName: 'Classic Denim Jeans', quantity: 2, price: 69.99, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?w=100' }], subtotal: 329.97, tax: 29.70, shipping: 0, discount: 30, total: 329.67, status: 'processing', paymentMethod: 'credit_card', paymentStatus: 'paid', shippingAddress: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', country: 'USA', zip: '60601' }, createdAt: '2024-06-20T14:45:00', updatedAt: '2024-06-20T14:45:00' },
  { id: 'ORD-004', customerId: '5', customerName: 'David Wilson', customerEmail: 'd.wilson@email.com', items: [{ productId: '6', productName: 'Ceramic Coffee Mug Set', quantity: 3, price: 49.99, image: 'https://images.pexels.com/photos/1724487/pexels-photo-1724487.jpeg?w=100' }, { productId: '10', productName: 'Stainless Steel Water Bottle', quantity: 5, price: 29.99, image: 'https://images.pexels.com/photos/1345082/pexels-photo-1345082.jpeg?w=100' }], subtotal: 299.92, tax: 26.99, shipping: 12.99, discount: 0, total: 339.90, status: 'pending', paymentMethod: 'debit_card', paymentStatus: 'pending', shippingAddress: { street: '654 Maple Dr', city: 'Phoenix', state: 'AZ', country: 'USA', zip: '85001' }, createdAt: '2024-06-21T09:00:00', updatedAt: '2024-06-21T09:00:00' },
  { id: 'ORD-005', customerId: '6', customerName: 'Jessica Martinez', customerEmail: 'jess.m@email.com', items: [{ productId: '9', productName: 'Portable Power Bank 20000mAh', quantity: 2, price: 59.99, image: 'https://images.pexels.com/photos/1626565/pexels-photo-1626565.jpeg?w=100' }], subtotal: 119.98, tax: 10.80, shipping: 5.99, discount: 0, total: 136.77, status: 'cancelled', paymentMethod: 'stripe', paymentStatus: 'refunded', shippingAddress: { street: '987 Cedar Ln', city: 'Philadelphia', state: 'PA', country: 'USA', zip: '19101' }, notes: 'Customer requested cancellation', createdAt: '2024-06-17T16:20:00', updatedAt: '2024-06-17T18:30:00' },
  { id: 'ORD-006', customerId: '8', customerName: 'Amanda White', customerEmail: 'amanda.w@email.com', items: [{ productId: '2', productName: 'Organic Cotton T-Shirt', quantity: 4, price: 34.99, image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?w=100' }, { productId: '8', productName: 'Desk Lamp Modern', quantity: 2, price: 79.99, image: 'https://images.pexels.com/photos/1112581/pexels-photo-1112581.jpeg?w=100' }], subtotal: 299.94, tax: 26.99, shipping: 0, discount: 25, total: 301.93, status: 'delivered', paymentMethod: 'credit_card', paymentStatus: 'paid', shippingAddress: { street: '753 Walnut Ave', city: 'San Diego', state: 'CA', country: 'USA', zip: '92101' }, trackingNumber: 'TRK456789123', createdAt: '2024-06-10T11:00:00', updatedAt: '2024-06-14T09:15:00' },
];

export const getOrderById = (id: string) => orders.find((o) => o.id === id);
