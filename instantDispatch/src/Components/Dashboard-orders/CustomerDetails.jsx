import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdPerson, MdEmail, MdPhone, MdLocationOn, MdInventory, MdLocalShipping, MdAccessTime, MdStar, MdCall, MdMessage, MdNavigation } from 'react-icons/md';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerHistory, setCustomerHistory] = useState([]);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      // Fetch specific order details
      const response = await fetch(`http://localhost:5000/api/bookings`);
      const allOrders = await response.json();
      const order = allOrders.find(o => o._id === id || o.id === id);
      
      if (order) {
        setOrderDetails(order);
        
        // Fetch customer's order history
        const customerOrders = allOrders.filter(o => 
          o.customerEmail === order.customerEmail || 
          o.customerUsername === order.customerUsername
        );
        setCustomerHistory(customerOrders);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      // Fallback data for demo
      const mockOrder = {
        _id: id,
        name: 'ORD001',
        customerName: 'Rajesh Kumar',
        customerEmail: 'rajesh.kumar@gmail.com',
        contact: '+91 9876543210',
        pickupAddress: 'Main Market, Khategaon, MP',
        deliveryAddress: 'Railway Station Road, Khategaon, MP',
        parcelDescription: 'Electronics - Mobile Phone',
        weight: '0.5 kg',
        vehicle: 'scooter',
        price: 85,
        status: 'Out for Delivery',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
      };
      setOrderDetails(mockOrder);
      setCustomerHistory([mockOrder]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500';
      case 'Out for Delivery': return 'bg-blue-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getVehicleIcon = (vehicle) => {
    switch (vehicle?.toLowerCase()) {
      case 'bike':
      case 'motorcycle':
        return '🏍️';
      case 'scooter':
        return '🛵';
      case 'minitruck':
      case 'mini truck':
        return '🚚';
      default:
        return '🚗';
    }
  };

  const handleCall = () => {
    if (orderDetails?.contact) {
      window.open(`tel:${orderDetails.contact}`);
    }
  };

  const handleMessage = () => {
    if (orderDetails?.contact) {
      window.open(`sms:${orderDetails.contact}`);
    }
  };

  const handleNavigation = () => {
    if (orderDetails?.deliveryAddress) {
      const address = encodeURIComponent(orderDetails.deliveryAddress);
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 w-full">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The requested order could not be found.</p>
          <button
            onClick={() => navigate('/rider-dashboard/orders')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/rider-dashboard/orders')}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <MdArrowBack className="text-orange-600" size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Customer Details
            </h1>
            <p className="text-gray-600 text-lg">Order #{orderDetails.name || orderDetails._id?.slice(-6)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {orderDetails.customerName?.charAt(0) || 'C'}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{orderDetails.customerName || 'Customer'}</h2>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MdStar className="text-yellow-500" size={16} />
                      <span className="text-sm">4.8 Rating</span>
                    </div>
                    <div className="text-sm">
                      {customerHistory.length} Total Orders
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdEmail className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{orderDetails.customerEmail || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdPhone className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{orderDetails.contact || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MdInventory className="mr-3 text-orange-500" />
                Order Information
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Pickup Address</p>
                    <p className="font-medium flex items-start gap-2">
                      <MdLocationOn className="text-green-500 mt-1" size={16} />
                      {orderDetails.pickupAddress}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                    <p className="font-medium flex items-start gap-2">
                      <MdLocationOn className="text-red-500 mt-1" size={16} />
                      {orderDetails.deliveryAddress}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Package</p>
                    <p className="font-medium">{orderDetails.parcelDescription}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Weight</p>
                    <p className="font-medium">{orderDetails.weight}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                    <p className="font-medium flex items-center gap-2">
                      <span className="text-xl">{getVehicleIcon(orderDetails.vehicle)}</span>
                      <span className="capitalize">{orderDetails.vehicle}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Order Time</p>
                    <p className="font-medium flex items-center gap-2">
                      <MdAccessTime className="text-blue-500" size={16} />
                      {new Date(orderDetails.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="font-bold text-xl text-orange-600">₹{orderDetails.price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Order History */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order History ({customerHistory.length})</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {customerHistory.map((order, index) => (
                  <div key={order._id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getVehicleIcon(order.vehicle)}</span>
                      <div>
                        <p className="font-medium">#{order.name || order._id?.slice(-6)}</p>
                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-sm font-medium mt-1">₹{order.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Status</h3>
              <div className="text-center">
                <div className={`w-16 h-16 ${getStatusColor(orderDetails.status)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <MdLocalShipping className="text-white" size={24} />
                </div>
                <p className="font-bold text-lg text-gray-800">{orderDetails.status}</p>
                {orderDetails.estimatedDelivery && (
                  <p className="text-sm text-gray-600 mt-2">
                    Est. Delivery: {new Date(orderDetails.estimatedDelivery).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleCall}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  <MdCall size={20} />
                  Call Customer
                </button>
                <button
                  onClick={handleMessage}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <MdMessage size={20} />
                  Send Message
                </button>
                <button
                  onClick={handleNavigation}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
                >
                  <MdNavigation size={20} />
                  Navigate
                </button>
              </div>
            </div>

            {/* Customer Rating */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Rating</h3>
              <div className="text-center">
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MdStar key={star} className="text-yellow-500" size={24} />
                  ))}
                </div>
                <p className="text-2xl font-bold text-gray-800">4.8</p>
                <p className="text-sm text-gray-600">Based on {customerHistory.length} orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;