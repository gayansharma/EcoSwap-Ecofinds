import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

interface MyListingsPageProps {
  onNavigate: (page: string) => void;
  onEditProduct: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const MyListingsPage: React.FC<MyListingsPageProps> = ({ 
  onNavigate, 
  onEditProduct, 
  onViewProduct 
}) => {
  const { user } = useAuth();
  const { products, deleteProduct } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const myProducts = products.filter(product => product.sellerId === user?.id);

  const filteredProducts = myProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteProduct(productId);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">Active</span>;
      case 'sold':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">Sold</span>;
      case 'inactive':
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">Inactive</span>;
      default:
        return null;
    }
  };

  const stats = {
    total: myProducts.length,
    active: myProducts.filter(p => p.status === 'active').length,
    sold: myProducts.filter(p => p.status === 'sold').length,
    inactive: myProducts.filter(p => p.status === 'inactive').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
              <p className="mt-2 text-gray-600">Manage your product listings</p>
            </div>
            <button
              onClick={() => onNavigate('addProduct')}
              className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Listing
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Listings</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-red-600">{stats.sold}</div>
              <div className="text-sm text-gray-600">Sold</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
              <div className="text-sm text-gray-600">Inactive</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your listings..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="sold">Sold</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 left-2 z-10">
                  {getStatusBadge(product.status)}
                </div>
                <ProductCard
                  product={product}
                  showActions={true}
                  onEdit={onEditProduct}
                  onDelete={handleDelete}
                  onViewDetails={onViewProduct}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Plus className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {myProducts.length === 0 ? 'No listings yet' : 'No listings match your search'}
            </h3>
            <p className="text-gray-600 mb-6">
              {myProducts.length === 0 
                ? 'Start selling by creating your first listing'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            {myProducts.length === 0 && (
              <button
                onClick={() => onNavigate('addProduct')}
                className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
              >
                Create Your First Listing
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingsPage;