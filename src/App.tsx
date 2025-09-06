import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import MyListings from './pages/MyListings';
import Cart from './pages/Cart';
import UserDashboard from './pages/UserDashboard';
import Purchases from './pages/Purchases';
import { Product } from './types';

type ViewType = 'home' | 'product-detail' | 'add-product' | 'my-listings' | 'cart' | 'dashboard' | 'purchases';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    if (view !== 'product-detail') {
      setSelectedProduct(null);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleProductAdded = () => {
    // Refresh the home page or listings
    setCurrentView('my-listings');
  };

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home
            searchQuery={searchQuery}
            onProductSelect={handleProductSelect}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
          />
        ) : null;
      case 'add-product':
        return (
          <AddProduct
            onBack={() => setCurrentView('home')}
            onProductAdded={handleProductAdded}
          />
        );
      case 'my-listings':
        return (
          <MyListings
            onAddProduct={() => setCurrentView('add-product')}
            onEditProduct={(product) => {
              // For now, just redirect to add product
              setCurrentView('add-product');
            }}
            onProductSelect={handleProductSelect}
          />
        );
      case 'cart':
        return <Cart />;
      case 'dashboard':
        return <UserDashboard />;
      case 'purchases':
        return <Purchases />;
      default:
        return (
          <Home
            searchQuery={searchQuery}
            onProductSelect={handleProductSelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentView={currentView}
        onViewChange={handleViewChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;