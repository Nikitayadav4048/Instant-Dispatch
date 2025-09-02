import React from 'react';
import DashboardContainer from './DashboardContainer'; 
import OrderList from './OrderList'; 

const OrdersPage = () => {
  return (
    <div className="orders-page-container">
      <DashboardContainer /> 
      <OrderList />
    </div>
  );
};

export default OrdersPage;
