import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdArrowBack } from 'react-icons/io';
import { MdLocationOn, MdPhone, MdPayment, MdDateRange, MdPerson } from 'react-icons/md';
import { AiFillFileText, AiFillCar } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { handleAccept, handleBack, handleReject, handleComplete } from '../redux/ordersSlice'; // Added handleComplete action
import './OrderDetails.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.orders.data.find(order => order.id === Number(orderId)));
  const [isAccepted, setIsAccepted] = useState(order?.status === 'Out for Delivery');
  const [isCompleted, setIsCompleted] = useState(order?.status === 'Delivered');
  const [isRejected, setIsRejected] = useState(order?.status === 'Rejected');

  if (!order) {
    return <div>Order not found</div>;
  }

  const handleBackClick = () => {
    dispatch(handleBack());
    navigate('/orders');
  };

  const handleAcceptClick = () => {
    dispatch(handleAccept(order.id));
    setIsAccepted(true);
  };

  const handleRejectClick = () => {
    dispatch(handleReject(order.id));
    setIsRejected(true);
    navigate('/orders');
  };

  const handleCompleteClick = () => {
    dispatch(handleComplete(order.id));
    setIsCompleted(true);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full p-6 bg-white shadow-lg rounded-lg">
        {/* Header Section */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackClick}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            style={{ border: 'none', background: 'transparent', padding: 0 }}
          >
            <IoMdArrowBack className="text-2xl" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 ml-2">Order Details</h1>
          <span className="ml-auto px-3 py-1 text-sm bg-orange-500 text-white rounded-full">
            {order.status}
          </span>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg bg-[#F8F5F3]">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Customer Info</h2>
            <p className="text-gray-700 mb-2">
              <MdPerson className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">Name:</span> {order.name}
            </p>
            <p className="text-gray-700 mb-2">
              <MdPhone className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">Phone:</span> {order.phoneNumber}
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-[#F8F5F3]">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Order Info</h2>
            <p className="text-gray-700 mb-2">
              <MdLocationOn className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">From:</span> {order.from}
            </p>
            <p className="text-gray-700 mb-2">
              <MdLocationOn className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">To:</span> {order.to}
            </p>
          </div>
        </div>

        {/* Vehicle and Payment Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg bg-[#F8F5F3]">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Vehicle Info</h2>
            <p className="text-gray-700 mb-2">
              <AiFillCar className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">Vehicle:</span> {order.vehicle}
            </p>
            <p className="text-gray-700 mb-2">
              <AiFillFileText className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">Parcel Type:</span> {order.parserType}
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-[#F8F5F3]">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Payment Info</h2>
            <p className="text-gray-700 mb-2">
              <MdPayment className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">Payment:</span> {order.payment}
            </p>
            <p className="text-gray-700 mb-2">
              <MdPayment className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">Subtotal:</span> {order.subtotal}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg bg-[#F8F5F3]">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Date Info</h2>
            <p className="text-gray-700 mb-2">
              <MdDateRange className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">Order Date:</span> {order.orderdate}
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-[#F8F5F3]">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Delivery Info</h2>
            <p className="text-gray-700 mb-2">
              <MdDateRange className="inline-block mr-2 text-xl text-gray-600" />
              <span className="font-medium">Delivery Date:</span> {order.deliverydate}
            </p>
          </div>
        </div>

        {/* Live Tracking Section */}
        <div className="p-4 border border-gray-200 rounded-lg bg-[#F8F5F3] mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            <MdLocationOn className="inline-block mr-2 text-xl text-gray-600" />
            Live Tracking
          </h2>
          <p className="text-gray-700 mb-4">Live tracking is not available at the moment.</p>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" style={{ border: 'none' }}>
            Start tracking
          </button>
        </div>

        {/* Order Completion Section */}
        <div className="p-7 border flex border-gray-200 rounded-lg bg-[#F8F5F3] text-center justify-center gap-2">
          {!isCompleted && !isRejected ? (
            isAccepted ? (
              <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg"
                style={{ border: 'none' }} 
                onClick={handleCompleteClick}>
                Complete Order
              </button>
            ) : (
              <>
                <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg"
                  style={{ border: 'none' }} 
                  onClick={handleAcceptClick}>
                  Accept
                </button>
                <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg"
                  style={{ border: 'none' }} 
                  onClick={handleRejectClick}>
                  Reject
                </button>
              </>
            )
          ) : (
            <button className="mt-3 bg-gray-400 text-white px-4 py-2 rounded-lg" disabled>
              Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
