import React from 'react';
import { ShoppingCart, User, LogOut, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const { cart } = useApp();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EcoFinds</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => onNavigate('myListings')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'myListings' 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => onNavigate('purchases')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'purchases' 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Purchases
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <User className="h-6 w-6" />
            </button>

            <button
              onClick={logout}
              className="p-2 text-gray-700 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="h-6 w-6" />
            </button>

            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{user?.username}</span>
              <span className="text-xs text-gray-500">Welcome back!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              currentPage === 'home' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-gray-600 hover:text-emerald-600'
            }`}
          >
            Browse
          </button>
          <button
            onClick={() => onNavigate('myListings')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              currentPage === 'myListings' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-gray-600 hover:text-emerald-600'
            }`}
          >
            My Listings
          </button>
          <button
            onClick={() => onNavigate('purchases')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              currentPage === 'purchases' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-gray-600 hover:text-emerald-600'
            }`}
          >
            Purchases
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;