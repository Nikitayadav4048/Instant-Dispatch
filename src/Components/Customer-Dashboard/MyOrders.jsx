import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaMapMarkerAlt, FaRupeeSign, FaTimes, FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/notificationSlice';
import OrderTracker from '../shared/OrderTracker';
import axios from 'axios';

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5003/api/bookings');
      const userOrders = response.data.filter(order => 
        order.customerUsername === user.email || order.customerEmail === user.email
      );
      setOrders(userOrders);
      setFilteredOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = orders;
    
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.parcelDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pickupAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.deliveryAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const handleCancelOrder = async (orderId) => {
    try {
      const orderToCancel = orders.find(order => order._id === orderId);
      await axios.put(`http://localhost:5003/api/bookings/${orderId}`, {
        status: 'Cancelled'
      });
      
      setOrders(orders.filter(order => order._id !== orderId));
      
      dispatch(addNotification({
        id: Date.now(),
        message: `Order #${orderToCancel?.name || orderId.slice(-6)} cancelled successfully`,
        timestamp: new Date().toLocaleString(),
        type: 'cancellation'
      }));
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center px-6 py-3 bg-white rounded-xl shadow-md border-2 border-orange-200 text-orange-600 hover:bg-orange-500 hover:text-white transition-all"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FaBox className="mr-3 text-orange-500" />
            My Orders ({filteredOrders.length})
          </h1>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order._id} className="bg-gray-50 rounded-xl p-4 border-l-4 border-orange-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">Order #{order.name || order._id?.slice(-6)}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
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
                  <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      Track Order
                    </button>
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center"
                      >
                        <FaTimes className="mr-2" />
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBox className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate('/book')}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Place Your First Order
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Tracking Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Track Order #{selectedOrder.name || selectedOrder._id?.slice(-6)}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <OrderTracker orderId={selectedOrder._id} currentStatus={selectedOrder.status} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
