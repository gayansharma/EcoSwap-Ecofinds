import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppContextType, Product, CartItem, Purchase } from '../types';
import { mockProducts } from '../data/mockData';
import { useAuth } from './AuthContext';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`ecofinds_cart_${user.id}`);
      const savedPurchases = localStorage.getItem(`ecofinds_purchases_${user.id}`);
      
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      if (savedPurchases) {
        setPurchases(JSON.parse(savedPurchases));
      }
    } else {
      setCart([]);
      setPurchases([]);
    }
  }, [user]);

  const addToCart = (product: Product) => {
    if (!user) return;
    
    const existingItem = cart.find(item => item.product.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem(`ecofinds_cart_${user.id}`, JSON.stringify(newCart));
  };

  const removeFromCart = (productId: string) => {
    if (!user) return;
    
    const newCart = cart.filter(item => item.product.id !== productId);
    setCart(newCart);
    localStorage.setItem(`ecofinds_cart_${user.id}`, JSON.stringify(newCart));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'createdAt'>) => {
    if (!user) return;
    
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      sellerId: user.id,
      sellerName: user.username,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const purchaseItems = () => {
    if (!user || cart.length === 0) return;
    
    const newPurchases: Purchase[] = cart.map(item => ({
      id: Date.now().toString() + Math.random(),
      product: item.product,
      purchaseDate: new Date().toISOString().split('T')[0],
      price: item.product.price * item.quantity,
      status: 'completed'
    }));
    
    const updatedPurchases = [...purchases, ...newPurchases];
    setPurchases(updatedPurchases);
    localStorage.setItem(`ecofinds_purchases_${user.id}`, JSON.stringify(updatedPurchases));
    
    // Clear cart
    setCart([]);
    localStorage.setItem(`ecofinds_cart_${user.id}`, JSON.stringify([]));
  };

  return (
    <AppContext.Provider value={{
      products,
      cart,
      purchases,
      addToCart,
      removeFromCart,
      addProduct,
      updateProduct,
      deleteProduct,
      purchaseItems
    }}>
      {children}
    </AppContext.Provider>
  );
};