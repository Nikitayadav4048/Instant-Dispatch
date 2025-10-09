import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';
import logo from '../../assets/logo-final.png';
import { MdDashboard, MdDeliveryDining, MdPerson, MdSettings, MdHelp, MdStar, MdTrendingUp } from 'react-icons/md';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: orders } = useSelector(state => state.orders);
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  // Show all orders without vehicle filtering
  const riderOrders = orders || [];
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [riderRating] = useState(4.8);
  const [todayStats, setTodayStats] = useState({ deliveries: 0, earnings: 0, goalProgress: 0 });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { to: '/rider-dashboard', icon: MdDashboard, label: 'Dashboard', badge: null, exact: true },
    { to: '/rider-dashboard/orders', icon: MdDeliveryDining, label: 'Orders', badge: riderOrders.filter(o => o.status === 'Pending').length || null, exact: true },
    { to: '/rider-dashboard/profile', icon: MdPerson, label: 'Profile', badge: null, exact: false },
    { to: '/rider-dashboard/settings', icon: MdSettings, label: 'Settings', badge: null, exact: false },
    { to: '/rider-dashboard/help', icon: MdHelp, label: 'Help & Support', badge: null, exact: false }
  ];

  useEffect(() => {
    // Calculate today's performance based on all completed orders
    const today = new Date().toDateString();
    const todayOrders = riderOrders.filter(order => {
      const orderDate = order.createdAt ? new Date(order.createdAt).toDateString() : today;
      return orderDate === today && order.status === 'Delivered';
    });
    
    const deliveries = todayOrders.length;
    const earnings = deliveries * 50; // $50 per delivery
    const dailyGoal = 10; // Target 10 deliveries per day
    const goalProgress = Math.min((deliveries / dailyGoal) * 100, 100);
    
    setTodayStats({ deliveries, earnings, goalProgress });
    
    // Simulate online status changes
    const statusTimer = setInterval(() => {
      setOnlineStatus(prev => Math.random() > 0.1 ? true : prev);
    }, 30000);
    return () => clearInterval(statusTimer);
  }, [orders]);

  return (
    <aside className="w-64 bg-white text-gray-800 h-screen shadow-lg border-r border-gray-200 fixed left-0 top-0 z-40 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>
        
        <div className="mb-8">
          <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-200">
            <div className="relative">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md" style={{backgroundColor: '#F8AD42'}}>
                <span className="text-2xl font-bold text-white">{(user.username || 'R').charAt(0)}</span>
              </div>
              <h3 className="font-semibold text-gray-800">{user.username || 'Rider'}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              
              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mt-2">
                <MdStar className="text-yellow-400" size={16} />
                <span className="text-sm font-medium">{riderRating}</span>
              </div>
              
              {/* Online Status */}
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${onlineStatus ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="text-xs">{onlineStatus ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={() => {
                let isActive = false;
                if (item.label === 'Orders') {
                  // Orders tab active on orders page AND customer details page
                  isActive = location.pathname === '/rider-dashboard/orders' || location.pathname.startsWith('/rider-dashboard/customer/');
                } else if (item.label === 'Dashboard') {
                  isActive = location.pathname === '/rider-dashboard';
                } else {
                  isActive = location.pathname.startsWith(item.to);
                }
                return `flex items-center justify-between p-3 rounded-lg transition-all duration-200 group outline-none no-underline ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                }`;
              }}
              style={() => {
                let isActive = false;
                if (item.label === 'Orders') {
                  // Orders tab active on orders page AND customer details page
                  isActive = location.pathname === '/rider-dashboard/orders' || location.pathname.startsWith('/rider-dashboard/customer/');
                } else if (item.label === 'Dashboard') {
                  isActive = location.pathname === '/rider-dashboard';
                } else {
                  isActive = location.pathname.startsWith(item.to);
                }
                return isActive ? {backgroundColor: '#F8AD42', outline: 'none', textDecoration: 'none'} : {outline: 'none', textDecoration: 'none'};
              }}
            >
              <div className="flex items-center space-x-3">
                <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>


      
      {/* Performance Summary */}
      <div className="mt-8 p-4">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-gray-800">
            <MdTrendingUp size={16} style={{color: '#F8AD42'}} />
            Today's Performance
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Deliveries</span>
              <span className="font-bold text-gray-800">{todayStats.deliveries}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Earnings</span>
              <span className="font-bold" style={{color: '#F8AD42'}}>${todayStats.earnings}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500" 
                style={{ width: `${todayStats.goalProgress}%`, backgroundColor: '#F8AD42' }}
              ></div>
            </div>
            <p className="text-xs text-center text-gray-500">{Math.round(todayStats.goalProgress)}% of daily goal</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
