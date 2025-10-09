import React from 'react';

const EarningsReport = () => {
  const earningsData = {
    today: 450,
    thisWeek: 2800,
    thisMonth: 12500,
    totalOrders: 45,
    avgPerOrder: 278
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Earnings Report</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <h4 className="text-2xl font-bold text-orange-600">₹{earningsData.today}</h4>
          <p className="text-sm text-gray-600">Today</p>
        </div>
        
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <h4 className="text-2xl font-bold text-blue-600">₹{earningsData.thisWeek}</h4>
          <p className="text-sm text-gray-600">This Week</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <h4 className="text-2xl font-bold text-green-600">₹{earningsData.thisMonth}</h4>
          <p className="text-sm text-gray-600">This Month</p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <h4 className="text-2xl font-bold text-purple-600">{earningsData.totalOrders}</h4>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Average per order:</span>
          <span className="font-semibold text-lg">₹{earningsData.avgPerOrder}</span>
        </div>
      </div>
    </div>
  );
};

export default EarningsReport;