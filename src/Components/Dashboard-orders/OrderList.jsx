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
    const riderData = JSON.parse(localStorage.getItem('riderFormData') || '{}');
    
    // Set default vehicle filter based on rider's vehicle type
    if (riderData.vehicleType) {
      setVehicleFilter(riderData.vehicleType);
    }
    
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
  
  const filteredOrders = orders?.filter((order) => {
    const matchesSearch = searchTerm === '' || 
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerUsername?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || statusFilter === 'all' || 
      (statusFilter === 'Cancelled' && (order.status === 'Cancelled' || order.status === 'Canceled')) ||
      order.status === statusFilter;
    
    const matchesVehicle = vehicleFilter === '' || order.vehicle?.toLowerCase() === vehicleFilter.toLowerCase();
    
    console.log('Search Debug:', {
      searchTerm,
      orderName: order.name,
      customerName: order.customerName,
      customerUsername: order.customerUsername,
      email: order.email,
      customerEmail: order.customerEmail,
      matchesSearch
    });
    
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
          <h2 className="text-4xl font-bold text-black mb-4">
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
          <style>
            {`
              * {
                -webkit-tap-highlight-color: transparent !important;
              }
              select {
                -webkit-appearance: none !important;
                -moz-appearance: none !important;
                appearance: none !important;
                background-image: none !important;
              }
              select::-webkit-scrollbar {
                width: 8px;
              }
              select::-webkit-scrollbar-track {
                background: #FFF7ED;
              }
              select::-webkit-scrollbar-thumb {
                background: #FB923C;
                border-radius: 4px;
              }
              select option {
                background-color: white !important;
                background: white !important;
                color: #333 !important;
                padding: 8px !important;
              }
              select option:hover {
                background-color: #FFF7ED !important;
                background: #FFF7ED !important;
                color: #FF8800 !important;
              }
              select option:checked {
                background-color: #FB923C !important;
                background: #FB923C !important;
                color: white !important;
              }
              select option:focus {
                background-color: #FFF7ED !important;
                background: #FFF7ED !important;
                color: #FF8800 !important;
              }
              select:focus {
                outline: none !important;
                box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1) !important;
              }
              select option[selected] {
                background-color: #FB923C !important;
                background: #FB923C !important;
                color: white !important;
              }
              select option:active {
                background-color: #FFF7ED !important;
                background: #FFF7ED !important;
                color: #FF8800 !important;
              }
              select option::selection {
                background-color: #FFF7ED !important;
                background: #FFF7ED !important;
                color: #FF8800 !important;
              }
              select option::-moz-selection {
                background-color: #FFF7ED !important;
                background: #FFF7ED !important;
                color: #FF8800 !important;
              }
              
              /* Force override browser default blue hover */
              select option:hover,
              select option:focus,
              select option:active {
                background-color: #FFF7ED !important;
                background: #FFF7ED !important;
                color: #FF8800 !important;
                outline: none !important;
                border: none !important;
              }
              
              /* Webkit specific overrides */
              select::-webkit-list-button {
                display: none;
              }
              
              select option {
                -webkit-appearance: none !important;
                -moz-appearance: none !important;
                appearance: none !important;
              }
              
              /* Remove all blue highlights */
              select, select:focus, select:active, select:hover {
                -webkit-tap-highlight-color: transparent !important;
                -webkit-focus-ring-color: transparent !important;
              }
                select option:hover {
  background-color: #FFF7ED !important;
  color: #FF8800 !important;
}
              
              /* Global override for all option elements */
              option {
                background-color: white !important;
                color: #333 !important;
              }
              
              option:hover {
                background-color: #FFF7ED !important;
                background: #FFF7ED !important;
                color: #FF8800 !important;
              }
              
              option:checked {
                background-color: #FB923C !important;
                background: #FB923C !important;
                color: white !important;
              }
              
              /* Browser specific overrides */
              select option:hover {
                background: linear-gradient(0deg, #FFF7ED 0%, #FFF7ED 100%) !important;
                color: #FF8800 !important;
              }
              
              select option:checked {
                background: linear-gradient(0deg, #FB923C 0%, #FB923C 100%) !important;
                color: white !important;
              }
              
              /* Force remove blue on all browsers */
              select option:focus {
                background: #FFF7ED !important;
                color: #FF8800 !important;
              }
              
              /* Disable default browser styling */
              select {
                color-scheme: light !important;
              }
              
              /* Ultimate override - target specific elements */
              .cursor-pointer option {
                background-color: #FFF7ED !important;
                background-image: none !important;
                background: #FFF7ED !important;
              }
              
              .cursor-pointer option:hover {
                background-color: #FB923C !important;
                background-image: none !important;
                background: #FB923C !important;
                color: white !important;
              }
              
              /* Force orange background on all states */
              select.cursor-pointer option:hover,
              select.cursor-pointer option:focus,
              select.cursor-pointer option:active {
                background: #FB923C !important;
                background-color: #FB923C !important;
                background-image: none !important;
                color: white !important;
              }
              
              select.cursor-pointer option:checked {
                background: #FF8800 !important;
                background-color: #FF8800 !important;
                background-image: none !important;
                color: white !important;
              }
              
              /* Final attempt - direct CSS injection */
              select option:hover {
                background-color: #FB923C !important;
                background: #FB923C !important;
                color: white !important;
              }
              
              option:hover {
                background-color: #FB923C !important;
                background: #FB923C !important;
                color: white !important;
              }
            `}
          </style>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by customer name, email, or order ID..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-1"
              style={{
                padding: '12px',
                border: '2px solid #FED7AA',
                borderRadius: '12px',
                outline: 'none',
                backgroundColor: 'white',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FB923C'}
              onBlur={(e) => e.target.style.borderColor = '#FED7AA'}
            />
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="cursor-pointer"
              style={{
                padding: '12px',
                border: '2px solid #FED7AA',
                borderRadius: '12px',
                outline: 'none',
                backgroundColor: 'white',
                minWidth: '150px',
                cursor: 'pointer',
                color: '#FF8800',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FB923C';
                e.target.style.boxShadow = '0 0 0 3px rgba(251, 146, 60, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#FED7AA';
                e.target.style.boxShadow = 'none';
              }}
              onMouseEnter={(e) => e.target.style.borderColor = '#FDBA74'}
              onMouseLeave={(e) => e.target.style.borderColor = '#FED7AA'}
            >
              <option value="all" style={{backgroundColor: '#FFF7ED', color: '#FF8800'}}>All Statuses</option>
              <option value="Pending" style={{backgroundColor: '#FFF7ED', color: '#EF4444'}}>Pending</option>
              <option value="Out for Delivery" style={{backgroundColor: '#FFF7ED', color: '#FF8800'}}>Out for Delivery</option>
              <option value="Delivered" style={{backgroundColor: '#FFF7ED', color: '#10B981'}}>Delivered</option>
              <option value="Cancelled" style={{backgroundColor: '#FFF7ED', color: '#EF4444'}}>Cancelled</option>
            </select>
            <select
              value={vehicleFilter}
              onChange={handleVehicleFilter}
              className="cursor-pointer"
              style={{
                padding: '12px',
                border: '2px solid #FED7AA',
                borderRadius: '12px',
                outline: 'none',
                backgroundColor: 'white',
                minWidth: '150px',
                cursor: 'pointer',
                color: '#FF8800',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FB923C';
                e.target.style.boxShadow = '0 0 0 3px rgba(251, 146, 60, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#FED7AA';
                e.target.style.boxShadow = 'none';
              }}
              onMouseEnter={(e) => e.target.style.borderColor = '#FDBA74'}
              onMouseLeave={(e) => e.target.style.borderColor = '#FED7AA'}
            >
              <option value="" style={{backgroundColor: '#FFF7ED', color: '#FF8800'}}>All Vehicles</option>
              <option value="cycle" style={{backgroundColor: '#FFF7ED', color: '#FF6600'}}>Cycle</option>
              <option value="bike" style={{backgroundColor: '#FFF7ED', color: '#FF8800'}}>Bike</option>
              <option value="miniTruck" style={{backgroundColor: '#FFF7ED', color: '#FFA500'}}>Mini Truck</option>
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
                      backgroundColor: order.status === 'Delivered' ? '#10B981' : 
                                     order.status === 'Out for Delivery' ? '#FF8800' : '#EF4444',
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
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors border-0 cursor-pointer"
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
                      className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors border-0 cursor-pointer"
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
