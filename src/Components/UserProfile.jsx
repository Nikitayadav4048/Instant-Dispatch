import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes, FaSignOutAlt, FaBox, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    phone: '',
    address: ''
  });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        username: parsedUser.username || '',
        email: parsedUser.email || '',
        role: parsedUser.role || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || ''
      });
      fetchOrders(parsedUser.email);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchOrders = async (email) => {
    setLoadingOrders(true);
    try {
      const response = await axios.get(`http://localhost:5002/api/bookings`);
      const allBookings = response.data || [];
      
      const userOrders = allBookings.filter(booking => 
        booking.customerUsername === email || 
        booking.customerEmail === email
      );
      
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCancelOrder = (order) => {
    setOrderToCancel(order);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async () => {
    try {
      await axios.put(`http://localhost:5002/api/bookings/${orderToCancel._id}`, {
        status: 'Cancelled'
      });
      fetchOrders(user.email);
      setShowCancelModal(false);
      setOrderToCancel(null);
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-500 text-white';
      case 'Out for Delivery': return 'bg-blue-500 text-white';
      case 'Pending': return 'bg-yellow-500 text-white';
      case 'Cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const completedOrders = orders.filter(o => o.status === 'Delivered').length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.price || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-lg border-b-4 border-orange-500 mb-6 rounded-lg">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate('/')}
                className="inline-flex items-center px-3 py-2 border border-orange-300 text-sm font-medium rounded-md text-orange-700 bg-orange-50 hover:bg-orange-100"
              >
                <FaArrowLeft className="mr-2 h-3 w-3" />
                Back to Home
              </button>
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
                <p className="text-gray-600 text-sm">Manage your profile information and preferences</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-lg border border-orange-200">
              <div className="px-6 py-4 border-b border-orange-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-lg" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{user.username}</h3>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Orders</span>
                    <span className="text-sm font-medium">{orders.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="text-sm font-medium">{completedOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Spent</span>
                    <span className="text-sm font-medium">₹{totalSpent}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow-lg rounded-lg border border-orange-200">
              <div className="px-6 py-4 border-b border-orange-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                  {!isEditing && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-3 py-1.5 border border-orange-300 text-sm font-medium rounded-md text-orange-700 bg-orange-50 hover:bg-orange-100"
                    >
                      <FaEdit className="mr-1.5 h-3 w-3" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
              
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 py-2">{user.username}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 py-2">{user.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 py-2">{user.phone || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <p className="text-sm text-gray-900 py-2 capitalize">{user.role}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 py-2">{user.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                
                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-3">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-4 py-2 bg-orange-600 text-sm font-medium rounded-md text-white hover:bg-orange-700"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white shadow-lg rounded-lg border border-orange-200 mt-6">
              <div className="px-6 py-4 border-b border-orange-100 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg">
                <h2 className="text-lg font-medium text-white flex items-center">
                  <FaBox className="mr-2" />
                  Order History
                </h2>
              </div>
              
              <div className="px-6 py-4">
                {loadingOrders ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">Loading orders...</p>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.slice(0, 10).map((order, index) => (
                          <tr key={order._id || index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              #{order.name || order._id?.slice(-6)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {order.parcelDescription}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {order.status || 'Pending'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              ₹{order.price}
                            </td>
                            <td className="px-4 py-3">
                              {(order.status === 'Pending' || order.status === 'Confirmed') && (
                                <button
                                  onClick={() => handleCancelOrder(order)}
                                  className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                                >
                                  <FaTimes className="mr-1 h-3 w-3" />
                                  Cancel
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {orders.length > 10 && (
                      <div className="px-4 py-3 bg-gray-50 text-center">
                        <p className="text-sm text-gray-600">Showing 10 of {orders.length} orders</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaBox className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white shadow-lg rounded-lg border border-orange-200 mt-6">
              <div className="px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h2>
                <button 
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-sm font-medium rounded-md text-white hover:from-red-600 hover:to-red-700 shadow-lg"
                >
                  <FaSignOutAlt className="mr-2 h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && orderToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white rounded-t-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <FaTimes className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Cancel Order</h3>
                  <p className="text-red-100 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Order Details</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">#{orderToCancel.name || orderToCancel._id?.slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium">{orderToCancel.parcelDescription}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-orange-600">₹{orderToCancel.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-yellow-800 font-medium text-sm">Are you sure you want to cancel this order?</p>
                    <p className="text-yellow-700 text-sm mt-1">This action will permanently cancel your order and cannot be reversed.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setOrderToCancel(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Keep Order
                </button>
                <button
                  onClick={confirmCancelOrder}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 font-medium transition-colors shadow-lg"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;