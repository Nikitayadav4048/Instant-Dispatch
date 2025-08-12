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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (isAuthenticated && user) {
          const encodedEmail = encodeURIComponent(user.email);
          console.log("Fetching role for user:", encodedEmail);

          const response = await fetch(`http://localhost:5000/api/users/${encodedEmail}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setRole(data.role);
          console.log("Fetched user role:", data.role);
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    };

    fetchUserRole();
  }, [isAuthenticated, user]);

  return (
    <div>
      {isAuthenticated ? <CustomerNav /> : <Navbar />}
      <Maincontainer />
      <Chooseus />
      <Process />
      <Safety />
      <Business />
      <Footer />
    </div>
  );
};

export default Home;