export const dashboardStats = {
  revenue: { total: 128450.50, thisMonth: 24890.00, lastMonth: 21340.00, change: 16.5 },
  orders: { total: 1456, thisMonth: 289, lastMonth: 245, change: 18.0 },
  customers: { total: 892, thisMonth: 156, lastMonth: 134, change: 16.4 },
  products: { total: 124, active: 98, lowStock: 8, outOfStock: 2 },
};

export const salesChartData = [
  { name: 'Jan', revenue: 12400, orders: 145 },
  { name: 'Feb', revenue: 15600, orders: 178 },
  { name: 'Mar', revenue: 18200, orders: 210 },
  { name: 'Apr', revenue: 16800, orders: 195 },
  { name: 'May', revenue: 21340, orders: 245 },
  { name: 'Jun', revenue: 24890, orders: 289 },
];

export const ordersByStatus = [
  { name: 'Pending', value: 45, color: '#f59e0b' },
  { name: 'Processing', value: 32, color: '#3b82f6' },
  { name: 'Shipped', value: 78, color: '#8b5cf6' },
  { name: 'Delivered', value: 234, color: '#10b981' },
  { name: 'Cancelled', value: 15, color: '#ef4444' },
];

export const topProducts = [
  { id: '3', name: 'Smart Watch Ultra', sales: 145, revenue: 57995.55 },
  { id: '1', name: 'Wireless Bluetooth Headphones Pro', sales: 132, revenue: 32998.68 },
  { id: '5', name: 'Running Shoes Elite', sales: 98, revenue: 15679.02 },
  { id: '10', name: 'Stainless Steel Water Bottle', sales: 87, revenue: 2609.13 },
  { id: '2', name: 'Organic Cotton T-Shirt', sales: 76, revenue: 2659.24 },
];

export const recentActivity = [
  { id: '1', action: 'Order placed', description: 'Order #ORD-004 by David Wilson', user: 'System', time: '2 mins ago', type: 'order' },
  { id: '2', action: 'Product updated', description: 'Smart Watch Ultra price updated', user: 'Admin', time: '15 mins ago', type: 'product' },
  { id: '3', action: 'Customer registered', description: 'New customer Emily Chen signed up', user: 'System', time: '1 hour ago', type: 'customer' },
  { id: '4', action: 'Order shipped', description: 'Order #ORD-002 shipped via FedEx', user: 'Admin', time: '2 hours ago', type: 'order' },
  { id: '5', action: 'Review added', description: '5-star review for Wireless Headphones', user: 'John Smith', time: '3 hours ago', type: 'review' },
];
