import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { handleComplete, handleBack } from '../redux/ordersSlice';
import { MdArrowBack, MdLocationOn, MdPhone, MdEmail, MdCheckCircle, MdAccessTime } from 'react-icons/md';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const selectedOrder = useSelector(state => state.orders.selectedOrder);

  if (!selectedOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Order not found</p>
          <button
            onClick={() => navigate('../orders')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const handleCompleteOrder = () => {
    dispatch(handleComplete(selectedOrder._id));
    navigate('../orders');
  };

  const handleBackClick = () => {
    dispatch(handleBack());
    navigate('../orders');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <MdArrowBack size={20} />
            Back to Orders
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Order Details
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order #{selectedOrder.id}</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                selectedOrder.status === 'Out for Delivery' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {selectedOrder.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm mb-1">Customer Name</p>
                <p className="text-lg font-semibold">{selectedOrder.name}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm mb-1">Order Date</p>
                <p className="text-lg font-semibold">{selectedOrder.orderdate}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm mb-1">Delivery Date</p>
                <p className="text-lg font-semibold">{selectedOrder.deliverydate}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm mb-1">Order Amount</p>
                <p className="text-lg font-semibold text-green-600">${selectedOrder.amount || '50.00'}</p>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MdPhone className="text-orange-500" size={20} />
                  <span>{selectedOrder.phone || '+1 234 567 890'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdEmail className="text-orange-500" size={20} />
                  <span>{selectedOrder.email || 'customer@example.com'}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h3>
              <div className="flex items-start gap-3">
                <MdLocationOn className="text-orange-500 mt-1" size={20} />
                <div>
                  <p className="font-semibold">{selectedOrder.pickupLocation || 'Pickup Location'}</p>
                  <p className="text-gray-600 mt-1">to</p>
                  <p className="font-semibold">{selectedOrder.deliveryLocation || 'Delivery Location'}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Items</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>{selectedOrder.itemType || 'Package'}</span>
                  <span className="font-semibold">{selectedOrder.weight || '2kg'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-green-600">${selectedOrder.amount || '50.00'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {selectedOrder.status === 'Out for Delivery' && (
          <div className="mt-8 text-center">
            <button
              onClick={handleCompleteOrder}
              className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors mx-auto text-lg font-semibold"
            >
              <MdCheckCircle size={24} />
              Mark as Delivered
            </button>
          </div>
        )}

        {/* Timeline */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Order Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-semibold">Order Placed</p>
                <p className="text-gray-600 text-sm">{selectedOrder.orderdate}</p>
              </div>
            </div>
            {selectedOrder.status !== 'Pending' && (
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-semibold">Out for Delivery</p>
                  <p className="text-gray-600 text-sm">In progress</p>
                </div>
              </div>
            )}
            {selectedOrder.status === 'Delivered' && (
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-semibold">Delivered</p>
                  <p className="text-gray-600 text-sm">{selectedOrder.deliverydate}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;