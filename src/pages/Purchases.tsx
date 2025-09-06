import React from 'react';
import { Calendar, Package, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Purchases: React.FC = () => {
  const { purchases } = useCart();

  if (purchases.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Purchase History</h1>
        
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No purchases yet</h3>
          <p className="text-gray-500">Your purchase history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Purchase History</h1>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-emerald-600">{purchases.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Spent</h3>
          <p className="text-3xl font-bold text-blue-600">
            ₹{purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Items Purchased</h3>
          <p className="text-3xl font-bold text-purple-600">
            {purchases.reduce((sum, purchase) => sum + purchase.items.length, 0)}
          </p>
        </div>
      </div>

      {/* Purchase List */}
      <div className="space-y-6">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-500 rounded-full p-2">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{purchase.id.slice(-8).toUpperCase()}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-1" />
                      ₹{purchase.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  purchase.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : purchase.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {purchase.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-t pt-3">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.product.title}</h4>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    <p className="text-emerald-600 font-semibold">₹{item.product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchases;