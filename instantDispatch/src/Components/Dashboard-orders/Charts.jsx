import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import './Charts.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = () => {
  const ordersData = useSelector(state => state.orders.data);

  const ordersByMonth = new Array(12).fill(0);
  ordersData.forEach(order => {
    const orderDate = new Date(order.orderdate);
    const month = orderDate.getMonth(); 
    ordersByMonth[month]++;
  });

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Orders',
        data: ordersByMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="charts-container">
      <h2 className="text-xl font-semibold mb-4">Monthly Orders</h2>
      <Line data={data} />
    </div>
  );
};

export default Charts;
