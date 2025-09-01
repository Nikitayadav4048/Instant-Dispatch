import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaMapMarkerAlt, FaRupeeSign, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/notificationSlice';
import axios from 'axios';

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      const userOrders = response.data.filter(order => 
        order.customerUsername === user.email || order.customerEmail === user.email
      );
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
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
            My Orders ({orders.length})
          </h1>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
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
    </div>
  );
};

export default MyOrders;