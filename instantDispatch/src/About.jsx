// import Aboutus from "./Components/aboutcomponent/Aboutus"
// import Footer from "./Components/homecomponent/Footer"

// import CustomerNav from "./Components/NavbarComponents/CustomerNav"
// import Navbar from "./Components/NavbarComponents/Navbar"
// import RiderNav from "./Components/NavbarComponents/RiderNav"

// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useState } from "react";

// const About = () => {

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
//     <>
//     {
//         isAuthenticated ? (
//           role === 'customer' ? <CustomerNav /> : <RiderNav />
//         ) : (
//           <Navbar />
//         )
//       }
//       <Aboutus/>
//       <Footer/>
//     </>
//   )
// }

// export default About


import Aboutus from "./Components/aboutcomponent/Aboutus"
import Footer from "./Components/homecomponent/Footer"

import CustomerNav from "./Components/NavbarComponents/CustomerNav"
import Navbar from "./Components/NavbarComponents/Navbar"
import RiderNav from "./Components/NavbarComponents/RiderNav"

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const About = () => {

  const { isAuthenticated, user } = useAuth0(); // Get user information
  const [role, setRole] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch user data from your backend
      fetch(`http://localhost:5000/api/users/${user.email}`)
        .then(response => response.json())
        .then(data => setRole(data.role))
        .catch(err => console.error("Error fetching user role:", err));
    }
  }, [isAuthenticated, user]);
  return (
    <>
    {
        isAuthenticated ? (
          role === 'customer' ? <CustomerNav /> : <RiderNav />
        ) : (
          <Navbar />
        )
      }
      <Aboutus/>
      <Footer/>
    </>
  )
}

export default About

