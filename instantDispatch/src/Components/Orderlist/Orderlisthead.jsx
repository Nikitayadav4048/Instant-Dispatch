/* eslint-disable react/no-unescaped-entities */



// import './orderlisthead.css';
// import Footer from '../homecomponent/Footer';
// import Dashboard from './Dashboard';
// import OrderDetails from './OrderDetails';
// import { useSelector, useDispatch } from 'react-redux';
// import { handleDetails, handleBack, handleComplete, handleFilter, handleReject } from '../redux/ordersSlice';
// import CustomerNav from '../NavbarComponents/CustomerNav';

// const Orderlisthead = () => {
//   const dispatch = useDispatch();
//   const { filteredData, selectedOrder, ordersCount, outForDeliveryCount, completeCount } = useSelector(state => state.orders);

//   if (!filteredData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       {!selectedOrder && <CustomerNav />}
//       {selectedOrder ? (
//         <OrderDetails order={selectedOrder} onBack={() => dispatch(handleBack())} onComplete={() => dispatch(handleComplete(selectedOrder.id))} />
//       ) : (
//         <>
//           <div className="orderlistheader text-center justify-center py-40">
//             <h1 className="">Orders</h1>
//             <p>Your Route, Your Earnings</p>
//           </div>
//           <Dashboard 
//             ordersCount={ordersCount}
//             outForDeliveryCount={outForDeliveryCount}
//             completeCount={completeCount}
//             onFilter={(status) => dispatch(handleFilter(status))}
//           />
//           <div className="container mx-auto p-6 tablecon">
//             <h2 className="text-xl font-semibold mb-6 ml-6">Today's Orders</h2>
//             <table className="min-w-full bg-white text-center justify-center">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b bg-orange-300">Order ID</th>
//                   <th className="py-2 px-4 border-b bg-orange-300">Name</th>
//                   <th className="py-2 px-4 border-b bg-orange-300">Delivery Date</th>
//                   <th className="py-2 px-4 border-b bg-orange-300">Income</th>
//                   <th className="py-2 px-4 border-b bg-orange-300 status-column">Status</th>
//                   <th className="py-2 px-4 border-b bg-orange-300" colSpan="2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item) => (
//                   <tr key={item.id}>
//                     <td className="py-2 px-4">{item.id}</td>
//                     <td className="py-2 px-4">{item.name}</td>
//                     <td className="py-2 px-4">{item.deliverydate}</td>
//                     <td className="py-2 px-4">{item.income}</td>
//                     <td className="py-2 px-4 status-column">{item.status}</td>
//                     <td className="py-2 px-4 border">
//                       {item.status === 'Out for Delivery' ? (
//                         <>
//                           <button onClick={() => dispatch(handleComplete(item.id))} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">
//                             Complete
//                           </button>
//                           <button onClick={() => dispatch(handleDetails(item))} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none ml-2">
//                             Details
//                           </button>
//                         </>
//                       ) : item.status === 'Delivered' ? (
//                         <button disabled className="btn-color font-bold py-1 px-2 rounded border-none">
//                           Completed
//                         </button>
//                       ) : (
//                         <>
//                           <button onClick={() => dispatch(handleDetails(item))} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">
//                             Details
//                           </button>
//                           {/* <button onClick={() => dispatch(handleReject(item.id))} className="bg-black hover:bg-black text-white font-bold py-1 px-2 rounded ml-2 border-none">
//                             Reject
//                           </button> */}
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//       {!selectedOrder && <Footer />}
//     </>
//   );
// };

// export default Orderlisthead;


// import './orderlisthead.css';
// import Footer from '../homecomponent/Footer';
// import Dashboard from './Dashboard';
// import OrderDetails from './OrderDetails';
// import { useSelector, useDispatch } from 'react-redux';
// import { handleDetails, handleBack, handleComplete, handleFilter, handleReject } from '../redux/ordersSlice';
// import CustomerNav from '../NavbarComponents/CustomerNav';

// const Orderlisthead = () => {
//   const dispatch = useDispatch();
//   const { filteredData, selectedOrder, ordersCount, outForDeliveryCount, completeCount } = useSelector(state => state.orders);

//   if (!filteredData) {
//     return <div>Loading...</div>;
//   }

//   console.log('Orders Count:', ordersCount); // Debugging log

//   return (
//     <>
//       {!selectedOrder && <CustomerNav />}
//       {selectedOrder ? (
//         <OrderDetails order={selectedOrder} onBack={() => dispatch(handleBack())} onComplete={() => dispatch(handleComplete(selectedOrder.id))} />
//       ) : (
//         <>
//           <div className="orderlistheader text-center justify-center py-40">
//             <h1 className="">Orders</h1>
//             <p>Your Route, Your Earnings</p>
//           </div>
//           <Dashboard 
//             ordersCount={ordersCount}
//             outForDeliveryCount={outForDeliveryCount}
//             completeCount={completeCount}
//             onFilter={(status) => dispatch(handleFilter(status))}
//           />
//           <div className="container mx-auto p-6 tablecon">
//             <h2 className="text-xl font-semibold mb-6 ml-6">Today's Orders</h2>
//             <table className="min-w-full bg-white text-center justify-center">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b bg-orange-300">Order ID</th>
//                   <th className="py-2 px-4 border-b bg-orange-300">Name</th>
//                   <th className="py-2 px-4 border-b bg-orange-300">Delivery Date</th>
//                   <th className="py-2 px-4 border-b bg-orange-300">Income</th>
//                   <th className="py-2 px-4 border-b bg-orange-300 status-column">Status</th>
//                   <th className="py-2 px-4 border-b bg-orange-300" colSpan="2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item) => (
//                   <tr key={item.id}>
//                     <td className="py-2 px-4">{item._id}</td>
//                     <td className="py-2 px-4">{item.name}</td>
//                     <td className="py-2 px-4">{item.deliverydate}</td>
//                     <td className="py-2 px-4">{item.income}</td>
//                     <td className="py-2 px-4 status-column">{item.status}</td>
//                     <td className="py-2 px-4 border">
//                       {item.status === 'Out for Delivery' ? (
//                         <>
//                           <button onClick={() => dispatch(handleComplete(item.id))} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">
//                             Complete
//                           </button>
//                           <button onClick={() => dispatch(handleDetails(item))} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none ml-2">
//                             Details
//                           </button>
//                         </>
//                       ) : item.status === 'Delivered' ? (
//                         <button disabled className="btn-color font-bold py-1 px-2 rounded border-none">
//                           Completed
//                         </button>
//                       ) : (
//                         <>
//                           <button onClick={() => dispatch(handleDetails(item))} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">
//                             Details
//                           </button>
//                           {/* <button onClick={() => dispatch(handleReject(item.id))} className="bg-black hover:bg-black text-white font-bold py-1 px-2 rounded ml-2 border-none">
//                             Reject
//                           </button> */}
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//       {!selectedOrder && <Footer />}
//     </>
//   );
// };

// export default Orderlisthead;

import  { useEffect } from 'react';
import './orderlisthead.css';

import Dashboard from './Dashboard';
import OrderDetails from './OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { handleDetails, handleComplete, handleAccept, handleFilter, fetchBookings } from '../redux/ordersSlice';


const Orderlisthead = () => {
  const dispatch = useDispatch();
  const { filteredData, selectedOrder, ordersCount, outForDeliveryCount, completeCount } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (!filteredData) {
    return <div>Loading...</div>;
  }

  return (
    <>
     
      {selectedOrder ? (
        <OrderDetails />
      ) : (
        <>
          <div className="orderlistheader text-center justify-center py-40">
            <h1 className="text-left pl-20">Orders</h1>
            <p className="text-left pl-10">Your Route, Your Earnings</p>
          </div>
          <Dashboard 
            ordersCount={ordersCount}
            outForDeliveryCount={outForDeliveryCount}
            completeCount={completeCount}
            onFilter={(status) => dispatch(handleFilter(status))}
          />
          <div className="container mx-auto p-6 tablecon">
            <h2 className="text-xl font-semibold mb-6 ml-6">Today's Orders</h2>
            <table className="min-w-full bg-white text-center justify-center">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b bg-orange-300">Order ID</th>
                  <th className="py-2 px-4 border-b bg-orange-300">Name</th>
                  <th className="py-2 px-4 border-b bg-orange-300">Delivery Date</th>
                  <th className="py-2 px-4 border-b bg-orange-300">Income</th>
                  <th className="py-2 px-4 border-b bg-orange-300 status-column">Status</th>
                  <th className="py-2 px-4 border-b bg-orange-300" colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item._id}>
                    <td className="py-2 px-4">{item._id}</td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{new Date(item.deliveryTime).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{item.price}</td>
                    <td className="py-2 px-4 status-column">{item.status}</td>
                    <td className="py-2 px-4 border">
                      {item.status === 'Out for Delivery' ? (
                        <>
                          <button onClick={() => dispatch(handleComplete(item._id))} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">
                            Complete
                          </button>
                          <button onClick={() => dispatch(handleDetails(item))} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none ml-2">
                            Details
                          </button>
                        </>
                      ) : item.status === 'Delivered' ? (
                        <button disabled className="btn-color font-bold py-1 px-2 rounded border-none">
                          Completed
                        </button>
                      ) : (
                        <>
                          <button onClick={() => dispatch(handleDetails(item))} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">
                            Details
                          </button>
                          <button onClick={() => dispatch(handleAccept(item._id))} className="bg-black hover:bg-black text-white font-bold py-1 px-2 rounded ml-2 border-none">
                            Accept
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
     
    </>
  );
};

export default Orderlisthead;
