import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const OrdersGraph = () => {
  const ordersData = useSelector(state => state.orders.data);

  const totalOrders = ordersData.length;
  const completedOrders = ordersData.filter(order => order.status === 'Delivered').length;
  const pendingOrders = ordersData.filter(order => order.status === 'Pending').length;
  const outForDeliveryOrders = ordersData.filter(order => order.status === 'Out for Delivery').length;
  const canceledOrders = ordersData.filter(order => order.status === 'Canceled').length;
 

  const data = {
    labels: ['Completed Orders', 'Pending Orders', 'Out for Delivery', 'Canceled Orders'],
    datasets: [
      {
        label: 'Orders',
        data: [55,20,10,30],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(54, 162, 235, 0.6)', 
          'rgba(255, 159, 64, 0.6)', 
          'rgba(255, 99, 132, 0.6)'  
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
          'rgba(54, 162, 235, 1)', 
          'rgba(255, 159, 64, 1)', 
          'rgba(255, 99, 132, 1)'  
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="orders-graph-container">
      <h2 className="text-xl font-semibold mb-4">Order Statistics</h2>
      <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default OrdersGraph;
