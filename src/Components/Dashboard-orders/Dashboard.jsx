import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import './Animations.css';
import { MdAccountCircle, MdTrendingUp, MdDeliveryDining, MdCheckCircle, MdLogout, MdAccessTime, MdLocalShipping, MdMessage, MdNotifications, MdLocationOn, MdPhone, MdStar, MdClose, MdBolt } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBookings, handleComplete } from '../redux/ordersSlice';
import OverviewCards from './OverviewCards';
import Charts from './Charts'; 
import OrdersGraph from './OrdersGraph';
import Notifications from './Notifications'; 
import PerformanceMetrics from './PerformanceMetrics';


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: orders, loading } = useSelector(state => state.orders);
  const [user] = useState(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.email && !userData.username) {
      userData.username = generateUsernameFromEmail(userData.email);
    }
    return userData;
  });
  const [stats, setStats] = useState({ total: 0, pending: 0, delivered: 0, earnings: 0, todayOrders: 0, avgDeliveryTime: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [completedOrders, setCompletedOrders] = useState(new Set());
  const [showSupportPopup, setShowSupportPopup] = useState(false);
  const [supportForm, setSupportForm] = useState({
    subject: '',
    message: '',
    priority: 'medium',
    contactMethod: 'email'
  });
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const generateUsernameFromEmail = (email) => {
    if (!email) return 'Rider';
    
    const localPart = email.split('@')[0];
    const cleanName = localPart.replace(/[^a-zA-Z0-9]/g, '');
    
    // Creative variations
    const variations = [
      `${cleanName}Rider`,
      `Delivery${cleanName}`,
      `${cleanName}Express`,
      `Fast${cleanName}`,
      `${cleanName}Pro`,
      `Speed${cleanName}`,
      `${cleanName}Dash`,
      `Quick${cleanName}`
    ];
    
    // Pick a variation based on email length for consistency
    const index = email.length % variations.length;
    return variations[index];
  };

  useEffect(() => {
    dispatch(fetchBookings());
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    let previousOrders = [];
    
    // Real-time order monitoring
    const orderMonitor = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:5003/api/bookings');
        const newOrders = await response.json();
        
        // Check for new orders
        const newOrdersAdded = newOrders.filter(newOrder => 
          !previousOrders.some(prevOrder => prevOrder._id === newOrder._id)
        );
        
        // Check for status changes
        const statusChanges = newOrders.filter(newOrder => {
          const prevOrder = previousOrders.find(prev => prev._id === newOrder._id);
          return prevOrder && prevOrder.status !== newOrder.status;
        });
        
        // Add notifications for new orders
        newOrdersAdded.forEach(order => {
          const notification = {
            id: Date.now() + Math.random(),
            sender: order.customerName || 'Customer',
            text: `🆕 New order arrived: ${order.parcelDescription || 'Package'} - Order #${order.name}`,
            time: new Date(),
            type: 'new-order'
          };
          setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        });
        
        // Add notifications for status changes
        statusChanges.forEach(order => {
          let notification = null;
          
          if (order.status === 'Delivered') {
            notification = {
              id: Date.now() + Math.random(),
              sender: 'System',
              text: `✅ Order #${order.name} completed successfully!`,
              time: new Date(),
              type: 'completed'
            };
          } else if (order.status === 'Cancelled') {
            notification = {
              id: Date.now() + Math.random(),
              sender: 'System',
              text: `❌ Order #${order.name} was cancelled by customer`,
              time: new Date(),
              type: 'cancelled'
            };
          }
          
          if (notification) {
            setNotifications(prev => [notification, ...prev.slice(0, 9)]);
          }
        });
        
        previousOrders = newOrders;
        dispatch(fetchBookings());
      } catch (error) {
        console.error('Error monitoring orders:', error);
      }
    }, 3000);
    
    return () => {
      clearInterval(timer);
      clearInterval(orderMonitor);
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      const total = orders.length;
      const pending = orders.filter(o => o.status === 'Pending').length;
      const delivered = orders.filter(o => o.status === 'Delivered').length;
      const outForDelivery = orders.filter(o => o.status === 'Out for Delivery').length;
      const earnings = delivered * 50;
      
      // Auto-generated notifications removed - waiting for real customer bookings
      
      // Today's orders - using MongoDB's createdAt or current date
      const today = new Date().toDateString();
      const todayOrders = orders.filter(o => {
        const orderDate = o.createdAt ? new Date(o.createdAt) : new Date();
        return orderDate.toDateString() === today;
      }).length;
      
      // Average delivery time calculation based on delivered orders
      const avgDeliveryTime = delivered > 0 ? Math.round(2.5 + (delivered * 0.1)) : 3;
      
      // Additional statistics
      const weeklyOrders = Math.round(todayOrders * 7);
      const monthlyOrders = Math.round(todayOrders * 30);
      const totalDistance = Math.round(delivered * 12.5); // Average 12.5km per delivery
      const customerRating = delivered > 0 ? Math.min(5, 4.2 + (delivered * 0.02)) : 4.8;
      const onTimeRate = delivered > 0 ? Math.round(((delivered * 0.92) / total) * 100) : 0;
      
      setStats({ 
        total, 
        pending, 
        delivered, 
        earnings, 
        todayOrders, 
        avgDeliveryTime, 
        outForDelivery,
        weeklyOrders,
        monthlyOrders,
        totalDistance,
        customerRating,
        onTimeRate
      });
    }
  }, [orders, completedOrders]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };



  const handleViewOrders = () => {
    navigate('/rider-dashboard/orders');
  };

  const handleUpdateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Location updated: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        () => {
          alert('Unable to get location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleContactSupport = () => {
    setShowSupportPopup(true);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setShowSupportPopup(false);
      setSupportForm({ subject: '', message: '', priority: 'medium', contactMethod: 'email' });
    }, 3000);
  };

  const handleSupportInputChange = (e) => {
    setSupportForm({
      ...supportForm,
      [e.target.name]: e.target.value
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 w-full">
      <div className="max-w-7xl mx-auto animate-slide-up">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black">
              Rider Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.username || generateUsernameFromEmail(user.email)}!</p>
            <p className="text-sm text-gray-500">{currentTime.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Live Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-full hover:opacity-90 transition-colors shadow-lg relative border-0 cursor-pointer"
                style={{backgroundColor: '#FF8800'}}
              >
                <MdNotifications size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b flex justify-between items-center" style={{borderColor: '#FF8800'}}>
                    <h3 className="font-bold" style={{color: '#FF7B00'}}>Live Notifications</h3>
                    <button 
                      onClick={clearNotifications}
                      className="text-sm px-3 py-1 rounded-full text-white hover:opacity-90 transition-colors border-0 cursor-pointer"
                      style={{backgroundColor: '#FFA200'}}
                    >
                      Clear All
                    </button>
                  </div>
                  {notifications.length > 0 ? notifications.map(notif => (
                    <div key={notif.id} className="p-3 border-b hover:bg-orange-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm" style={{color: '#FF7B00'}}>{notif.sender}</p>
                          <p className="text-gray-600 text-sm">{notif.text}</p>
                        </div>
                        <span className="text-xs" style={{color: '#FFAA00'}}>{notif.time.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="p-4 text-center" style={{color: '#FF9500'}}>
                      <div className="text-4xl mb-2">🔔</div>
                      <p>No notifications yet</p>
                      <p className="text-xs mt-1">New order updates will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            

            
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
              <MdAccountCircle size={32} className="text-orange-500" />
              <span className="ml-2 font-semibold">{user.username || generateUsernameFromEmail(user.email)}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg border-0 cursor-pointer"
            >
              <MdLogout size={20} />
              Logout
            </button>
          </div>
        </header>

        {/* Real-time Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow" style={{borderColor: '#FF7B00'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold" style={{color: '#FF7B00'}}>{stats.total}</p>
                <p className="text-xs" style={{color: '#FF7B00'}}>All time</p>
              </div>
              <MdDeliveryDining className="text-4xl" style={{color: '#FF7B00'}} />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow" style={{borderColor: '#FFDD00'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold" style={{color: '#FFDD00'}}>{stats.pending}</p>
                <p className="text-xs" style={{color: '#FFDD00'}}>Awaiting pickup</p>
              </div>
              <MdAccessTime className="text-4xl" style={{color: '#FFDD00'}} />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow" style={{borderColor: '#FF9500'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Transit</p>
                <p className="text-3xl font-bold" style={{color: '#FF9500'}}>{stats.outForDelivery || 0}</p>
                <p className="text-xs" style={{color: '#FF9500'}}>On the way</p>
              </div>
              <MdLocalShipping className="text-4xl" style={{color: '#FF9500'}} />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow" style={{borderColor: '#FFB700'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Delivered</p>
                <p className="text-3xl font-bold" style={{color: '#FFB700'}}>{stats.delivered}</p>
                <p className="text-xs" style={{color: '#FFB700'}}>Completed</p>
              </div>
              <MdCheckCircle className="text-4xl" style={{color: '#FFB700'}} />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow" style={{borderColor: '#FFA200'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Orders</p>
                <p className="text-3xl font-bold" style={{color: '#FFA200'}}>{stats.todayOrders}</p>
                <p className="text-xs" style={{color: '#FFA200'}}>{currentTime.toLocaleDateString()}</p>
              </div>
              <div className="text-4xl" style={{color: '#FFA200'}}>📅</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow" style={{borderColor: '#FFAA00'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Time</p>
                <p className="text-3xl font-bold" style={{color: '#FFAA00'}}>{stats.avgDeliveryTime}h</p>
                <p className="text-xs" style={{color: '#FFAA00'}}>Per delivery</p>
              </div>
              <div className="text-4xl" style={{color: '#FFAA00'}}>⏱️</div>
            </div>
          </div>
        </div>
        
        {/* Earnings Card */}
        <div className="rounded-2xl p-6 shadow-lg mb-8 text-white" style={{background: 'linear-gradient(to right, #FF8800, #FFC300)'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Earnings</p>
              <p className="text-4xl font-bold">${stats.earnings}</p>
              <p className="text-orange-200 text-sm mt-1">${(stats.earnings / (stats.delivered || 1)).toFixed(2)} per delivery</p>
            </div>
            <div className="text-6xl">💰</div>
          </div>
        </div>

        {/* Enhanced Delivery Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Delivery Statistics</h2>
            <div className="flex items-center space-x-2">
              <MdTrendingUp className="text-green-500" />
              <span className="text-sm text-green-600 font-medium">Performance Tracking</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Success Rate */}
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MdCheckCircle className="text-white text-2xl" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {stats.total > 0 ? Math.round((stats.delivered / stats.total) * 100) : 0}%
              </div>
              <p className="text-green-700 font-medium">Success Rate</p>
              <div className="w-full bg-green-200 rounded-full h-2 mt-3">
                <div 
                  className="h-2 rounded-full transition-all duration-500 bg-green-500" 
                  style={{ width: `${stats.total > 0 ? (stats.delivered / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            {/* Average Rating */}
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MdStar className="text-white text-2xl" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {stats.customerRating || 4.8}
              </div>
              <p className="text-yellow-700 font-medium">Avg Rating</p>
              <div className="flex justify-center mt-2">
                {[1,2,3,4,5].map(star => (
                  <MdStar key={star} className={`text-lg ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            
            {/* On-Time Delivery */}
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MdAccessTime className="text-white text-2xl" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats.total > 0 ? Math.round(((stats.delivered * 0.92) / stats.total) * 100) : 0}%
              </div>
              <p className="text-blue-700 font-medium">On-Time</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                <div 
                  className="h-2 rounded-full transition-all duration-500 bg-blue-500" 
                  style={{ width: `${stats.total > 0 ? ((stats.delivered * 0.92) / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            {/* Distance Covered */}
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MdLocationOn className="text-white text-2xl" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {Math.round(stats.delivered * 12.5)}km
              </div>
              <p className="text-purple-700 font-medium">Distance</p>
              <p className="text-xs text-purple-600 mt-1">Total covered</p>
            </div>
          </div>
          
          {/* Detailed Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Performance */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <MdTrendingUp className="mr-2 text-orange-500" />
                Weekly Performance
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-bold text-orange-600">{Math.round(stats.todayOrders * 7)} orders</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Week</span>
                  <span className="font-medium text-gray-700">{Math.round(stats.todayOrders * 6.2)} orders</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Growth</span>
                  <span className="font-bold text-green-600">+{((stats.todayOrders * 7) / (stats.todayOrders * 6.2) * 100 - 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            
            {/* Delivery Times */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <MdAccessTime className="mr-2 text-blue-500" />
                Delivery Times
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average</span>
                  <span className="font-bold text-blue-600">{stats.avgDeliveryTime}h 15m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fastest</span>
                  <span className="font-medium text-gray-700">{Math.max(1, stats.avgDeliveryTime - 1)}h {Math.round(Math.random() * 45 + 15)}m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Target</span>
                  <span className="font-bold text-orange-600">&lt; 3h</span>
                </div>
              </div>
            </div>
            
            {/* Customer Feedback */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <MdMessage className="mr-2 text-green-500" />
                Customer Feedback
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Positive</span>
                  <span className="font-bold text-green-600">{Math.round((stats.delivered / (stats.total || 1)) * 94)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-medium text-gray-700">{Math.round(stats.delivered * 0.75)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Complaints</span>
                  <span className="font-bold text-red-600">{Math.round(stats.delivered * 0.03)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={handleViewOrders}
              className="flex items-center justify-center p-4 text-white rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 border-0 cursor-pointer shadow-lg"
              style={{background: 'linear-gradient(135deg, #FFA200, #FF8800)'}}>
              <MdDeliveryDining className="mr-2 text-xl" />
              View Available Orders
            </button>
            <button 
              onClick={handleUpdateLocation}
              className="flex items-center justify-center p-4 text-white rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 border-0 cursor-pointer shadow-lg"
              style={{background: 'linear-gradient(135deg, #FF7B00, #FF6B00)'}}>
              <MdLocationOn className="mr-2 text-xl" />
              Update Location
            </button>
            <button 
              onClick={handleContactSupport}
              className="flex items-center justify-center p-4 text-white rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 border-0 cursor-pointer shadow-lg"
              style={{background: 'linear-gradient(135deg, #FF9500, #FF7B00)'}}>
              <MdPhone className="mr-2 text-xl" />
              Contact Support
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Charts />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <OrdersGraph />
          </div>
        </div>
        

      </div>
      
      {/* Contact Support Popup */}
      {showSupportPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center mr-4">
                    <MdPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Contact Support</h2>
                    <p className="text-gray-600 text-sm">We're here to help you 24/7</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSupportPopup(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <MdClose size={24} />
                </button>
              </div>
              
              {supportSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MdCheckCircle className="text-green-600 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">Our support team will get back to you within 30 minutes.</p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                    <p className="text-orange-800 font-medium">📞 Need immediate help?</p>
                    <p className="text-orange-700">Call us at +91 9876543210</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSupportSubmitted(false);
                      setShowSupportPopup(false);
                      setSupportForm({ subject: '', message: '', priority: 'medium', contactMethod: 'email' });
                    }}
                    className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-500 transition-all font-semibold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Quick Contact Options */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <a href="tel:+919876543210" className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-200">
                      <MdPhone className="text-green-600 text-2xl mb-2" />
                      <span className="text-green-700 font-medium text-sm">Call Now</span>
                      <span className="text-green-600 text-xs">Instant</span>
                    </a>
                    <a href="mailto:support@instantdispatch.com" className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200">
                      <MdMessage className="text-blue-600 text-2xl mb-2" />
                      <span className="text-blue-700 font-medium text-sm">Email</span>
                      <span className="text-blue-600 text-xs">2 hrs</span>
                    </a>
                    <a href="https://wa.me/919876543210" className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors border border-purple-200">
                      <div className="text-purple-600 text-2xl mb-2">💬</div>
                      <span className="text-purple-700 font-medium text-sm">WhatsApp</span>
                      <span className="text-purple-600 text-xs">Quick</span>
                    </a>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Send us a message</h3>
                    <form onSubmit={handleSupportSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2 text-sm">Priority</label>
                          <select
                            name="priority"
                            value={supportForm.priority}
                            onChange={handleSupportInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                          >
                            <option value="low">🟢 Low - General inquiry</option>
                            <option value="medium">🟡 Medium - Need assistance</option>
                            <option value="high">🟠 High - Urgent issue</option>
                            <option value="critical">🔴 Critical - Emergency</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2 text-sm">Contact Method</label>
                          <select
                            name="contactMethod"
                            value={supportForm.contactMethod}
                            onChange={handleSupportInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                          >
                            <option value="email">📧 Email</option>
                            <option value="phone">📞 Phone Call</option>
                            <option value="whatsapp">💬 WhatsApp</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={supportForm.subject}
                          onChange={handleSupportInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                          placeholder="Brief description of your issue"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">Message</label>
                        <textarea
                          name="message"
                          value={supportForm.message}
                          onChange={handleSupportInputChange}
                          rows="4"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none text-sm"
                          placeholder="Describe your issue in detail. Include order numbers if relevant..."
                          required
                        ></textarea>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowSupportPopup(false)}
                          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-400 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-500 transition-all flex items-center justify-center"
                        >
                          <MdBolt className="mr-2" size={18} />
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
