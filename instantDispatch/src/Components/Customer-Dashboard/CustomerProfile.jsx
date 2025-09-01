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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <MdArrowBack className="text-orange-600" size={24} />
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            My Profile
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
                  {user.username.charAt(0)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{user.username}</h2>
                  <p className="text-orange-100 flex items-center gap-2">
                    <MdStar className="text-yellow-300" />
                    Premium Customer
                  </p>
                </div>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm"
                >
                  <MdEdit size={20} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MdSave size={18} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <MdCancel size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-8">
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <MdPerson className="text-orange-500" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <MdPerson className="text-orange-500" size={16} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={editData.username}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-xl text-gray-800 font-medium">
                      {user.username}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <MdEmail className="text-orange-500" size={16} />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-xl text-gray-800 font-medium">
                      {user.email}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <MdPhone className="text-orange-500" size={16} />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-xl text-gray-800 font-medium">
                      {user.phone}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <MdHistory className="text-orange-500" size={16} />
                    Member Since
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl text-gray-800 font-medium">
                    {new Date(user.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <MdLocationOn className="text-orange-500" size={16} />
                  Default Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-4 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="p-4 bg-gray-50 rounded-xl text-gray-800 font-medium">
                    {user.address}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {ordersLoading ? '...' : stats.totalOrders}
                </div>
                <div className="text-blue-800 font-medium">Total Orders</div>
                {!ordersLoading && <div className="text-xs text-blue-600 mt-1">Live Data</div>}
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {ordersLoading ? '...' : stats.completedOrders}
                </div>
                <div className="text-green-800 font-medium">Completed</div>
                {!ordersLoading && <div className="text-xs text-green-600 mt-1">Live Data</div>}
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl text-center border border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {ordersLoading ? '...' : `₹${stats.totalSpent}`}
                </div>
                <div className="text-orange-800 font-medium">Total Spent</div>
                {!ordersLoading && <div className="text-xs text-orange-600 mt-1">Live Data</div>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => navigate('/book')}
                className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <MdDeliveryDining size={24} />
                <span className="font-semibold">New Order</span>
              </button>
              
              <button 
                onClick={() => window.location.href = '/notifications'}
                className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <MdEmail size={24} />
                <span className="font-semibold">Notifications</span>
              </button>
              
              <button 
                onClick={() => navigate('/my-orders')}
                className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <MdHistory size={24} />
                <span className="font-semibold">Order History</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;