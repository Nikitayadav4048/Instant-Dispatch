import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAccept, handleDetails, handleFilter } from '../redux/ordersSlice'; 
import { useNavigate } from 'react-router-dom';
import './OrderList.css';
import OrderListDashB from "./OrderListDashB";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders.filteredData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    // Fetch orders if you have a fetching mechanism, otherwise we use the initial state
    // dispatch(fetchOrders());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    dispatch(handleFilter(e.target.value));
  };

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ordersCount = orders.length;
  const outForDeliveryCount = orders.filter(order => order.status === 'Out for Delivery').length;
  const completeCount = orders.filter(order => order.status === 'Delivered').length;

  return (
    <>
      <OrderListDashB
        ordersCount={ordersCount}
        outForDeliveryCount={outForDeliveryCount}
        completeCount={completeCount}
      />
      <div className="orders-page-container">
        <h2 className="text-3xl font-bold mb-8">Orders</h2>
        <div className="search-filter-container mb-6">
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select value={statusFilter} onChange={handleStatusFilter} className="filter-select">
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.orderdate}</td>
                <td>{order.deliverydate}</td>
                <td>{order.status}</td>
                <td>
                  <button className="action-button" onClick={() => {
                    dispatch(handleDetails(order));
                    navigate(`/orders/${order.id}`);
                  }}>Details</button>
                  <button className="action-button" onClick={() => dispatch(handleAccept(order.id))}>Accept</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersPage;
