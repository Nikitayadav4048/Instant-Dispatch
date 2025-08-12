import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard-orders/Dashboard';
import OrdersPage from './Components/Dashboard-orders/OrderList';
import OrderDetails from './Components/Dashboard-orders/OrderDetails';
import Sidebar from './Components/Dashboard-orders/Sidebar';
import Profile from './Components/Dashboard-orders/Profile'; // Import the Profile component
import NotFound from './Components/Dashboard-orders/NotFound'; // Import a NotFound component

const RiderDash = () => {
  return (
    <Router>
      <div className="app-container flex">
        <Sidebar />
        <div className="app-content flex-grow ">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default RiderDash;