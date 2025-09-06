import React from 'react';
import { Package, Calendar, DollarSign, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PurchasesPageProps {
  onBack: () => void;
}

const PurchasesPage: React.FC<PurchasesPageProps> = ({ onBack }) => {
  const { purchases } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">Completed</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">Pending</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">Cancelled</span>;
      default:
        return null;
    }
  };

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to home
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-emerald-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
                <p className="text-gray-600">Track your sustainable shopping journey</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          {purchases.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{purchases.length}</div>
                <div className="text-sm text-gray-600">Total Purchases</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-emerald-600">${totalSpent.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {purchases.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed Orders</div>
              </div>
            </div>
          )}
        </div>

        {/* Purchase List */}
        {purchases.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No purchases yet</h2>
            <p className="text-gray-600 mb-6">
              Start shopping to see your purchase history here
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Orders ({purchases.length})
            </h2>
            
            {purchases.map((purchase) => (
              <div key={purchase.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center">
                  {/* Product Image */}
                  <div className="lg:w-24 lg:h-24 w-full h-48 mb-4 lg:mb-0 lg:mr-6">
                    <img
                      src={purchase.product.imageUrl}
                      alt={purchase.product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 lg:mr-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                        {purchase.product.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(purchase.status)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {purchase.product.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600">
                      <div className="flex items-center mb-1 sm:mb-0">
                        <Calendar className="h-4 w-4 mr-2" />
                        Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {purchase.product.category}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-start lg:items-end mt-4 lg:mt-0">
                    <div className="text-2xl font-bold text-emerald-600 mb-2">
                      ${purchase.price.toFixed(2)}
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                        Buy Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Environmental Impact */}
        {purchases.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Environmental Impact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{purchases.length}</div>
                <div className="text-sm text-gray-600">Items Saved from Waste</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">~{(purchases.length * 2.5).toFixed(1)} kg</div>
                <div className="text-sm text-gray-600">CO2 Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{purchases.length * 15}%</div>
                <div className="text-sm text-gray-600">Less Resource Use</div>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-4">
              🌱 Thank you for choosing sustainable shopping!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasesPage;