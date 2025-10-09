import React, { useState, useEffect } from 'react';

const OrderTracking = ({ orderId }) => {
  const [trackingSteps] = useState([
    { id: 1, title: 'Order Placed', completed: true, time: '10:30 AM' },
    { id: 2, title: 'Rider Assigned', completed: true, time: '10:45 AM' },
    { id: 3, title: 'Pickup in Progress', completed: true, time: '11:00 AM' },
    { id: 4, title: 'Out for Delivery', completed: false, time: '' },
    { id: 5, title: 'Delivered', completed: false, time: '' }
  ]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Track Your Order #{orderId}</h3>
      
      <div className="space-y-4">
        {trackingSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.completed ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step.completed ? '✓' : step.id}
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </h4>
                {step.time && (
                  <span className="text-sm text-gray-500">{step.time}</span>
                )}
              </div>
            </div>
            
            {index < trackingSteps.length - 1 && (
              <div className={`absolute left-4 mt-8 w-0.5 h-6 ${
                step.completed ? 'bg-orange-500' : 'bg-gray-200'
              }`} style={{ marginLeft: '15px' }} />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-orange-50 rounded-lg">
        <p className="text-sm text-orange-800">
          <strong>Estimated Delivery:</strong> 2:30 PM - 3:00 PM
        </p>
        <p className="text-sm text-orange-600 mt-1">
          Your rider will contact you before delivery
        </p>
      </div>
    </div>
  );
};

export default OrderTracking;