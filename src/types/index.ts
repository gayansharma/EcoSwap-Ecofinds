export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  address: string;
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Purchase {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  purchaseDate: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Furniture',
  'Vehicles',
  'Jewelry',
  'Toys',
  'Others'
] as const;

export type Category = typeof CATEGORIES[number];