// import Book from "./Book";
// import About from "./About";
// import Career from "./Career";
// import {createBrowserRouter, RouterProvider} from "react-router-dom"
// import Servicespage from "./Servicespage";
// import Home from "./home";

// import OrderDetails from "./Components/Orderlist/OrderDetails";
// import Orderpage from "./Orderpage";

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<Home/>
//   },
//   {
//     path:"/about",
//     element:<About/>
//   },
//   {
//     path:"/career",
//     element:<Career/>
//   },
//   {
//     path:"/book",
//     element:<Book/>
//   },
//   {
//     path:"/services",
//     element:<Servicespage/>
//   },
//   {
//     path:"/order",
//     element:<Orderpage/>
//   },
//   {
//     path:"/order:id",
//     element:<OrderDetails/>
//   }
// ]);

// export default function App() {
//   return <RouterProvider router={router} />  
// }



import Book from "./Book";
import About from "./About";
import Career from "./Career";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Servicespage from "./Servicespage";
import Home from "./Home";

import OrderDetails from "./Components/Orderlist/Orderdetails";
import Orderpage from "./Orderpage";
import RiderForm from "./Components/NavbarComponents/RiderForm";
import TestRiderForm from "./TestRiderForm";
import UserSignup from "./Components/NavbarComponents/UserSignup";
import UserLogin from "./Components/NavbarComponents/UserLogin";
import RiderDash from "./RiderDash";
import CustomerDashboard from "./Components/Customer-Dashboard/CustomerDashboard";
import CustomerNotifications from "./Components/Customer-Dashboard/CustomerNotifications";
import CustomerProfile from "./Components/Customer-Dashboard/CustomerProfile";
import Profile from "./Components/Profile";

import MyOrders from "./Components/Customer-Dashboard/MyOrders";
import { Provider } from 'react-redux';
import store from './Components/redux/store';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    errorElement: <div>Something went wrong!</div>
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/career",
    element:<Career/>
  },
  {
    path:"/book",
    element:<Book/>
  },
  {
    path:"/services",
    element:<Servicespage/>
  },
  {
    path:"/order",
    element:<Orderpage/>
  },
  {
    path:"/order:id",
    element:<OrderDetails/>
  },
  {
    path:"/rider-form",
    element:<RiderForm/>
  },
  {
    path:"/test-rider-form",
    element:<TestRiderForm/>
  },
  {
    path:"/signup",
    element:<UserSignup/>
  },
  {
    path:"/login",
    element:<UserLogin/>
  },
  {
    path:"/rider-dashboard/*",
    element:<RiderDash/>
  },
  {
    path:"/customer-dashboard",
    element:<CustomerDashboard/>
  },
  {
    path:"/customer-notifications",
    element:<CustomerNotifications/>
  },
  {
    path:"/customer-profile",
    element:<CustomerProfile/>
  },
  {
    path:"/notifications",
    element:<CustomerNotifications/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/order-history",
    element:<MyOrders/>
  },
  {
    path:"/my-orders",
    element:<MyOrders/>
  },
  {
    path:"*",
    element:<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Page Not Found</h1><p>The page you're looking for doesn't exist.</p></div></div>
  }
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}


