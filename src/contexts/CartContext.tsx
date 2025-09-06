import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Purchase } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  getItemCount: () => number;
  checkout: () => void;
  purchases: Purchase[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`evoswap_cart_${user.id}`);
      const savedPurchases = localStorage.getItem(`evoswap_purchases_${user.id}`);
      
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      if (savedPurchases) {
        setPurchases(JSON.parse(savedPurchases));
      }
    } else {
      setCartItems([]);
      setPurchases([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`evoswap_cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`evoswap_purchases_${user.id}`, JSON.stringify(purchases));
    }
  }, [purchases, user]);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCartItems(items =>
        items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId: product.id,
        product,
        quantity: 1,
        addedAt: new Date().toISOString(),
      };
      setCartItems(items => [...items, newItem]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(items => items.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const checkout = () => {
    if (cartItems.length === 0 || !user) return;

    const purchase: Purchase = {
      id: Date.now().toString(),
      userId: user.id,
      items: [...cartItems],
      totalAmount: getTotalAmount(),
      purchaseDate: new Date().toISOString(),
      status: 'completed',
    };

    setPurchases(prev => [purchase, ...prev]);
    clearCart();
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalAmount,
    getItemCount,
    checkout,
    purchases,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};