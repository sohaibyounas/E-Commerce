export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'active' | 'inactive' | 'suspended';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  createdAt: string;
  address: { street: string; city: string; state: string; country: string; zip: string };
}

export const customers: Customer[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 (555) 123-4567', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100', status: 'active', totalOrders: 24, totalSpent: 4523.50, lastOrderDate: '2024-06-15', createdAt: '2023-08-10', address: { street: '123 Main St', city: 'New York', state: 'NY', country: 'USA', zip: '10001' } },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 (555) 234-5678', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100', status: 'active', totalOrders: 18, totalSpent: 3890.00, lastOrderDate: '2024-06-18', createdAt: '2023-09-15', address: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', country: 'USA', zip: '90001' } },
  { id: '3', name: 'Michael Brown', email: 'm.brown@email.com', phone: '+1 (555) 345-6789', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100', status: 'active', totalOrders: 56, totalSpent: 12450.75, lastOrderDate: '2024-06-20', createdAt: '2023-01-20', address: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', country: 'USA', zip: '60601' } },
  { id: '4', name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1 (555) 456-7890', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100', status: 'inactive', totalOrders: 8, totalSpent: 1560.25, lastOrderDate: '2024-03-10', createdAt: '2023-11-05', address: { street: '321 Elm St', city: 'Houston', state: 'TX', country: 'USA', zip: '77001' } },
  { id: '5', name: 'David Wilson', email: 'd.wilson@email.com', phone: '+1 (555) 567-8901', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=100', status: 'active', totalOrders: 32, totalSpent: 6780.00, lastOrderDate: '2024-06-19', createdAt: '2023-05-18', address: { street: '654 Maple Dr', city: 'Phoenix', state: 'AZ', country: 'USA', zip: '85001' } },
  { id: '6', name: 'Jessica Martinez', email: 'jess.m@email.com', phone: '+1 (555) 678-9012', avatar: 'https://images.pexels.com/photos/1494792/pexels-photo-1494792.jpeg?w=100', status: 'active', totalOrders: 15, totalSpent: 2340.50, lastOrderDate: '2024-06-17', createdAt: '2023-12-12', address: { street: '987 Cedar Ln', city: 'Philadelphia', state: 'PA', country: 'USA', zip: '19101' } },
  { id: '7', name: 'Chris Taylor', email: 'chris.t@email.com', phone: '+1 (555) 789-0123', avatar: 'https://images.pexels.com/photos/1500847/pexels-photo-1500847.jpeg?w=100', status: 'suspended', totalOrders: 5, totalSpent: 890.00, lastOrderDate: '2024-02-28', createdAt: '2024-01-15', address: { street: '159 Birch St', city: 'San Antonio', state: 'TX', country: 'USA', zip: '78201' } },
  { id: '8', name: 'Amanda White', email: 'amanda.w@email.com', phone: '+1 (555) 890-1234', avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?w=100', status: 'active', totalOrders: 42, totalSpent: 8920.30, lastOrderDate: '2024-06-21', createdAt: '2023-03-25', address: { street: '753 Walnut Ave', city: 'San Diego', state: 'CA', country: 'USA', zip: '92101' } },
];

export const getCustomerById = (id: string) => customers.find((c) => c.id === id);
