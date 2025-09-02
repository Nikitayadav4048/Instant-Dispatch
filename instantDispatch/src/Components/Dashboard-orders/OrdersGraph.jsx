import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const OrdersGraph = () => {
  const ordersData = useSelector(state => state.orders.data);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const completedOrders = ordersData.filter(order => order.status === 'Delivered').length;
  const pendingOrders = ordersData.filter(order => order.status === 'Pending').length;
  const outForDeliveryOrders = ordersData.filter(order => order.status === 'Out for Delivery').length;
  const canceledOrders = ordersData.filter(order => order.status === 'Canceled').length;

  const data = {
    labels: ['Delivered', 'Pending', 'In Transit', 'Canceled'],
    datasets: [
      {
        label: 'Orders',
        data: [completedOrders, pendingOrders, outForDeliveryOrders, canceledOrders],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Green for delivered
          'rgba(59, 130, 246, 0.8)',  // Blue for pending
          'rgba(249, 115, 22, 0.8)',  // Orange for in transit
          'rgba(239, 68, 68, 0.8)'    // Red for canceled
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: `${user.username || 'Rider'}'s Order Distribution`,
      },
    },
  };

  const totalOrders = ordersData.length;
  const successRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

  return (
    <div className="orders-graph-container">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Statistics</h2>
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">Total Orders: <span className="font-bold">{totalOrders}</span></p>
        <p className="text-sm text-green-600">Success Rate: <span className="font-bold">{successRate}%</span></p>
      </div>
      <div style={{ width: '280px', height: '280px', margin: '0 auto' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default OrdersGraph;
