import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, getTotalAmount, checkout, getItemCount } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    if (window.confirm('Proceed with checkout?')) {
      checkout();
      alert('Purchase successful! Check your purchase history.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">Add some products to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.product.title}</h3>
                  <p className="text-gray-600 text-sm">{item.product.category}</p>
                  <p className="text-emerald-600 font-bold">₹{item.product.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="p-1 hover:bg-gray-100 rounded-l-lg">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
                    <button className="p-1 hover:bg-gray-100 rounded-r-lg">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Items ({getItemCount()})</span>
              <span className="font-medium">₹{getTotalAmount().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-emerald-600">₹{getTotalAmount().toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Proceed to Checkout</span>
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm">
              Free shipping on all orders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;