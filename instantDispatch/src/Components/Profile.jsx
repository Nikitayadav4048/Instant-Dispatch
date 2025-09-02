import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUserTag, FaEdit, FaSave, FaTimes, FaSignOutAlt, FaArrowLeft, FaBox, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addNotification } from './redux/notificationSlice';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: ''
  });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        username: parsedUser.username || parsedUser.name || '',
        email: parsedUser.email || '',
        role: parsedUser.role || ''
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

  const handleInputChange = (e) => {
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

  const handleCancelOrder = async (orderId) => {
    try {
      const orderToCancel = orders.find(order => order._id === orderId);
      await axios.put(`http://localhost:5000/api/bookings/${orderId}`, {
        status: 'Cancelled'
      });
      
      setOrders(orders.filter(order => order._id !== orderId));
      
      dispatch(addNotification({
        id: Date.now(),
        message: `Order #${orderToCancel?.name || orderId.slice(-6)} has been cancelled successfully`,
        timestamp: new Date().toLocaleString(),
        type: 'cancellation'
      }));
      
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center px-6 py-3 bg-white rounded-xl shadow-md border-2 border-orange-200 text-orange-600 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:border-orange-500 font-semibold transition-all duration-300 group transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-12 text-center">
            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
              <FaUser className="text-5xl text-orange-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{user.username}</h1>
            <p className="text-orange-100 capitalize text-xl">{user.role}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaUser className="mr-2 text-orange-500" />
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-300 bg-orange-50"
                  placeholder="Enter your username"
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-orange-200 transition-all duration-300">
                  <p className="text-gray-800 font-medium">{user.username}</p>
                </div>
              )}
            </div>

            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaEnvelope className="mr-2 text-orange-500" />
                Email
              </label>
              <div className="p-4 bg-gray-50 rounded-xl border-2 border-transparent">
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FaUserTag className="mr-2 text-orange-500" />
                Role
              </label>
              <div className="p-4 bg-gray-50 rounded-xl border-2 border-transparent">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaBox className="mr-3 text-orange-500" />
              My Orders ({orders.length})
            </h2>
            
            {loadingOrders ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading orders...</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {orders.map((order, index) => (
                  <div key={order._id || index} className="bg-gray-50 rounded-xl p-4 border-l-4 border-orange-500">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">Order #{order.name || order._id?.slice(-6)}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-orange-500" />
                        <span><strong>From:</strong> {order.pickupAddress}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                        <span><strong>To:</strong> {order.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center">
                        <FaBox className="mr-2 text-gray-500" />
                        <span><strong>Item:</strong> {order.parcelDescription}</span>
                      </div>
                      <div className="flex items-center">
                        <FaRupeeSign className="mr-2 text-green-500" />
                        <span><strong>Price:</strong> ₹{order.price}</span>
                      </div>
                    </div>
                    {order.status === 'Pending' && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center"
                        >
                          <FaTimes className="mr-2" />
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaBox className="mx-auto text-4xl mb-4 text-gray-300" />
                <p>No orders found</p>
                <p className="text-sm">Your booking history will appear here</p>
              </div>
            )}
          </div>

          <div className="mt-10 space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-green-400 text-white py-4 px-8 rounded-xl font-semibold hover:from-green-600 hover:to-green-500 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center text-lg"
                >
                  <FaSave className="mr-3" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gradient-to-r from-gray-500 to-gray-400 text-white py-4 px-8 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-500 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center text-lg"
                >
                  <FaTimes className="mr-3" />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-4 px-8 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center text-lg"
              >
                <FaEdit className="mr-3" />
                Edit Profile
              </button>
            )}

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-red-400 text-white py-4 px-8 rounded-xl font-semibold hover:from-red-600 hover:to-red-500 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center text-lg"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;