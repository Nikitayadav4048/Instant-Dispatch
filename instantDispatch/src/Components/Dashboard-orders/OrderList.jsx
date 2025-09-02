import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAccept, handleDetails, handleFilter, fetchBookings, setRiderOrders, updateOrderStatus } from '../redux/ordersSlice'; 
import { useNavigate } from 'react-router-dom';
// import socketService from '../../services/socketService'; // Removed - file missing
import './OrderList.css';
import OrderListDashB from "./OrderListDashB";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredData: orders, loading } = useSelector((state) => state.orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const fetchRiderOrders = async () => {
      try {
        console.log('🔄 Fetching rider orders from API...');
        const response = await fetch(`http://localhost:5002/api/bookings/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('✅ Fetched orders:', data.length, 'orders');
        dispatch(setRiderOrders(data));
      } catch (error) {
        console.error('❌ Error fetching rider orders:', error);
      }
    };
    fetchRiderOrders();

    return () => {};


  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleVehicleFilter = (e) => {
    setVehicleFilter(e.target.value);
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  // Get rider's vehicle type from user profile or default to scooter
  const riderVehicle = user.vehicle || 'scooter';
  
  console.log('🚗 Rider vehicle type:', encodeURIComponent(String(riderVehicle)));
  console.log('📦 Total orders in database:', orders?.length || 0);
  console.log('🔍 Orders by vehicle type:', {
    bike: orders?.filter(o => o.vehicle === 'bike').length || 0,
    scooter: orders?.filter(o => o.vehicle === 'scooter').length || 0,
    miniTruck: orders?.filter(o => o.vehicle === 'miniTruck').length || 0
  });
  
  const filteredOrders = orders?.filter((order) => {
    const matchesSearch = searchTerm === '' || 
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerUsername?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || statusFilter === 'all' || 
      (statusFilter === 'Cancelled' && (order.status === 'Cancelled' || order.status === 'Canceled')) ||
      order.status === statusFilter;
    
    const matchesVehicle = vehicleFilter === '' || order.vehicle === vehicleFilter;
    
    return matchesSearch && matchesStatus && matchesVehicle;
  }) || [];
  
  console.log('✅ Filtered orders:', filteredOrders.length, 'out of', orders?.length || 0);

  // Calculate counts based on all orders
  const ordersCount = orders?.length || 0;
  const outForDeliveryCount = orders?.filter(order => order.status === 'Out for Delivery').length || 0;
  const completeCount = orders?.filter(order => order.status === 'Delivered').length || 0;
  const cancelledCount = orders?.filter(order => order.status === 'Cancelled' || order.status === 'Canceled').length || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
            Order Management
          </h2>
          <p className="text-gray-600">Manage and track all your delivery orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border" style={{borderColor: '#FF7B00'}}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold" style={{color: '#FF7B00'}}>{ordersCount}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border" style={{borderColor: '#FFDD00'}}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Out for Delivery</h3>
            <p className="text-3xl font-bold" style={{color: '#FFDD00'}}>{outForDeliveryCount}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border" style={{borderColor: '#FFB700'}}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed</h3>
            <p className="text-3xl font-bold" style={{color: '#FFB700'}}>{completeCount}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border" style={{borderColor: '#FF4444'}}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Cancelled</h3>
            <p className="text-3xl font-bold" style={{color: '#FF4444'}}>{cancelledCount}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={vehicleFilter}
              onChange={handleVehicleFilter}
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">All Vehicles</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="scooter">Scooter</option>
              <option value="miniTruck">Mini Truck</option>
            </select>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100">
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
            <div key={order._id || order.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">#{order.id}</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                      backgroundColor: order.status === 'Delivered' ? '#FFB700' : 
                                     order.status === 'Out for Delivery' ? '#FFDD00' : '#FF9500',
                      color: 'white'
                    }}>
                      {order.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Customer</p>
                      <p className="font-semibold">{order.customerName || order.customerUsername || order.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Vehicle</p>
                      <p className="font-semibold capitalize">{order.vehicle}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Weight</p>
                      <p className="font-semibold">{order.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Amount</p>
                      <p className="font-semibold" style={{color: '#F8AD42'}}>₹{order.price || order.amount || '50'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => {
                      navigate(`../customer/${order._id || order.id}`);
                    }}
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                    style={{backgroundColor: '#FF8800'}}
                  >
                    View Details
                  </button>
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => {
                        dispatch(updateOrderStatus({ id: order._id || order.id, status: 'Out for Delivery' }));
                        
                        // Socket service removed - file missing
                        console.log('Order accepted:', order._id || order.id);
                      }}
                      className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                      style={{backgroundColor: '#FFA200'}}
                    >
                      Accept
                    </button>
                  )}
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
