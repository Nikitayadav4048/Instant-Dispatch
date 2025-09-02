import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../redux/ordersSlice';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch');
      const orders = await response.json();
      const foundOrder = orders.find(o => o._id === id);
      setOrder(foundOrder);
      setOrderStatus(foundOrder?.status || 'Pending');
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  const handleAccept = async () => {
    try {
      await dispatch(updateOrderStatus({ id: order._id, status: 'Out for Delivery' }));
      setOrderStatus('Out for Delivery');
      setPopupType('accept');
      setPopupMessage('Order accepted successfully! You can now proceed with the delivery.');
      setShowPopup(true);
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleReject = async () => {
    try {
      await dispatch(updateOrderStatus({ id: order._id, status: 'Rejected' }));
      setPopupType('reject');
      setPopupMessage('Order has been rejected successfully.');
      setShowPopup(true);
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  const handleComplete = async () => {
    try {
      await dispatch(updateOrderStatus({ id: order._id, status: 'Delivered' }));
      setOrderStatus('Delivered');
      setPopupType('complete');
      setPopupMessage('Congratulations! Order completed successfully. Payment will be processed.');
      setShowPopup(true);
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    if (popupType === 'reject') {
      navigate('/rider-dashboard/orders');
    }
  };

  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/rider-dashboard/orders')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          ← Back to Orders
        </button>
        
        <h1 className="text-4xl font-bold text-gray-800">Customer Details</h1>
        
        <div className="w-32"></div>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Customer Name</label>
            <p className="text-lg font-medium text-gray-900">{order.customerName || order.name || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
            <p className="text-lg font-medium text-gray-900">{order.customerEmail || order.email || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Phone Number</label>
            <p className="text-lg font-medium text-gray-900">{order.contact || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Order ID</label>
            <p className="text-lg font-medium text-gray-900">#{order.name || order._id?.slice(-6)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Status</label>
            <p className="text-lg font-semibold text-orange-600">{orderStatus}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Amount</label>
            <p className="text-lg font-semibold text-green-600">₹{order.price}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Payment Status</label>
            <p className={`text-lg font-semibold ${
              orderStatus === 'Delivered' ? 'text-green-600' : 
              orderStatus === 'Out for Delivery' ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {orderStatus === 'Delivered' ? 'Paid' : 
               orderStatus === 'Out for Delivery' ? 'Pending' : 
               'Unpaid'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Payment Type</label>
            <p className="text-lg font-medium text-gray-900">
              {order.paymentStatus === 'cod' ? 'Cash on Delivery' : 
               order.paymentStatus === 'online' ? 'Online Payment' : 
               order.paymentStatus === 'upi' ? 'UPI Payment' : 
               'N/A'}
            </p>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Delivery Details</h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <label className="block text-sm font-semibold text-orange-700 mb-2">Pickup Address</label>
            <p className="text-lg font-medium text-gray-900">{order.pickupAddress}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <label className="block text-sm font-semibold text-orange-700 mb-2">Delivery Address</label>
            <p className="text-lg font-medium text-gray-900">{order.deliveryAddress}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Package Description</label>
              <p className="text-lg font-medium text-gray-900">{order.parcelDescription}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Weight</label>
              <p className="text-lg font-medium text-gray-900">{order.weight} kg</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Vehicle Type</label>
              <p className="text-lg font-medium text-gray-900 capitalize">{order.vehicle}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          {orderStatus === 'Pending' && (
            <div className="flex gap-4">
              <button 
                onClick={handleAccept}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 font-semibold transition-colors"
              >
                Accept Order
              </button>
              <button 
                onClick={handleReject}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 font-semibold transition-colors"
              >
                Reject Order
              </button>
            </div>
          )}
          
          {orderStatus === 'Out for Delivery' && (
            <button 
              onClick={handleComplete}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 font-semibold transition-colors"
            >
              Complete Order
            </button>
          )}
          
          {orderStatus === 'Delivered' && (
            <span className="bg-orange-100 text-orange-800 px-6 py-3 rounded-lg font-semibold">
              Order Completed
            </span>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              {popupType === 'accept' && (
                <div className="text-6xl mb-4">✅</div>
              )}
              {popupType === 'reject' && (
                <div className="text-6xl mb-4">❌</div>
              )}
              {popupType === 'complete' && (
                <div className="text-6xl mb-4">🎉</div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {popupType === 'accept' && 'Order Accepted!'}
                {popupType === 'reject' && 'Order Rejected'}
                {popupType === 'complete' && 'Order Completed!'}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {popupMessage}
              </p>
              
              <button
                onClick={closePopup}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                {popupType === 'reject' ? 'Back to Orders' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;