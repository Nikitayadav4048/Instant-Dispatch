import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import './Charts.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Charts = () => {
  const ordersData = useSelector(state => state.orders.data);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const ordersByMonth = new Array(12).fill(0);
  const deliveredByMonth = new Array(12).fill(0);
  
  ordersData.forEach(order => {
    const orderDate = new Date(order.orderdate);
    const month = orderDate.getMonth(); 
    ordersByMonth[month]++;
    if (order.status === 'Delivered') {
      deliveredByMonth[month]++;
    }
  });

  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Total Orders',
        data: ordersByMonth,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Delivered Orders',
        data: deliveredByMonth,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${user.username || 'Rider'}'s Monthly Performance`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="charts-container">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Orders Trend</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Charts;
