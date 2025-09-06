export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone?: string;
  location?: string;
  joinedDate: string;
  avatar?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
  status: 'active' | 'sold' | 'inactive';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Purchase {
  id: string;
  product: Product;
  purchaseDate: string;
  price: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export interface AppContextType {
  products: Product[];
  cart: CartItem[];
  purchases: Purchase[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  purchaseItems: () => void;
}