import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/logo-final.png';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:auto text-white min-h-screen p-4 main-container">
          <div className="flex items-center justify-center mb-8">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <nav className="space-y-4">
            <NavLink
              to="/"
              exact
              className={`block p-2 rounded-md font-bold ${activeLink === 'Dashboard' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              onClick={() => handleLinkClick('Dashboard')}
              activeClassName="active-link"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/orders"
              className={`block p-2 rounded-md font-bold ${activeLink === 'orders' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              onClick={() => handleLinkClick('orders')}
              activeClassName="active-link"
            >
              Orders
            </NavLink>
            <NavLink
              to="/tracking"
              className={`block p-2 rounded-md font-bold ${activeLink === 'tracking' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              onClick={() => handleLinkClick('tracking')}
              activeClassName="active-link"
            >
              Tracking
            </NavLink>
            <NavLink
              to="/profile"
              className={`block p-2 rounded-md font-bold ${activeLink === 'profile' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
              onClick={() => handleLinkClick('profile')}
              activeClassName="active-link"
            >
              Profile
            </NavLink>
          </nav>
          <button className="mt-36 w-full p-2 rounded-md border-none logout-btn">Log Out</button>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
