import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard-orders/Dashboard';
import OrdersPage from './Components/Dashboard-orders/OrderList';
import OrderDetails from './Components/Dashboard-orders/OrderDetails';
import CustomerDetails from './Components/Dashboard-orders/CustomerDetails';
import Sidebar from './Components/Dashboard-orders/Sidebar';
import Profile from './Components/Dashboard-orders/Profile';
import Settings from './Components/Dashboard-orders/Settings';
import Help from './Components/Dashboard-orders/Help';
import NotFound from './Components/Dashboard-orders/NotFound';

const RiderDash = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 min-h-screen transition-all duration-300">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="customer/:id" element={<CustomerDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default RiderDash;