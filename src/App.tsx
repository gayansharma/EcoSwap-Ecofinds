import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Product } from './types';

// Pages
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import MyListingsPage from './pages/MyListingsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import PurchasesPage from './pages/PurchasesPage';
import DashboardPage from './pages/DashboardPage';

// Components
import Header from './components/Header';

type PageType = 'home' | 'addProduct' | 'myListings' | 'productDetail' | 'cart' | 'purchases' | 'dashboard';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    setEditingProduct(null);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('productDetail');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setCurrentPage('addProduct');
  };

  if (!user) {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={handleNavigate} 
            onViewProduct={handleViewProduct}
          />
        );
      case 'addProduct':
        return (
          <AddProductPage 
            onBack={() => handleNavigate(editingProduct ? 'myListings' : 'home')}
            editProduct={editingProduct}
          />
        );
      case 'myListings':
        return (
          <MyListingsPage 
            onNavigate={handleNavigate}
            onEditProduct={handleEditProduct}
            onViewProduct={handleViewProduct}
          />
        );
      case 'productDetail':
        return selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct}
            onBack={() => handleNavigate('home')}
          />
        ) : (
          <HomePage 
            onNavigate={handleNavigate} 
            onViewProduct={handleViewProduct}
          />
        );
      case 'cart':
        return <CartPage onBack={() => handleNavigate('home')} />;
      case 'purchases':
        return <PurchasesPage onBack={() => handleNavigate('home')} />;
      case 'dashboard':
        return <DashboardPage onBack={() => handleNavigate('home')} />;
      default:
        return (
          <HomePage 
            onNavigate={handleNavigate} 
            onViewProduct={handleViewProduct}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;