// import Business from "./Components/homecomponent/Business";
// import Chooseus from "./Components/homecomponent/Chooseus";
// import Maincontainer from "./Components/homecomponent/Maincontainer";
// import Safety from "./Components/homecomponent/Safety";
// import Footer from "./Components/homecomponent/Footer";
// import Process from "./Components/homecomponent/Process";
// import CustomerNav from "./Components/NavbarComponents/CustomerNav";

// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useState } from "react";
// import RiderNav from "./Components/NavbarComponents/RiderNav";
// import Navbar from "./Components/NavbarComponents/Navbar";
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const { isAuthenticated, user } = useAuth0(); // Get user information
//   const [role, setRole] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         if (isAuthenticated && user) {
//           const response = await fetch(`http://localhost:5000/api/users/${user.email}`);
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           const data = await response.json();
//           setRole(data.role);
//           console.log("Fetched user role:", data.role);
//         }
//       } catch (err) {
//         console.error("Error fetching user role:", err);
//       }
        
//     };


//     fetchUserRole();
//   }, [isAuthenticated, user]);

//   useEffect(() => {
//     const checkFormCompletion = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/users/${user.email}`);
//         const data = await response.json();
//         if (role === 'rider' && !data.hasCompletedForm) {
//           navigate('/rider-form');
//         }
//       } catch (err) {
//         console.error("Error checking form completion:", err);
//       }
//     };

//     if (role === 'rider') {
//       checkFormCompletion();
//     }
//   }, [role, navigate, user]);

//   return (
//     <div>
//       {isAuthenticated ? (
//         role === 'rider' ? <RiderNav/> : <CustomerNav/>
//       ) : (
//         <Navbar/>
//       )}
//       <Maincontainer/>
//       <Chooseus/>
//       <Process/>
//       <Safety/>
//       <Business/>
//       <Footer/>
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from 'react-router-dom';
// import Business from "./Components/homecomponent/Business";
// import Chooseus from "./Components/homecomponent/Chooseus";
// import Maincontainer from "./Components/homecomponent/Maincontainer";
// import Safety from "./Components/homecomponent/Safety";
// import Footer from "./Components/homecomponent/Footer";
// import Process from "./Components/homecomponent/Process";
// import CustomerNav from "./Components/NavbarComponents/CustomerNav";
// import RiderNav from "./Components/NavbarComponents/RiderNav";
// import Navbar from "./Components/NavbarComponents/Navbar";

// const Home = () => {
//   const { isAuthenticated, user } = useAuth0(); // Get user information
//   const [role, setRole] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         if (isAuthenticated && user) {
//           console.log("Fetching role for user:", user.email); // Debugging line
//           const response = await fetch(`http://localhost:5000/api/users/${user.email}`);
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           const data = await response.json();
//           setRole(data.role);
//           console.log("Fetched user role:", data.role); // Debugging line
//         }
//       } catch (err) {
//         console.error("Error fetching user role:", err);
//       }
//     };

//     fetchUserRole();
//   }, [isAuthenticated, user]);

//   useEffect(() => {
//     const checkFormCompletion = async () => {
//       if (role === 'rider' && user) {
//         try {
//           console.log("Checking form completion for rider:", user.email); // Debugging line
//           const response = await fetch(`http://localhost:5000/api/users/${user.email}`);
//           const data = await response.json();
//           if (!data.hasCompletedForm) {
//             navigate('/rider-form');
//           }
//         } catch (err) {
//           console.error("Error checking form completion:", err);
//         }
//       }
//     };

//     checkFormCompletion();
//   }, [role, user, navigate]);

//   return (
//     <div>
//       {isAuthenticated ? (
//         role === 'rider' ? <RiderNav /> : <CustomerNav />
//       ) : (
//         <Navbar />
//       )}
//       <Maincontainer />
//       <Chooseus />
//       <Process />
//       <Safety />
//       <Business />
//       <Footer />
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from 'react-router-dom';
// import Business from "./Components/homecomponent/Business";
// import Chooseus from "./Components/homecomponent/Chooseus";
// import Maincontainer from "./Components/homecomponent/Maincontainer";
// import Safety from "./Components/homecomponent/Safety";
// import Footer from "./Components/homecomponent/Footer";
// import Process from "./Components/homecomponent/Process";
// import CustomerNav from "./Components/NavbarComponents/CustomerNav";
// import Navbar from "./Components/NavbarComponents/Navbar";

// const Home = () => {
//   const { isAuthenticated, user } = useAuth0();
//   const [role, setRole] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         if (isAuthenticated && user) {
//           console.log("Fetching role for user:", user.email);
//           // const response = await fetch(`http://localhost:5000/api/users/${user.email}`);
//           // const response = await fetch(`http://localhost:5000/api/users/${encodeURIComponent(user.email)}`);
//           const response = await fetch(`http://localhost:5000/api/users/${encodeURIComponent(user.email)}`);
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           const data = await response.json();
//           setRole(data.role);
//           console.log("Fetched user role:", data.role);
//         }
//       } catch (err) {
//         console.error("Error fetching user role:", err);
//       }
//     };

//     fetchUserRole();
//   }, [isAuthenticated, user]);

//   return (
//     <div>
//       {isAuthenticated ? <CustomerNav /> : <Navbar />}
//       <Maincontainer />
//       <Chooseus />
//       <Process />
//       <Safety />
//       <Business />
//       <Footer />
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import Business from "./Components/homecomponent/Business";
import Chooseus from "./Components/homecomponent/Chooseus";
import Maincontainer from "./Components/homecomponent/Maincontainer";
import Safety from "./Components/homecomponent/Safety";
import Footer from "./Components/homecomponent/Footer";
import Process from "./Components/homecomponent/Process";
import CustomerNav from "./Components/NavbarComponents/CustomerNav";
import Navbar from "./Components/NavbarComponents/Navbar";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();
  const [role, setRole] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (isAuthenticated && user) {
          const encodedEmail = encodeURIComponent(user.email);
          const response = await fetch(`http://localhost:5000/api/users/${encodedEmail}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setRole(data.role);
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    };

    fetchUserRole();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (isAuthenticated && user && role === 'customer') {
        try {
          const encodedEmail = encodeURIComponent(user.email);
          const response = await fetch(`http://localhost:5000/api/orders/${encodedEmail}`);
          if (response.ok) {
            const data = await response.json();
            setOrders(data.slice(0, 3));
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [isAuthenticated, user, role]);

  const CustomerWelcome = () => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome back, {user?.name?.split(' ')[0]}! 🎉
          </h2>
          <p className="text-gray-600 text-lg">Manage your deliveries with ease</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quick Booking</h3>
            <p className="text-gray-600 mb-4">Book your delivery in just a few clicks</p>
            <button 
              onClick={() => navigate('/Book')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Book Now
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Track Orders</h3>
            <p className="text-gray-600 mb-4">Real-time tracking of your packages</p>
            <button 
              onClick={() => navigate('/customer-dashboard')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Track Now
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-gray-600 mb-4">Get help whenever you need it</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              Get Help
            </button>
          </div>
        </div>

        {orders.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">#{order._id?.slice(-8)}</p>
                      <p className="text-gray-600 text-sm">{order.pickupAddress} → {order.deliveryAddress}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button 
                onClick={() => navigate('/customer-dashboard')}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                View All Orders →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {isAuthenticated ? <CustomerNav /> : <Navbar />}
      <Maincontainer />
      {isAuthenticated && role === 'customer' && <CustomerWelcome />}
      <Chooseus />
      <Process />
      <Safety />
      <Business />
      <Footer />
    </div>
  );
};

export default Home;