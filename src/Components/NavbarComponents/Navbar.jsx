import "./navbar.css";
import logo from '../../assets/logo-final.png';
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../redux/notificationSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.email) {
          setIsAuthenticated(true);
          setUser(parsedUser);
        } else {
          // Invalid user data, clear localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        // Invalid JSON, clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleDeleteNotification = (id) => {
    dispatch(removeNotification(id));
  };



  return (
    <nav className="main-div">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <img
          src={logo}
          alt="logo"
          className="nav-logo nav-brand ml-2 md:ml-4"
        />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? "block" : "hidden"}`}>
          <div className="text-sm md:flex-grow md:flex md:justify-center gap-16 ">
            <Link to="/" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">Home</Link>
            <Link to="/about" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">About Us</Link>
            <Link to="/services" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">Services</Link>

            {isAuthenticated && (
              <Link to="/book" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">Booking</Link>
            )}
            {!isAuthenticated && (
              <Link to="/career" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">Career</Link>
            )}
          </div>

          <div className="flex items-center gap-3 ml-3 md:ml-8 mr-4 md:mr-8 relative">
            {isAuthenticated && (
              <>
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="notification-icon"
                  >
                    <FaBell />
                    {notifications.length > 0 && (
                      <span className="notification-badge">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="notification-dropdown">
                      <h3 className="notification-header">Notifications</h3>
                      {notifications.length > 0 ? (
                        <div className="notification-list">
                          {notifications.map((notification) => (
                            <div key={notification.id || notification._id} className="notification-item">
                              <div>
                                <p className="notification-message font-semibold text-orange-700">
                                  {notification.message}
                                </p>
                                <button
                                  onClick={() => handleDeleteNotification(notification._id)}
                                  className="text-xs bg-orange-200 rounded px-2 py-1 mt-1 hover:bg-orange-300"
                                >
                                  Delete
                                </button>
                              </div>
                              <span className="notification-time text-xs text-gray-500">
                                {notification.timestamp}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="no-notifications">No new notifications</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="profile-icon"
                  >
                    <FaUserCircle />
                  </button>

                  {showDropdown && (
                    <div className="profile-dropdown">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem('token');
                          localStorage.removeItem('user');
                          setIsAuthenticated(false);
                          setUser(null);
                          setShowDropdown(false);
                          navigate('/login');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {!isAuthenticated && (
              <Link to="/login">
                <button className="login-img">Log In</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
