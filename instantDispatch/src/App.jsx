// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchBookings } from './Components/redux/ordersSlice';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Orderlisthead from "./Components/Orderlist/Orderlisthead";

// const router = createBrowserRouter([
//   {
//     path: "/order",
//     element: <Orderlisthead />
//   }
// ]);

// export default function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchBookings());
//   }, [dispatch]);

//   return <RouterProvider router={router} />;
// }

// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchBookings } from './Components/redux/ordersSlice';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Orderlisthead from "./Components/Orderlist/Orderlisthead";

// const router = createBrowserRouter([
//   {
//     path: "/order",
//     element: <Orderlisthead />
//   }
// ]);

// export default function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchBookings());
//   }, [dispatch]);

//   return <RouterProvider router={router} />;
// }

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBookings } from './Components/redux/ordersSlice';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Orderlisthead from "./Components/Orderlist/Orderlisthead";
import OrderDetails from "./Components/Orderlist/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Orderlisthead />
  },
  {
    path: "/order/:id",
    element: <OrderDetails />
  }
]);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
