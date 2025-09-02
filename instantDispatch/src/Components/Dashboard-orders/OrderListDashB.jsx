import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { handleFilter } from '../redux/ordersSlice';
import { MdAccountCircle } from "react-icons/md";
import './OrderListDashBoard.css';

const OrderListDashB = ({ ordersCount, outForDeliveryCount, completeCount }) => {
  const dispatch = useDispatch();

  const onFilter = useCallback((status) => {
    dispatch(handleFilter(status));
  }, [dispatch]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md dashboard">
      {/* <h2 className="text-3xl font-bold mb-4">Overview</h2> */}
       <header className="dashboard-header flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Overview</h1>
                <div className="user-info flex items-center">
                  {/* <img src="path_to_avatar_image" alt="User Avatar" className="avatar w-10 h-10 rounded-full" /> */}
                  <MdAccountCircle size={30} />
                  <span className="ml-2 text-lg">Rampal Singh</span>
                </div>
              </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="dashcolor p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-1xl font-bold mb-2">Orders</h3>
            <button
              onClick={() => onFilter('all')}
              className="view-btn hover:bg-orange-500 font-bold py-1 px-2 rounded border-none"
              aria-label="View All Orders"
            >
              View Orders
            </button>
          </div>
          <p className="text-lg font-bold">{ordersCount}</p>
        </div>
        <div className="dashcolor p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold mb-2">Out for Delivery</h3>
            <button
              onClick={() => onFilter('Out for Delivery')}
              className="view-btn hover:bg-orange-500 font-bold py-1 px-2 rounded border-none"
              aria-label="View Out for Delivery Orders"
            >
              Out for Delivery
            </button>
          </div>
          <p className="text-lg font-bold">{outForDeliveryCount}</p>
        </div>
        <div className="dashcolor p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold mb-2">Delivered</h3>
            <button
              onClick={() => onFilter('Delivered')}
              className="view-btn hover:bg-orange-500 font-bold py-1 px-2 rounded border-none"
              aria-label="View Delivered Orders"
            >
              Delivered
            </button>
          </div>
          <p className="text-lg font-bold">{completeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderListDashB;
