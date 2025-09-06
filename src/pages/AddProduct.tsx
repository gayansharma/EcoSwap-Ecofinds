import React, { useState } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { CATEGORIES } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface AddProductProps {
  onBack: () => void;
  onProductAdded: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onBack, onProductAdded }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Predefined image options for demo
  const imageOptions = [
    'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/1409226/pexels-photo-1409226.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/8149166/pexels-photo-8149166.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/1661915/pexels-photo-1661915.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/8729493/pexels-photo-8729493.jpeg?auto=compress&cs=tinysrgb&w=500',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.image) {
      newErrors.image = 'Image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Get existing products
      const existingProducts = JSON.parse(localStorage.getItem('evoswap_products') || '[]');
      
      // Create new product
      const newProduct = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        price: Number(formData.price),
        image: formData.image,
        sellerId: user!.id,
        sellerName: user!.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to localStorage
      const updatedProducts = [newProduct, ...existingProducts];
      localStorage.setItem('evoswap_products', JSON.stringify(updatedProducts));

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        image: ''
      });

      onProductAdded();
      onBack();
    } catch (error) {
      console.error('Error adding product:', error);
    }
    setLoading(false);
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData({ ...formData, image: imageUrl });
    if (errors.image) {
      setErrors({ ...errors, image: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-emerald-600 hover:text-emerald-700 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <div></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Product Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter a descriptive title for your product"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter price in rupees"
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detailed description of your product..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image *
            </label>
            <p className="text-sm text-gray-500 mb-4">Select an image from the options below:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {imageOptions.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    formData.image === imageUrl 
                      ? 'border-emerald-500 ring-2 ring-emerald-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Option ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  {formData.image === imageUrl && (
                    <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
                      <X className="w-3 h-3 text-white rotate-45" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {formData.image && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Selected image:</p>
                <img
                  src={formData.image}
                  alt="Selected"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-emerald-500"
                />
              </div>
            )}

            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50 flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>{loading ? 'Adding Product...' : 'Add Product'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;