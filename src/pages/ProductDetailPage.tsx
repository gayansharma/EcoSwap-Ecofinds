import React from 'react';
import { ArrowLeft, ShoppingCart, MapPin, Calendar, Tag, User } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const { user } = useAuth();
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    if (user && product.sellerId !== user.id) {
      addToCart(product);
    }
  };

  const canAddToCart = user && product.sellerId !== user.id && product.status === 'active';
  const isOwner = user && product.sellerId === user.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to listings
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-80 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-emerald-600">
                    {product.category}
                  </span>
                </div>
                {product.status === 'sold' && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                      SOLD
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8">
              <div className="flex flex-col h-full">
                {/* Title and Price */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl font-bold text-emerald-600">${product.price}</div>
                    {product.status === 'active' && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Available
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Tag className="h-5 w-5 mr-3 text-gray-400" />
                      <span className="font-medium">Category:</span>
                      <span className="ml-2">{product.category}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                      <span className="font-medium">Listed:</span>
                      <span className="ml-2">{new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <User className="h-5 w-5 mr-3 text-gray-400" />
                      <span className="font-medium">Seller:</span>
                      <span className="ml-2">{product.sellerName}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t pt-6">
                  {isOwner ? (
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <p className="text-blue-800 font-medium mb-2">This is your listing</p>
                      <p className="text-blue-600 text-sm">
                        You can manage this listing from the "My Listings" page
                      </p>
                    </div>
                  ) : canAddToCart ? (
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                  ) : product.status === 'sold' ? (
                    <div className="w-full bg-gray-100 text-gray-500 font-semibold py-4 px-6 rounded-xl text-center">
                      This item has been sold
                    </div>
                  ) : (
                    <div className="w-full bg-gray-100 text-gray-500 font-semibold py-4 px-6 rounded-xl text-center">
                      Please log in to purchase
                    </div>
                  )}

                  {/* Seller Contact Info */}
                  {!isOwner && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-2">Seller Information</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{product.sellerName}</p>
                          <p className="text-sm text-gray-600">Member since {new Date(product.createdAt).getFullYear()}</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Contact Seller
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items Placeholder */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="text-center text-gray-500 py-8 bg-white rounded-xl">
            Related items would appear here
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;