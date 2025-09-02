import logo from '../../assets/logo-final.png';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../redux/notificationSlice';
import axios from 'axios';
import "./customerNav.css";

const CustomerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth0();
  const [userClick, setUserClick] = useState(false);
  const [notificationClick, setNotificationClick] = useState(false);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);

  const encodedEmail = encodeURIComponent(user?.email || '');



  useEffect(() => {
    const fetchOrders = async () => {
      if (!encodedEmail) return;
      try {
        const response = await axios.get(`http://localhost:5002/api/orders/${encodedEmail}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [encodedEmail]);

  const handleDelete = (id) => {
    dispatch(removeNotification(id));
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${orderId}`, {
        status: 'Cancelled'
      });
      // Remove from orders list after cancellation
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <>
      <nav className="main-div">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <img src={logo} alt="logo" className="nav-logo nav-brand md:ml-0 sm:ml-5 lg:ml-28" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="text-sm md:flex-grow md:flex md:justify-center gap-20">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/Book', label: 'Booking' },
                { to: '/my-orders', label: 'My Orders' }
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black ${isActive ? 'active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Notification Icon */}
              <div className="relative">
                <button
                  onClick={() => setNotificationClick(!notificationClick)}
                  className="relative p-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  {notifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-sm">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Account Icon */}
              <div className="relative">
                <button
                  onClick={() => setUserClick(!userClick)}
                  className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {userClick && (
        <div className="userDetails flex flex-col items-center bg-white shadow-lg rounded-lg p-4 absolute right-4 top-16 z-50 min-w-[200px]">
          <p className="my-2 text-gray-600">Welcome</p>
          <h4 className="font-semibold">{user?.name}</h4>
          <h4 className="text-sm text-gray-500 mb-4">{user?.email}</h4>
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => window.location.href = '/customer-profile'}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Profile
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {notificationClick && (
        <div className="notification-sec flex flex-col items-center max-h-[400px] overflow-y-auto">
          <h2 className="mb-3 mt-3">Notifications</h2>
          <div className="notifications w-full px-5">
            <ul>
              {notifications.map((notification) => (
                <li key={notification._id} className="notification-item rounded-md bg-orange-50 p-3 mb-3">
                  <div>
                    <p className="font-semibold text-orange-700">{notification.message}</p>
                    {notification.details && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p><strong>Customer:</strong> {notification.details.customerName}</p>
                        <p><strong>Contact:</strong> {notification.details.contact}</p>
                        <p><strong>From:</strong> {notification.details.pickup}</p>
                        <p><strong>To:</strong> {notification.details.delivery}</p>
                        <p><strong>Item:</strong> {notification.details.parcelDescription}</p>
                        <p><strong>Weight:</strong> {notification.details.weight} kg</p>
                        <p><strong>Vehicle:</strong> {notification.details.vehicle}</p>
                        {notification.details.distance && (
                          <p><strong>Distance:</strong> {notification.details.distance} km</p>
                        )}
                        <p><strong>Price:</strong> ₹{notification.details.price}</p>
                        <p><strong>Payment:</strong> {notification.details.paymentMethod}</p>
                      </div>
                    )}
                    <button
                      onClick={() => handleDelete(notification._id)}
                      className="bg-orange-200 rounded-md py-1 px-2 border-none mt-2 delete hover:bg-orange-300"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="delete-btn">
                    <time className="text-sm text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </time>
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="mt-6 mb-3">Your Orders</h2>
            <ul>
              {orders.map((order) => (
                <li key={order._id} className="notification-item rounded-md bg-blue-50 p-3 mb-3">
                  <div>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded mt-2 text-sm hover:bg-red-600"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerNav;