import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';

interface MyListingsProps {
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onProductSelect: (product: Product) => void;
}

const MyListings: React.FC<MyListingsProps> = ({ 
  onAddProduct, 
  onEditProduct, 
  onProductSelect 
}) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadUserProducts();
  }, [user]);

  const loadUserProducts = () => {
    const allProducts = JSON.parse(localStorage.getItem('evoswap_products') || '[]');
    const userProducts = allProducts.filter((product: Product) => product.sellerId === user?.id);
    setProducts(userProducts);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const allProducts = JSON.parse(localStorage.getItem('evoswap_products') || '[]');
      const updatedProducts = allProducts.filter((product: Product) => product.id !== productId);
      localStorage.setItem('evoswap_products', JSON.stringify(updatedProducts));
      loadUserProducts();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
          <p className="text-gray-600 mt-2">Manage your products and track performance</p>
        </div>
        <button
          onClick={onAddProduct}
          className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Listings</h3>
          <p className="text-3xl font-bold text-emerald-600">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Value</h3>
          <p className="text-3xl font-bold text-blue-600">
            ₹{products.reduce((sum, product) => sum + product.price, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Active</h3>
          <p className="text-3xl font-bold text-green-600">{products.length}</p>
        </div>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products listed yet</h3>
          <p className="text-gray-500 mb-6">Start selling by adding your first product</p>
          <button
            onClick={onAddProduct}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard
                product={product}
                onClick={() => onProductSelect(product)}
              />
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProduct(product);
                  }}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product.id);
                  }}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;