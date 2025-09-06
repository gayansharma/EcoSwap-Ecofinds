import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const isOwnProduct = user?.id === product.sellerId;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 cursor-pointer" />
        </div>
        {product.category && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-emerald-600">₹{product.price.toLocaleString()}</p>
            <p className="text-xs text-gray-500">by {product.sellerName}</p>
          </div>
          
          {!isOwnProduct && (
            <button
              onClick={handleAddToCart}
              className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          Listed {new Date(product.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;