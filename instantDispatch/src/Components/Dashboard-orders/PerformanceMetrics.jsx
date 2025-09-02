import React from 'react';
import './PerformanceMetrics.css';

const PerformanceMetrics = () => {
  const metrics = [
    { id: 1, label: 'Average Delivery Time', value: '30 mins' },
    { id: 2, label: 'Customer Satisfaction', value: '95%' },
    { id: 3, label: 'Total Revenue', value: '$15000' },
    { id: 4, label: 'Order Fulfillment Rate', value: '99%' },
  ];

  return (
    <div className="performance-metrics-container bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
      <ul>
        {metrics.map((metric) => (
          <li key={metric.id} className="metric-item mb-2">
            <span className="metric-label font-bold">{metric.label}:</span> <span className="metric-value">{metric.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceMetrics;
