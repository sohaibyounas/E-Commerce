export type NotificationType = 'order' | 'product' | 'customer' | 'system' | 'alert';
export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export const notifications: Notification[] = [
  { id: '1', title: 'New Order Received', message: 'Order #ORD-004 has been placed by David Wilson for $339.90', type: 'order', priority: 'high', read: false, actionUrl: '/orders/ORD-004', createdAt: '2024-06-21T09:00:00' },
  { id: '2', title: 'Low Stock Alert', message: 'Leather Messenger Bag (SKU: LMB-004) is running low with only 34 units remaining', type: 'alert', priority: 'high', read: false, actionUrl: '/inventory', createdAt: '2024-06-21T08:30:00' },
  { id: '3', title: 'Product Review', message: 'New 5-star review for "Wireless Bluetooth Headphones Pro"', type: 'product', priority: 'low', read: true, actionUrl: '/products/1', createdAt: '2024-06-20T15:45:00' },
  { id: '4', title: 'Customer Registration', message: 'New customer Emily Chen just signed up', type: 'customer', priority: 'medium', read: false, createdAt: '2024-06-20T14:20:00' },
  { id: '5', title: 'Order Shipped', message: 'Order #ORD-002 has been shipped via FedEx (TRK987654321)', type: 'order', priority: 'medium', read: true, actionUrl: '/orders/ORD-002', createdAt: '2024-06-19T11:30:00' },
  { id: '6', title: 'Payment Failed', message: 'Payment for order #ORD-005 failed. Customer has been notified.', type: 'order', priority: 'high', read: true, actionUrl: '/orders/ORD-005', createdAt: '2024-06-17T16:25:00' },
  { id: '7', title: 'System Update', message: 'Dashboard v2.5.0 has been deployed successfully', type: 'system', priority: 'low', read: true, createdAt: '2024-06-15T02:00:00' },
  { id: '8', title: 'Out of Stock', message: 'Portable Power Bank 20000mAh is now out of stock', type: 'alert', priority: 'high', read: false, actionUrl: '/inventory', createdAt: '2024-06-21T07:00:00' },
];

export const unreadCount = notifications.filter((n) => !n.read).length;
