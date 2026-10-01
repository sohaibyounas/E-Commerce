export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and accessories', image: 'https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?w=400', productCount: 4, status: 'active', createdAt: '2024-01-01' },
  { id: '2', name: 'Clothing', description: 'Apparel and fashion items', image: 'https://images.pexels.com/photos/996319/pexels-photo-996319.jpeg?w=400', productCount: 2, status: 'active', createdAt: '2024-01-01' },
  { id: '3', name: 'Accessories', description: 'Fashion accessories and bags', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=400', productCount: 1, status: 'active', createdAt: '2024-01-05' },
  { id: '4', name: 'Sports', description: 'Sports equipment and activewear', image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?w=400', productCount: 3, status: 'active', createdAt: '2024-01-10' },
  { id: '5', name: 'Home & Kitchen', description: 'Home decor and kitchen essentials', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?w=400', productCount: 2, status: 'active', createdAt: '2024-01-15' },
];

export const getCategoryById = (id: string) => categories.find((c) => c.id === id);
