import React, { useState } from 'react';

const Profile = () => {
  // Example data (replace with actual data from your backend or state)
  const riderDetails = {
    name: "Rampal Singh",
    phone: "+1 234 567 890",
    email: "Rampal_Singh@example.com",
    vehicle: "Motorcycle",
    licensePlate: "AB 1234 CD",
    totalDeliveries: 120,
    completedDeliveries: 115,
    pendingDeliveries: 5,
    rating: 4.7,
  };

  const recentActivities = [
    { id: 1, activity: "Delivered Order #12345", time: "2 hours ago" },
    { id: 2, activity: "Picked Up Order #12346", time: "3 hours ago" },
    { id: 3, activity: "Delivered Order #12347", time: "5 hours ago" },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(riderDetails);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Add logic to save the updated details to your backend
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4">
        {/* Rider Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{riderDetails.name}'s Profile</h1>
          <p className="text-gray-600">Manage your profile and view delivery stats</p>
        </div>

        {/* Rider Details Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              Edit Details
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Full Name</p>
                  <input
                    type="text"
                    name="name"
                    value={editedDetails.name}
                    onChange={handleChange}
                    className="text-lg font-semibold border p-2 rounded-lg w-full"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Phone Number</p>
                  <input
                    type="text"
                    name="phone"
                    value={editedDetails.phone}
                    onChange={handleChange}
                    className="text-lg font-semibold border p-2 rounded-lg w-full"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Email</p>
                  <input
                    type="text"
                    name="email"
                    value={editedDetails.email}
                    onChange={handleChange}
                    className="text-lg font-semibold border p-2 rounded-lg w-full"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Vehicle</p>
                  <input
                    type="text"
                    name="vehicle"
                    value={editedDetails.vehicle}
                    onChange={handleChange}
                    className="text-lg font-semibold border p-2 rounded-lg w-full"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">License Plate</p>
                  <input
                    type="text"
                    name="licensePlate"
                    value={editedDetails.licensePlate}
                    onChange={handleChange}
                    className="text-lg font-semibold border p-2 rounded-lg w-full"
                  />
                </div>
                <div className="col-span-2 text-center">
                  <button
                    onClick={handleSaveClick}
                    className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Full Name</p>
                  <p className="text-lg font-semibold">{riderDetails.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Phone Number</p>
                  <p className="text-lg font-semibold">{riderDetails.phone}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Email</p>
                  <p className="text-lg font-semibold">{riderDetails.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Vehicle</p>
                  <p className="text-lg font-semibold">{riderDetails.vehicle}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">License Plate</p>
                  <p className="text-lg font-semibold">{riderDetails.licensePlate}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Delivery Statistics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Delivery Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-gray-600">Total Deliveries</p>
              <p className="text-2xl font-bold">{riderDetails.totalDeliveries}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-gray-600">Completed Deliveries</p>
              <p className="text-2xl font-bold">{riderDetails.completedDeliveries}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-gray-600">Pending Deliveries</p>
              <p className="text-2xl font-bold">{riderDetails.pendingDeliveries}</p>
            </div>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800">{activity.activity}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
