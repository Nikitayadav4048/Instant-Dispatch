import React, { useState, useEffect } from 'react';
import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdEdit, MdSave, MdCancel, MdArrowBack, MdDeliveryDining, MdHistory, MdStar } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const CustomerProfile = () => {
  const navigate = useNavigate();
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      username: savedUser.username || 'Customer',
      email: savedUser.email || auth0User?.email || '',
      phone: savedUser.phone || '+91 9876543210',
      address: savedUser.address || 'Main Market, Khategaon, MP',
      joinDate: savedUser.joinDate || '2024-01-15'
    };
  });

  // Update user data when Auth0 user is available (only for email if not set)
  useEffect(() => {
    if (auth0User && auth0User.email && !user.email) {
      setUser(prev => ({
        ...prev,
        email: auth0User.email
      }));
    }
  }, [auth0User, user.email]);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const stats = {
    totalOrders: orders?.length || 24,
    completedOrders: orders?.filter(o => o.status === 'Delivered')?.length || 22,
    totalSpent: orders?.filter(o => o.status === 'Delivered')?.reduce((sum, o) => sum + (o.price || 0), 0) || 3450
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(user);
  };

  const handleSave = async () => {
    try {
      setUser(editData);
      localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user') || '{}'), ...editData }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Modern Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
              >
                <MdArrowBack size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Customer Profile
                </h1>
                <p className="text-gray-600">Manage your account and view activity</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
              >
                <MdEdit size={20} />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar Section */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <MdStar className="text-white" size={20} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.username}</h2>
              <p className="text-purple-600 font-medium mb-4 flex items-center justify-center lg:justify-start gap-2">
                <MdStar className="text-yellow-500" />
                Premium Customer
              </p>
              <div className="text-sm text-gray-500">
                Member since {new Date(user.joinDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long'
                })}
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 w-full">
              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <MdPerson className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="username"
                          value={editData.username}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-all"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <MdPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-all"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <div className="relative">
                        <MdLocationOn className="absolute left-4 top-4 text-gray-400" size={20} />
                        <textarea
                          name="address"
                          value={editData.address}
                          onChange={handleChange}
                          rows="3"
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-all resize-none"
                          placeholder="Enter your address"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg"
                    >
                      <MdSave size={20} />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all font-semibold shadow-lg"
                    >
                      <MdCancel size={20} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                    <div className="flex items-center mb-3">
                      <MdEmail className="text-blue-600 mr-3" size={24} />
                      <span className="font-semibold text-gray-700">Email</span>
                    </div>
                    <p className="text-gray-900 font-medium text-lg">{user.email}</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                    <div className="flex items-center mb-3">
                      <MdPhone className="text-green-600 mr-3" size={24} />
                      <span className="font-semibold text-gray-700">Phone</span>
                    </div>
                    <p className="text-gray-900 font-medium text-lg">{user.phone}</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 md:col-span-2">
                    <div className="flex items-center mb-3">
                      <MdLocationOn className="text-purple-600 mr-3" size={24} />
                      <span className="font-semibold text-gray-700">Address</span>
                    </div>
                    <p className="text-gray-900 font-medium text-lg">{user.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-blue-500">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdDeliveryDining className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {ordersLoading ? '...' : stats.totalOrders}
            </h3>
            <p className="text-gray-600 font-semibold">Total Orders</p>
            {!ordersLoading && <div className="text-xs text-blue-600 mt-2 font-medium">Live Data</div>}
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-green-500">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdStar className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {ordersLoading ? '...' : stats.completedOrders}
            </h3>
            <p className="text-gray-600 font-semibold">Completed</p>
            {!ordersLoading && <div className="text-xs text-green-600 mt-2 font-medium">Live Data</div>}
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-orange-500">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 text-2xl font-bold">₹</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {ordersLoading ? '...' : `₹${stats.totalSpent}`}
            </h3>
            <p className="text-gray-600 font-semibold">Total Spent</p>
            {!ordersLoading && <div className="text-xs text-orange-600 mt-2 font-medium">Live Data</div>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => navigate('/book')}
            className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-xl"
          >
            <MdDeliveryDining size={28} />
            <span className="font-bold text-lg">New Order</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/notifications'}
            className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl"
          >
            <MdEmail size={28} />
            <span className="font-bold text-lg">Notifications</span>
          </button>
          
          <button 
            onClick={() => navigate('/my-orders')}
            className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
          >
            <MdHistory size={28} />
            <span className="font-bold text-lg">Order History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
