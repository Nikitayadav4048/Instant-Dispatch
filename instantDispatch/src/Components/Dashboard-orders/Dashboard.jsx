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
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const [stats, setStats] = useState({ total: 0, pending: 0, delivered: 0, earnings: 0, todayOrders: 0, avgDeliveryTime: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [completedOrders, setCompletedOrders] = useState(new Set());

  useEffect(() => {
    dispatch(fetchBookings());
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    let previousOrders = [];
    
    // Real-time order monitoring
    const orderMonitor = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
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
      
      // Average delivery time (mock calculation)
      const avgDeliveryTime = Math.round(2.5 + Math.random() * 2); // 2.5-4.5 hours
      
      setStats({ total, pending, delivered, earnings, todayOrders, avgDeliveryTime, outForDelivery });
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
    const supportOptions = [
      'Call: +91 9876543210',
      'Email: support@instantdispatch.com',
      'WhatsApp: +91 9876543210'
    ];
    alert(`Contact Support:\n\n${supportOptions.join('\n')}`);
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Rider Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.username || 'Rider'}!</p>
            <p className="text-sm text-gray-500">{currentTime.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Live Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-full hover:opacity-90 transition-colors shadow-lg relative"
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
                      className="text-sm px-3 py-1 rounded-full text-white hover:opacity-90 transition-colors"
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
              <span className="ml-2 font-semibold">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
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

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Success Rate</h3>
            <div className="text-center">
              <div className="text-4xl font-bold" style={{color: '#FFD000'}}>
                {stats.total > 0 ? Math.round((stats.delivered / stats.total) * 100) : 0}%
              </div>
              <p className="text-gray-600 mt-2">Delivery Success</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${stats.total > 0 ? (stats.delivered / stats.total) * 100 : 0}%`, backgroundColor: '#FFD000' }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Active Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Online</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium text-white" style={{backgroundColor: '#FFEA00', color: '#333'}}>
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Active</span>
                <span className="text-sm text-gray-500">Now</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Zone</span>
                <span className="text-sm font-medium">Downtown</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={handleViewOrders}
                className="w-full p-3 text-white rounded-lg hover:opacity-90 transition-colors"
                style={{backgroundColor: '#FFA200'}}
              >
                View Available Orders
              </button>
              <button 
                onClick={handleUpdateLocation}
                className="w-full p-3 text-white rounded-lg hover:opacity-90 transition-colors"
                style={{backgroundColor: '#FF7B00'}}
              >
                Update Location
              </button>
              <button 
                onClick={handleContactSupport}
                className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Contact Support
              </button>
            </div>
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
      

      

    </div>
  );
};

export default Dashboard;
