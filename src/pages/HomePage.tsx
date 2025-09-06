import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Product } from '../types';
import { categories } from '../data/mockData';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onViewProduct: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onViewProduct }) => {
  const { products } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || 
                             product.category === selectedCategory;
      const isActive = product.status === 'active';
      
      return matchesSearch && matchesCategory && isActive;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Next <span className="text-yellow-300">Treasure</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Discover unique second-hand items while making sustainable choices that benefit our planet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('addProduct')}
                className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                List Your Item
              </button>
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Browse Items
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full lg:w-48 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills - Mobile */}
          <div className="flex flex-wrap gap-2 mt-4 lg:hidden">
            {categories.slice(0, 6).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <h2 id="products" className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'All Categories' ? 'All Items' : selectedCategory}
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or browse a different category
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
              }}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;