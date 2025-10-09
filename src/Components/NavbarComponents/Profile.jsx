import { useState, useEffect } from 'react';
import axios from 'axios';
import './RiderForm.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('account');
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5002/api/bookings/${orderId}`, {
        status: 'Cancelled'
      });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: 'Cancelled' } : order
      ));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) {
        console.log('No user email found');
        setLoading(false);
        return;
      }
      
      console.log('Fetching orders for user:', user.email);
      
      try {
        const response = await axios.get('http://localhost:5002/api/bookings');
        console.log('All orders:', response.data);
        
        const userOrders = response.data.filter(order => {
          const match = order.email === user.email || 
                       order.customerEmail === user.email ||
                       order.customerUsername === user.email;
          console.log('Order match for', order.email, ':', match);
          return match;
        });
        
        console.log('Filtered user orders:', userOrders);
        setOrders(userOrders);
        
        // Extract addresses from orders
        const uniqueAddresses = [...new Set([
          ...userOrders.map(order => order.pickupAddress).filter(Boolean),
          ...userOrders.map(order => order.deliveryAddress).filter(Boolean)
        ])].map(addr => ({ address: addr, type: 'Home' }));
        setAddresses(uniqueAddresses.slice(0, 3));
        
        // Extract payment methods
        const paymentTypes = [...new Set(userOrders.map(order => order.paymentStatus).filter(Boolean))];
        setPaymentMethods(paymentTypes.map(type => ({ type, isDefault: type === 'cod' })));
        
        // Calculate stats
        const totalOrders = userOrders.length;
        const totalSpent = userOrders.reduce((sum, order) => sum + (order.price || 0), 0);
        const pendingOrders = userOrders.filter(order => order.status === 'Pending' || !order.status).length;
        const completedOrders = userOrders.filter(order => order.status === 'completed').length;
        setStats({ totalOrders, totalSpent, pendingOrders, completedOrders });
        
        // Mock notifications
        setNotifications([
          { id: 1, title: 'Order Delivered', message: 'Your recent order has been delivered successfully', time: '2 hours ago', type: 'success' },
          { id: 2, title: 'Payment Confirmed', message: 'Payment for order #123456 confirmed', time: '1 day ago', type: 'info' },
          { id: 3, title: 'New Offer', message: 'Get 20% off on your next delivery', time: '3 days ago', type: 'offer' }
        ]);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return <div className="profile-container">Please login to view profile</div>;
  }

  const renderContent = () => {
    switch(activeSection) {

      case 'notifications':
        return (
          <div className="notifications-section">
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.type === 'success' ? 'bg-green-100 text-green-600' :
                    notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <i className={`fas ${
                      notification.type === 'success' ? 'fa-check' :
                      notification.type === 'info' ? 'fa-info' : 'fa-gift'
                    }`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-600 text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'support':
        return (
          <div className="support-section">
            <h2 className="text-2xl font-bold mb-6">Help & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">📞 Call Support</h3>
                  <p className="text-gray-600 text-sm mb-3">Get instant help from our support team</p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Call Now: +91 9876543210
                  </button>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">💬 Live Chat</h3>
                  <p className="text-gray-600 text-sm mb-3">Chat with our support agents</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Start Chat
                  </button>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">📧 Email Support</h3>
                  <p className="text-gray-600 text-sm mb-3">Send us your queries via email</p>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                    Send Email
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <div className="border rounded p-3">
                    <h4 className="font-medium">How to track my order?</h4>
                    <p className="text-sm text-gray-600 mt-1">You can track your order from the Orders section</p>
                  </div>
                  <div className="border rounded p-3">
                    <h4 className="font-medium">How to cancel an order?</h4>
                    <p className="text-sm text-gray-600 mt-1">Click on Cancel Order button in your order details</p>
                  </div>
                  <div className="border rounded p-3">
                    <h4 className="font-medium">Payment methods accepted?</h4>
                    <p className="text-sm text-gray-600 mt-1">We accept COD, UPI, and Online payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'account':
        return (
          <div className="account-section">
            <h2 className="text-2xl font-bold mb-6">Login & security</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="font-semibold">Name:</h3>
                  <p className="text-gray-600">{user?.username}</p>
                </div>
                <button className="text-blue-600 hover:underline">Edit</button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="font-semibold">Email:</h3>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
                <button className="text-blue-600 hover:underline">Edit</button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="font-semibold">Password:</h3>
                  <p className="text-gray-600">••••••••</p>
                </div>
                <button className="text-blue-600 hover:underline">Edit</button>
              </div>
            </div>
          </div>
        );
      
      case 'addresses':
        return (
          <div className="addresses-section">
            <h2 className="text-2xl font-bold mb-6">Your Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded text-center">
                <button className="text-blue-600 hover:underline">
                  <i className="fas fa-plus mb-2"></i><br/>
                  Add address
                </button>
              </div>
              {addresses.map((addr, index) => (
                <div key={index} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-gray-200 px-2 py-1 text-xs rounded">{addr.type}</span>
                    <button className="text-blue-600 hover:underline text-sm">Edit</button>
                  </div>
                  <p className="text-sm text-gray-700">{addr.address}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'payment':
        return (
          <div className="payment-section">
            <h2 className="text-2xl font-bold mb-6">Payment options</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded text-center">
                <button className="text-blue-600 hover:underline">
                  <i className="fas fa-plus mb-2"></i><br/>
                  Add a payment method
                </button>
              </div>
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded">
                  <div className="flex items-center">
                    <i className={`fas ${
                      method.type === 'cod' ? 'fa-money-bill-wave' :
                      method.type === 'upi' ? 'fa-mobile-alt' : 'fa-credit-card'
                    } mr-3`}></i>
                    <span className="capitalize">{method.type === 'cod' ? 'Cash on Delivery' : method.type}</span>
                    {method.isDefault && <span className="ml-2 bg-orange-100 text-orange-800 px-2 py-1 text-xs rounded">Default</span>}
                  </div>
                  <button className="text-blue-600 hover:underline">Edit</button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div className="orders-section">
            <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border rounded p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm text-gray-600">ORDER PLACED</p>
                        <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">TOTAL</p>
                        <p className="font-semibold">₹{order.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ORDER # {order._id?.slice(-6)}</p>
                        <span className={`px-2 py-1 rounded text-sm ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{order.parcelDescription}</p>
                          <p className="text-sm text-gray-600">From: {order.pickupAddress}</p>
                          <p className="text-sm text-gray-600">To: {order.deliveryAddress}</p>
                        </div>
                        <div className="flex gap-2">
                          {order.status !== 'Cancelled' && order.status !== 'completed' && (
                            <button 
                              onClick={() => handleCancelOrder(order._id)}
                              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                            >
                              Cancel Order
                            </button>
                          )}
                          <button className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500">
                            Track package
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No orders found</p>
            )}
          </div>
        );
      
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold mb-6">Your Account</h2>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveSection('account')}
                className={`w-full text-left p-3 rounded hover:bg-gray-100 ${
                  activeSection === 'account' ? 'bg-yellow-100 border-l-4 border-yellow-500' : ''
                }`}
              >
                <i className="fas fa-user mr-3"></i>Login & security
              </button>
              <button 
                onClick={() => setActiveSection('addresses')}
                className={`w-full text-left p-3 rounded hover:bg-gray-100 ${
                  activeSection === 'addresses' ? 'bg-yellow-100 border-l-4 border-yellow-500' : ''
                }`}
              >
                <i className="fas fa-map-marker-alt mr-3"></i>Your addresses
              </button>
              <button 
                onClick={() => setActiveSection('payment')}
                className={`w-full text-left p-3 rounded hover:bg-gray-100 ${
                  activeSection === 'payment' ? 'bg-yellow-100 border-l-4 border-yellow-500' : ''
                }`}
              >
                <i className="fas fa-credit-card mr-3"></i>Payment options
              </button>
              <button 
                onClick={() => setActiveSection('orders')}
                className={`w-full text-left p-3 rounded hover:bg-gray-100 ${
                  activeSection === 'orders' ? 'bg-yellow-100 border-l-4 border-yellow-500' : ''
                }`}
              >
                <i className="fas fa-box mr-3"></i>Your orders
              </button>
              <button 
                onClick={() => setActiveSection('notifications')}
                className={`w-full text-left p-3 rounded hover:bg-gray-100 ${
                  activeSection === 'notifications' ? 'bg-yellow-100 border-l-4 border-yellow-500' : ''
                }`}
              >
                <i className="fas fa-bell mr-3"></i>Notifications
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
              </button>
              <button 
                onClick={() => setActiveSection('support')}
                className={`w-full text-left p-3 rounded hover:bg-gray-100 ${
                  activeSection === 'support' ? 'bg-yellow-100 border-l-4 border-yellow-500' : ''
                }`}
              >
                <i className="fas fa-headset mr-3"></i>Help & Support
              </button>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-white rounded shadow p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;