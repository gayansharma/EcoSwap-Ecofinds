import React from 'react';
import { Edit, Trash2, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showActions = false, 
  onEdit, 
  onDelete, 
  onViewDetails 
}) => {
  const { user } = useAuth();
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user && product.sellerId !== user.id) {
      addToCart(product);
    }
  };

  const canAddToCart = user && product.sellerId !== user.id && product.status === 'active';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-emerald-600">
          {product.category}
        </div>
        {product.status === 'sold' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">SOLD</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
          <span className="text-sm text-gray-500">by {product.sellerName}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {showActions && (
              <>
                <button
                  onClick={() => onEdit?.(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete?.(product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails?.(product)}
              className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </button>
            
            {canAddToCart && (
              <button
                onClick={handleAddToCart}
                className="flex items-center px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;