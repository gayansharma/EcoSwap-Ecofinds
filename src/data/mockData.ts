import { User, Product } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    username: 'john_eco',
    fullName: 'John Smith',
    phone: '+1-555-0123',
    location: 'San Francisco, CA',
    joinedDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    description: 'Beautiful vintage leather jacket in excellent condition. Perfect for casual wear.',
    category: 'Clothing',
    price: 85,
    imageUrl: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '2',
    sellerName: 'Sarah Wilson',
    createdAt: '2024-12-10',
    status: 'active'
  },
  {
    id: '2',
    title: 'MacBook Air 2020',
    description: 'MacBook Air in great condition, perfect for students and professionals.',
    category: 'Electronics',
    price: 650,
    imageUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '3',
    sellerName: 'Mike Johnson',
    createdAt: '2024-12-08',
    status: 'active'
  },
  {
    id: '3',
    title: 'Wooden Coffee Table',
    description: 'Handcrafted wooden coffee table with unique grain pattern.',
    category: 'Furniture',
    price: 150,
    imageUrl: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '4',
    sellerName: 'Emma Davis',
    createdAt: '2024-12-05',
    status: 'active'
  },
  {
    id: '4',
    title: 'Trek Mountain Bike',
    description: 'Well-maintained Trek mountain bike, perfect for trails and city riding.',
    category: 'Sports',
    price: 320,
    imageUrl: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '5',
    sellerName: 'Alex Chen',
    createdAt: '2024-12-03',
    status: 'active'
  },
  {
    id: '5',
    title: 'Classic Fiction Book Set',
    description: 'Collection of 15 classic fiction books in excellent condition.',
    category: 'Books',
    price: 45,
    imageUrl: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '6',
    sellerName: 'Lisa Parker',
    createdAt: '2024-12-01',
    status: 'active'
  },
  {
    id: '6',
    title: 'Ceramic Plant Pots Set',
    description: 'Beautiful set of ceramic plant pots in various sizes, perfect for indoor plants.',
    category: 'Home & Garden',
    price: 32,
    imageUrl: 'https://images.pexels.com/photos/1005711/pexels-photo-1005711.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '7',
    sellerName: 'David Rodriguez',
    createdAt: '2024-11-28',
    status: 'active'
  }
];

export const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Furniture',
  'Books',
  'Sports',
  'Home & Garden',
  'Toys',
  'Music',
  'Art'
];