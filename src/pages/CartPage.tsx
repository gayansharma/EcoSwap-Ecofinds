import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CartPageProps {
  onBack: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onBack }) => {
  const { cart, removeFromCart, purchaseItems } = useApp();

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handlePurchase = () => {
    if (cart.length > 0) {
      purchaseItems();
      alert('Purchase completed successfully!');
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
          
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-emerald-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Browse our marketplace to find amazing second-hand items
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cart Items ({cart.length})
              </h2>
              
              {cart.map((item) => (
                <div key={item.product.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="sm:w-32 sm:h-32 w-full h-48 mb-4 sm:mb-0 sm:mr-6">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                          {item.product.title}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors ml-4"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {item.product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-emerald-600 font-bold text-xl">
                          ${item.product.price}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-600">Qty: {item.quantity}</span>
                          <div className="text-lg font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors mb-4"
                >
                  Proceed to Checkout
                </button>

                <div className="text-center text-sm text-gray-600">
                  <p>🔒 Secure checkout</p>
                  <p className="mt-1">💚 Supporting sustainable shopping</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;