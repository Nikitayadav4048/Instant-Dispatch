import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Book New Delivery',
      description: 'Schedule a new pickup and delivery',
      icon: '📦',
      action: () => navigate('/book'),
      color: 'bg-orange-500'
    },
    {
      title: 'Track Orders',
      description: 'View all your active deliveries',
      icon: '📍',
      action: () => navigate('/customer-dashboard/orders'),
      color: 'bg-blue-500'
    },
    {
      title: 'Payment History',
      description: 'View your payment records',
      icon: '💳',
      action: () => navigate('/customer-dashboard/payments'),
      color: 'bg-green-500'
    },
    {
      title: 'Support',
      description: 'Get help with your orders',
      icon: '🎧',
      action: () => navigate('/customer-dashboard/support'),
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{action.icon}</span>
              <h4 className="font-medium">{action.title}</h4>
            </div>
            <p className="text-sm text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;