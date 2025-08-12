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
import UserSignup from "./Components/NavbarComponents/UserSignup";
import UserLogin from "./Components/NavbarComponents/UserLogin";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
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
    path:"/signup",
    element:<UserSignup/>
  },
  {
    path:"/login",
    element:<UserLogin/>
  },
 
  
]);

export default function App() {

  
  return <RouterProvider router={router} />  
}


