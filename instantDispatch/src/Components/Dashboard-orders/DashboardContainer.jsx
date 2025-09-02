import React from 'react';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';

const DashboardContainer = () => {
  const orders = useSelector((state) => state.orders.data);

  const ordersCount = orders.length;
  const outForDeliveryCount = orders.filter(order => order.status === 'Out for Delivery').length;
  const completeCount = orders.filter(order => order.status === 'Delivered').length;

  return (
    <Dashboard
      ordersCount={ordersCount}
      outForDeliveryCount={outForDeliveryCount}
      completeCount={completeCount}
    />
  );
};

export default DashboardContainer;
