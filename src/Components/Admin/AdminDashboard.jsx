import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeRiders: 0,
    totalCustomers: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await bookingAPI.getAll();
      const orders = response.data;
      
      setStats({
        totalOrders: orders.length,
        activeRiders: 25,
        totalCustomers: 150,
        revenue: orders.reduce((sum, order) => sum + (order.price || 0), 0)
      });
      
      setRecentOrders(orders.slice(0, 10));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.totalOrders}</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Active Riders</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.activeRiders}</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Total Customers</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalCustomers}</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">₹{stats.revenue}</p>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Out for Delivery' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{order.price || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {order.vehicle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;