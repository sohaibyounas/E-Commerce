export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastRestocked: string;
  warehouse: string;
}

export const inventoryItems: InventoryItem[] = [
  { id: '1', productId: '1', productName: 'Wireless Bluetooth Headphones Pro', sku: 'WBH-PRO-001', currentStock: 145, minimumStock: 20, maximumStock: 200, status: 'in_stock', lastRestocked: '2024-06-15', warehouse: 'Main' },
  { id: '2', productId: '2', productName: 'Organic Cotton T-Shirt', sku: 'OCT-TSH-002', currentStock: 523, minimumStock: 100, maximumStock: 600, status: 'in_stock', lastRestocked: '2024-06-10', warehouse: 'Main' },
  { id: '3', productId: '3', productName: 'Smart Watch Ultra', sku: 'SWU-003', currentStock: 78, minimumStock: 50, maximumStock: 150, status: 'in_stock', lastRestocked: '2024-06-18', warehouse: 'Main' },
  { id: '4', productId: '4', productName: 'Leather Messenger Bag', sku: 'LMB-004', currentStock: 34, minimumStock: 50, maximumStock: 100, status: 'low_stock', lastRestocked: '2024-05-20', warehouse: 'Main' },
  { id: '5', productId: '5', productName: 'Running Shoes Elite', sku: 'RSE-005', currentStock: 267, minimumStock: 50, maximumStock: 300, status: 'in_stock', lastRestocked: '2024-06-12', warehouse: 'Main' },
  { id: '6', productId: '6', productName: 'Ceramic Coffee Mug Set', sku: 'CMS-006', currentStock: 189, minimumStock: 40, maximumStock: 200, status: 'in_stock', lastRestocked: '2024-06-05', warehouse: 'West' },
  { id: '7', productId: '7', productName: 'Yoga Mat Premium', sku: 'YMP-007', currentStock: 412, minimumStock: 100, maximumStock: 500, status: 'in_stock', lastRestocked: '2024-06-01', warehouse: 'West' },
  { id: '8', productId: '8', productName: 'Desk Lamp Modern', sku: 'DLM-008', currentStock: 156, minimumStock: 30, maximumStock: 150, status: 'in_stock', lastRestocked: '2024-05-28', warehouse: 'East' },
  { id: '9', productId: '9', productName: 'Portable Power Bank 20000mAh', sku: 'PPB-009', currentStock: 0, minimumStock: 50, maximumStock: 200, status: 'out_of_stock', lastRestocked: '2024-05-15', warehouse: 'Main' },
  { id: '10', productId: '10', productName: 'Stainless Steel Water Bottle', sku: 'SSWB-010', currentStock: 834, minimumStock: 100, maximumStock: 800, status: 'in_stock', lastRestocked: '2024-06-08', warehouse: 'West' },
];

export const lowStockAlerts = inventoryItems.filter((item) => item.status === 'low_stock' || item.status === 'out_of_stock');
