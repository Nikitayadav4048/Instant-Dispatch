import React from 'react';
import './OverviewCards.css';

const OverviewCards = () => {
  return (
    <div className="overview-cards grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-semibold mb-2">Total Orders</h3>
        <p className="text-lg font-bold">123</p>
      </div>
      <div className="card bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-semibold mb-2">Out for Delivery</h3>
        <p className="text-lg font-bold">45</p>
      </div>
      <div className="card bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-semibold mb-2">Completed Orders</h3>
        <p className="text-lg font-bold">78</p>
      </div>
    </div>
  );
};

export default OverviewCards;
