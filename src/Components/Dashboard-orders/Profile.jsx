import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const [riderFormData] = useState(() => JSON.parse(localStorage.getItem('riderFormData') || '{}'));
  const [riderDetails, setRiderDetails] = useState(() => {
    console.log('Rider form data:', riderFormData);
    console.log('Vehicle type from form:', riderFormData.vehicleType);
    return {
      name: riderFormData.fullName || user.username || "Rider",
      phone: riderFormData.phoneNumber || "Not provided",
      email: riderFormData.email || user.email || "Not provided",
      vehicle: riderFormData.vehicleType || "Not selected",
      licensePlate: riderFormData.vehicleNumber || "Not provided",
      vehicleModel: riderFormData.vehicleModel || "Not provided",
      licenseNumber: riderFormData.licenseNumber || "Not provided",
      riderId: riderFormData.riderId || "Not assigned",
      totalDeliveries: 0,
      completedDeliveries: 0,
      pendingDeliveries: 0,
      rating: 4.8,
      hasLicense: riderFormData.hasLicense || false
    };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiderStats();
  }, []);

  const fetchRiderStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5002/api/bookings');
      const allOrders = response.data || [];
      
      console.log('All orders:', allOrders);
      console.log('Current user:', user);
      console.log('Rider form data:', riderFormData);
      
      const riderOrders = allOrders.filter(order => {
        const matches = (
          order.riderId === user.id || 
          order.riderId === user._id ||
          order.riderEmail === user.email ||
          order.riderEmail === riderFormData.email ||
          order.assignedRider === user.username ||
          order.assignedRider === riderFormData.fullName ||
          order.riderName === user.username ||
          order.riderName === riderFormData.fullName
        );
        console.log('Order match check:', order, 'matches:', matches);
        return matches;
      });
      
      console.log('Filtered rider orders:', riderOrders);
      
      const totalDeliveries = riderOrders.length;
      const completedDeliveries = riderOrders.filter(order => 
        order.status === 'Delivered' || order.status === 'completed'
      ).length;
      const pendingDeliveries = riderOrders.filter(order => 
        order.status === 'Pending' || order.status === 'Out for Delivery' || order.status === 'pending'
      ).length;
      
      setRiderDetails(prev => ({
        ...prev,
        totalDeliveries,
        completedDeliveries,
        pendingDeliveries
      }));
    } catch (error) {
      console.error('Error fetching rider stats:', error);
      // Set some default values if API fails
      setRiderDetails(prev => ({
        ...prev,
        totalDeliveries: 0,
        completedDeliveries: 0,
        pendingDeliveries: 0
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
            {riderDetails.name}'s Profile
          </h1>
          <p className="text-gray-600 text-lg">Manage your profile and view delivery performance</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-orange-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {riderDetails.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{riderDetails.name}</h2>
              <p className="text-gray-600 mb-4">{riderDetails.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-yellow-500 text-2xl">⭐</span>
                <span className="text-2xl font-bold text-gray-800">{riderDetails.rating}</span>
                <span className="text-gray-600">({riderDetails.totalDeliveries} deliveries)</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-xl p-4">
                <div className="text-green-600 text-3xl text-center mb-2">📈</div>
                <p className="text-green-800 font-bold text-xl">{riderDetails.totalDeliveries > 0 ? Math.round((riderDetails.completedDeliveries / riderDetails.totalDeliveries) * 100) : 0}%</p>
                <p className="text-green-600 text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm mb-1">Name</p>
                <p className="text-lg font-semibold">{riderDetails.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm mb-1">Phone</p>
                <p className="text-lg font-semibold">{riderDetails.phone}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm mb-1">Email</p>
                <p className="text-lg font-semibold">{riderDetails.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm mb-1">Rider ID</p>
                <p className="text-lg font-semibold">{riderDetails.riderId}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Statistics</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading stats...</p>
              </div>
            ) : (
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
                  <p className="text-3xl font-bold text-purple-800">₹{riderDetails.completedDeliveries * 50}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                <span className="text-orange-600 text-3xl">
                  {riderDetails.vehicle === 'cycle' ? '🚲' : 
                   riderDetails.vehicle === 'bike' || riderDetails.vehicle === 'motorcycle' ? '🏍️' : 
                   riderDetails.vehicle === 'miniTruck' ? '🚚' : '🚗'}
                </span>
                <div>
                  <p className="text-orange-600 font-medium">Vehicle Type</p>
                  <p className="text-lg font-bold text-orange-800 capitalize">
                    {riderDetails.vehicle === 'motorcycle' ? 'Motorcycle' : 
                     riderDetails.vehicle === 'bike' ? 'Motorcycle' :
                     riderDetails.vehicle === 'cycle' ? 'Bicycle' :
                     riderDetails.vehicle === 'miniTruck' ? 'Mini Truck' :
                     riderDetails.vehicle || 'Not selected'}
                  </p>
                </div>
              </div>
              {riderDetails.vehicle !== 'cycle' && (
                <>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-600 font-medium mb-1">Vehicle Model</p>
                    <p className="text-lg font-bold text-gray-800">{riderDetails.vehicleModel}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-600 font-medium mb-1">License Plate</p>
                    <p className="text-lg font-bold text-gray-800">{riderDetails.licensePlate}</p>
                  </div>
                  {riderDetails.hasLicense && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-gray-600 font-medium mb-1">License Number</p>
                      <p className="text-lg font-bold text-gray-800">{riderDetails.licenseNumber}</p>
                    </div>
                  )}
                </>
              )}
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 font-medium mb-1">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;