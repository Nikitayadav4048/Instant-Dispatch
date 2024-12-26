
// // import Home from "./Home";
// // import Servicespage from "./Servicespage";
// import Oderlistpage from "./Oderlistpage";

// // import Orderdetails from "./Components/Orderlist/Orderdetails";

// export default function App() {
//   return (

//    <>
//       {/* <Home/> */}
//       {/* <Servicespage /> */}
//       <Oderlistpage />
//       {/* <Orderdetails /> */}
//    </>

   
//   )
// }

import React from 'react';
import Oderlistpage from "./Oderlistpage";
import { OrderProvider } from './Components/Orderlist/OrderProvider';

export default function App() {
  return (
    <OrderProvider>
     <Oderlistpage/>
    </OrderProvider>
  );
}
