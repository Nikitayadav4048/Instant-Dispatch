import { useState, useEffect } from 'react';
import { FaCheck, FaClock, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';

const OrderTracker = ({ orderId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus || 'Pending');

  const steps = [
    { key: 'Pending', label: 'Order Placed', icon: FaClock },
    { key: 'Confirmed', label: 'Confirmed', icon: FaCheck },
    { key: 'Picked Up', label: 'Picked Up', icon: FaTruck },
    { key: 'Out for Delivery', label: 'Out for Delivery', icon: FaTruck },
    { key: 'Delivered', label: 'Delivered', icon: FaMapMarkerAlt }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === status);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Order Status</h3>
      <div className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= getCurrentStepIndex();
          const isCurrent = index === getCurrentStepIndex();
          
          return (
            <div key={step.key} className="flex items-center mb-4 last:mb-0">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                isActive ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 text-gray-400'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="ml-4">
                <p className={`font-medium ${isActive ? 'text-orange-600' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-sm text-orange-500">Current Status</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;