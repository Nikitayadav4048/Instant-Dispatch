import React, { useState } from 'react';
import OrderContext from './OrderContext';

export const OrderProvider = ({ children }) => {
  const initialData = [
    { id: 1, name: 'John Doe', orderdate: '12 May 2024', deliverydate: '12 May 2024', subtotal: '$1.18', income: '$0.12', from: 'New York', to: 'Los Angeles', status: 'Pending', vehicle: 'Motorcycle Rider', payment: 'Cash On Delivery', phoneNumber: '8795457689', parserType: 'Small' },
    { id: 2, name: 'Jane Smith', orderdate: '12 May 2024', deliverydate: '12 May 2024', subtotal: '$1.18', income: '$0.12', from: 'New York', to: 'Los Angeles', status: 'Pending', vehicle: 'Motorcycle Rider', payment: 'Cash On Delivery', phoneNumber: '8795457689', parserType: 'Small' }
  ];

  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData.filter(order => order.status !== 'Delivered'));
  const [ordersCount, setOrdersCount] = useState(initialData.length);
  const [outForDeliveryCount, setOutForDeliveryCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAccept = (id) => {
    const updatedData = data.map(item => item.id === id ? { ...item, status: 'Out for Delivery' } : item);
    setData(updatedData);
    setFilteredData(updatedData.filter(order => order.status !== 'Delivered'));
    setOutForDeliveryCount(prevCount => prevCount + 1);
  };

  const handleDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  const handleComplete = (id) => {
    const updatedData = data.map(item => item.id === id ? { ...item, status: 'Delivered' } : item);
    setData(updatedData);
    setFilteredData(updatedData.filter(order => order.status !== 'Delivered'));
    setOrdersCount(prevCount => prevCount - 1);
    setCompleteCount(prevCount => prevCount + 1);
    setOutForDeliveryCount(prevCount => prevCount - 1);
    setSelectedOrder(null);
  };

  const handleFilter = (status) => {
    if (status === 'all') {
      setFilteredData(data.filter(order => order.status !== 'Delivered'));
    } else {
      const filteredOrders = data.filter(order => order.status === status);
      setFilteredData(filteredOrders);
    }
  };

  return (
    <OrderContext.Provider value={{ data, filteredData, ordersCount, outForDeliveryCount, completeCount, selectedOrder, handleAccept, handleDetails, handleBack, handleComplete, handleFilter }}>
      {children}
    </OrderContext.Provider>
  );
};
