import React from 'react';
import { ArrowLeft, ShoppingCart, User, Calendar, Tag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const isOwnProduct = user?.id === product.sellerId;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
            <p className="text-4xl font-bold text-emerald-600 mb-4">
              ₹{product.price.toLocaleString()}
            </p>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-500 rounded-full p-2">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Sold by</p>
                <p className="text-emerald-600">{product.sellerName}</p>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Product Details */}
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Tag className="w-5 h-5 mr-3" />
              <span>Category: {product.category}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3" />
              <span>Listed on {new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {!isOwnProduct ? (
              <>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-emerald-500 text-white py-4 rounded-lg hover:bg-emerald-600 transition-colors font-medium text-lg flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="w-full bg-gray-100 text-gray-800 py-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-lg">
                  Contact Seller
                </button>
              </>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">This is your listing</p>
                <p className="text-blue-600 text-sm">You cannot purchase your own product</p>
              </div>
            )}
          </div>

          {/* Safety Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Safety Tips</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Meet in a public place for exchange</li>
              <li>• Inspect the item before payment</li>
              <li>• Use secure payment methods</li>
              <li>• Report suspicious activity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;