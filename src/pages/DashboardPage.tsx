import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DashboardPageProps {
  onBack: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onBack }) => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    avatar: user?.avatar || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      avatar: user?.avatar || ''
    });
    setIsEditing(false);
  };

  const suggestedAvatars = [
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1674666/pexels-photo-1674666.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  if (!user) return null;

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
            Back to home
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="h-8 w-8 text-emerald-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Profile Dashboard</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
            </div>
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
              >
                <Edit3 className="h-5 w-5 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-12">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={formData.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isEditing ? 'Editing Profile' : (formData.fullName || formData.username)}
                </h2>
                <p className="text-emerald-100">@{formData.username}</p>
                <p className="text-emerald-100 text-sm mt-1">
                  Member since {new Date(user.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Avatar Selection */}
              {isEditing && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Picture
                  </label>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {suggestedAvatars.map((avatar, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                        className={`relative ${
                          formData.avatar === avatar ? 'ring-2 ring-emerald-500' : ''
                        }`}
                      >
                        <img
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className="w-16 h-16 rounded-full object-cover hover:opacity-75 transition-opacity"
                        />
                      </button>
                    ))}
                  </div>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Or enter custom avatar URL"
                  />
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    {formData.username || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    {formData.fullName || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    {formData.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    {formData.phone || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="City, State/Country"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    {formData.location || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Member Since */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Member Since
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  {new Date(user.joinedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 mt-8 pt-6 border-t">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  <X className="h-5 w-5 mr-2 inline" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
                >
                  <Save className="h-5 w-5 mr-2 inline" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-2">0</div>
            <div className="text-gray-600">Items Listed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600">Items Purchased</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">$0</div>
            <div className="text-gray-600">Total Spent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;