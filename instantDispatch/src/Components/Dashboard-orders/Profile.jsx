import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdEdit, MdSave, MdCancel, MdStar, MdTrendingUp, MdLocationOn, MdDirectionsBike, MdRefresh, MdLocalShipping } from 'react-icons/md';
import { fetchBookings } from '../redux/ordersSlice';

const Profile = () => {
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const { data: orders, loading } = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [riderDetails, setRiderDetails] = useState({
    name: "Rider",
    phone: "+1 234 567 890",
    email: "rider@example.com",
    vehicle: "Motorcycle",
    licensePlate: "AB 1234 CD",
    vehicleModel: "",
    licenseNumber: "",
    riderId: "",
    totalDeliveries: 0,
    completedDeliveries: 0,
    pendingDeliveries: 0,
    rating: 4.7,
  });
  const [profileLoading, setProfileLoading] = useState(true);

  // Load rider profile data from localStorage
  useEffect(() => {
    const riderFormData = JSON.parse(localStorage.getItem('riderFormData') || '{}');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    console.log('🔍 Rider Form Data:', riderFormData);
    console.log('👤 User Data:', userData);
    console.log('📋 Final Rider Details:', {
      riderId: riderFormData.riderId || userData.riderId,
      vehicleModel: riderFormData.vehicleModel || userData.vehicleModel,
      licenseNumber: riderFormData.licenseNumber || userData.licenseNumber
    });
    
    setRiderDetails(prev => ({
      ...prev,
      name: riderFormData.fullName || userData.username || user.username || "Rider",
      phone: riderFormData.phoneNumber || userData.phoneNumber || userData.phone || "+1 234 567 890",
      email: riderFormData.email || userData.email || user.email || "rider@example.com",
      vehicle: riderFormData.vehicleType || userData.vehicleType || userData.vehicle || "Motorcycle",
      licensePlate: riderFormData.vehicleNumber || userData.vehicleNumber || "AB 1234 CD",
      vehicleModel: riderFormData.vehicleModel || userData.vehicleModel || "",
      licenseNumber: riderFormData.licenseNumber || userData.licenseNumber || "",
      riderId: riderFormData.riderId || userData.riderId || ""
    }));
    
    setProfileLoading(false);

    // Initial fetch orders
    dispatch(fetchBookings());
    
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      dispatch(fetchBookings());
      setLastUpdate(new Date());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [dispatch, user.id, user.username, user.email]);

  useEffect(() => {
    if (orders.length > 0) {
      const totalDeliveries = orders.length;
      const completedDeliveries = orders.filter(order => order.status === 'Delivered').length;
      const pendingDeliveries = orders.filter(order => order.status === 'Pending').length;
      
      setRiderDetails(prev => ({
        ...prev,
        totalDeliveries,
        completedDeliveries,
        pendingDeliveries
      }));
    }
  }, [orders]);

  // Real-time recent activities with live timestamps
  const recentActivities = [...orders]
    .sort((a, b) => new Date(b.createdAt || b.orderdate) - new Date(a.createdAt || a.orderdate))
    .slice(0, 5)
    .map((order, index) => ({
      id: order._id || index,
      activity: `${order.status === 'Delivered' ? 'Delivered' : order.status === 'Out for Delivery' ? 'Picked Up' : 'Received'} Order #${order.name || order.id}`,
      time: new Date(order.createdAt || order.orderdate).toLocaleString(),
      status: order.status,
      isNew: new Date(order.createdAt || order.orderdate) > new Date(Date.now() - 30000) // New if within last 30 seconds
    }));

  const handleManualRefresh = () => {
    dispatch(fetchBookings());
    setLastUpdate(new Date());
  };

  const getVehicleIcon = (vehicleType) => {
    switch(vehicleType?.toLowerCase()) {
      case 'cycle':
      case 'bicycle':
        return <span className="text-orange-600 text-3xl">🚲</span>;
      case 'bike':
      case 'motorcycle':
      case 'motorbike':
        return <span className="text-orange-600 text-3xl">🏍️</span>;
      case 'scooter':
        return <span className="text-orange-600 text-3xl">🛵</span>;
      case 'car':
      case 'auto':
        return <span className="text-orange-600 text-3xl">🚗</span>;
      case 'minitruck':
      case 'mini truck':
      case 'truck':
        return <span className="text-orange-600 text-3xl">🚚</span>;
      case 'van':
        return <span className="text-orange-600 text-3xl">🚐</span>;
      default:
        return <span className="text-orange-600 text-3xl">🏍️</span>;
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(riderDetails);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setRiderDetails(editedDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
            {riderDetails.name}'s Profile
          </h1>
          <p className="text-gray-600 text-lg">Manage your profile and view delivery performance</p>
        </div>

        {/* Profile Overview Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-orange-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {riderDetails.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{riderDetails.name}</h2>
              <p className="text-gray-600 mb-4">{riderDetails.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MdStar className="text-yellow-500" size={24} />
                <span className="text-2xl font-bold text-gray-800">{riderDetails.rating}</span>
                <span className="text-gray-600">({riderDetails.totalDeliveries} deliveries)</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-xl p-4">
                <MdTrendingUp className="text-green-600 mx-auto mb-2" size={32} />
                <p className="text-green-800 font-bold text-xl">{Math.round((riderDetails.completedDeliveries / riderDetails.totalDeliveries) * 100)}%</p>
                <p className="text-green-600 text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
              <button
                onClick={isEditing ? handleSaveClick : handleEditClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'
                } text-white`}
              >
                {isEditing ? <MdSave size={20} /> : <MdEdit size={20} />}
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
            <div className="space-y-4">
              {['name', 'phone', 'email', 'riderId'].map((field) => (
                <div key={field} className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-600 text-sm mb-1 capitalize">
                    {field === 'riderId' ? 'Rider ID' : field}
                  </p>
                  {isEditing && field !== 'riderId' ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={editedDetails[field]}
                      onChange={handleChange}
                      className="w-full text-lg font-semibold border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{riderDetails[field]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Statistics */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Statistics</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                <p className="text-blue-600 font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-blue-800">{riderDetails.totalDeliveries}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
                <p className="text-green-600 font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-800">{riderDetails.completedDeliveries}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100">
                <p className="text-yellow-600 font-medium">Pending</p>
                <p className="text-3xl font-bold text-yellow-800">{riderDetails.pendingDeliveries}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
                <p className="text-purple-600 font-medium">Earnings</p>
                <p className="text-3xl font-bold text-purple-800">${riderDetails.completedDeliveries * 50}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                {getVehicleIcon(riderDetails.vehicle)}
                <div>
                  <p className="text-orange-600 font-medium">Vehicle Type</p>
                  <p className="text-lg font-bold text-orange-800 capitalize">
                    {riderDetails.vehicle === 'miniTruck' ? 'Mini Truck' : riderDetails.vehicle}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 font-medium mb-1">Vehicle Model</p>
                <p className="text-lg font-bold text-gray-800">{riderDetails.vehicleModel || 'Not specified'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 font-medium mb-1">License Plate</p>
                <p className="text-lg font-bold text-gray-800">{riderDetails.licensePlate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 font-medium mb-1">License Number</p>
                <p className="text-lg font-bold text-gray-800">{riderDetails.licenseNumber || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 font-medium mb-1">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities - Real-time */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Recent Order Activities</h2>
              <p className="text-sm text-gray-500 mt-1">
                Last updated: {lastUpdate.toLocaleTimeString()}
                {loading && <span className="ml-2 text-orange-500">• Updating...</span>}
              </p>
            </div>
            <button
              onClick={handleManualRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              <MdRefresh className={loading ? 'animate-spin' : ''} size={20} />
              Refresh
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.length > 0 ? recentActivities.map((activity) => (
              <div key={activity.id} className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${
                activity.isNew ? 'animate-pulse bg-orange-50 border-orange-400' :
                activity.status === 'Delivered' ? 'bg-green-50 border-green-400' :
                activity.status === 'Out for Delivery' ? 'bg-yellow-50 border-yellow-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-800 font-medium">{activity.activity}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  {activity.isNew && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full animate-bounce">
                      NEW
                    </span>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No recent activities</p>
                <p className="text-sm text-gray-400 mt-1">New orders will appear here automatically</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;