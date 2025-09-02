
// import Footer from './Components/homecomponent/Footer';

// import CustomerNav from './Components/NavbarComponents/CustomerNav';
// import Navbar from './Components/NavbarComponents/Navbar';
// import RiderNav from './Components/NavbarComponents/RiderNav';
// import Fastservice from './Components/servicecomponent/Fastservice';
// import Mainservice from './Components/servicecomponent/Mainservice';
// import Tryus from './Components/servicecomponent/Tryus';

// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useState } from "react";



// const Servicespage = () => {

//   const { isAuthenticated, user } = useAuth0(); // Get user information
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       // Fetch user data from your backend
//       fetch(`http://localhost:5000/api/users/${user.email}`)
//         .then(response => response.json())
//         .then(data => setRole(data.role))
//         .catch(err => console.error("Error fetching user role:", err));
//     }
//   }, [isAuthenticated, user]);

//   return (
//     <div>
        
//         {
//         isAuthenticated ? (
//           role === 'customer' ? <CustomerNav /> : <RiderNav />
//         ) : (
//           <Navbar />
//         )
//       }

//     <Mainservice/>
//     <Tryus/>
//     <Fastservice/>
//       <Footer/>
//     </div>
//   )
// }
// export default Servicespage; 


// import React from 'react';
// import Footer from './Components/homecomponent/Footer';
// import CustomerNav from './Components/NavbarComponents/CustomerNav';
// import Navbar from './Components/NavbarComponents/Navbar';
// import RiderNav from './Components/NavbarComponents/RiderNav';
// import Fastservice from './Components/servicecomponent/Fastservice';
// import Mainservice from './Components/servicecomponent/Mainservice';
// import Tryus from './Components/servicecomponent/Tryus';

// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useState } from "react";

// const MemoizedCustomerNav = React.memo(CustomerNav);
// const MemoizedRiderNav = React.memo(RiderNav);
// const MemoizedNavbar = React.memo(Navbar);

// const Servicespage = () => {
//   const { isAuthenticated, user } = useAuth0(); // Get user information
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       // Fetch user data from your backend
//       fetch(`http://localhost:5000/api/users/${user.email}`)
//         .then(response => response.json())
//         .then(data => {
//           console.log("User role fetched: ", data.role); // Add this line to debug
//           setRole(data.role);
//         })
//         .catch(err => console.error("Error fetching user role:", err));
//     }
//   }, [isAuthenticated, user]);

//   return (
//     <div>
//       {
//         isAuthenticated ? (
//           role === 'customer' ? <MemoizedCustomerNav /> : <MemoizedRiderNav />
//         ) : (
//           <MemoizedNavbar />
//         )
//       }
//       <Mainservice />
//       <Tryus />
//       <Fastservice />
//       <Footer />
//     </div>
//   );
// };

// export default Servicespage;


import React from 'react';
import Footer from './Components/homecomponent/Footer';
import CustomerNav from './Components/NavbarComponents/CustomerNav';
import Navbar from './Components/NavbarComponents/Navbar';
import Fastservice from './Components/servicecomponent/Fastservice';
import Mainservice from './Components/servicecomponent/Mainservice';
import Tryus from './Components/servicecomponent/Tryus';

import { useAuth0 } from "@auth0/auth0-react";

const MemoizedCustomerNav = React.memo(CustomerNav);
const MemoizedNavbar = React.memo(Navbar);

const Servicespage = () => {
  const { isAuthenticated } = useAuth0(); // Check login status

  return (
    <div>
      {isAuthenticated ? <MemoizedCustomerNav /> : <MemoizedNavbar />}
      <Mainservice />
      <Tryus />
      <Fastservice />
      <Footer />
    </div>
  );
};

export default Servicespage;