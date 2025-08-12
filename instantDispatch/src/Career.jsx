// import CareerForm from "./Components/careercomponent/CareerForm"
// import Careerus from "./Components/careercomponent/Careerus"
// import Howto from "./Components/careercomponent/Howto"
// import Footer from "./Components/homecomponent/Footer"

// import CustomerNav from "./Components/NavbarComponents/CustomerNav"

// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useState } from "react";
// import RiderNav from "./Components/NavbarComponents/RiderNav"
// import Navbar from "./Components/NavbarComponents/Navbar"


// const Career = () => {

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

// {
//         isAuthenticated ? (
//           role === 'customer' ? <CustomerNav /> : <RiderNav />
//         ) : (
//           <Navbar />
//         )
//       }    

//    <Careerus/>
//     <Howto/>
//       <CareerForm/>
//       <Footer/>
//     </>
//   )
// }

// export default Career



import CareerForm from "./Components/careercomponent/CareerForm";
import Careerus from "./Components/careercomponent/Careerus";
import Howto from "./Components/careercomponent/Howto";
import Footer from "./Components/homecomponent/Footer";

import CustomerNav from "./Components/NavbarComponents/CustomerNav";
import Navbar from "./Components/NavbarComponents/Navbar";

import { useAuth0 } from "@auth0/auth0-react";

const Career = () => {
  const { isAuthenticated } = useAuth0(); // Check user login status

  return (
    <>
      {isAuthenticated ? <CustomerNav /> : <Navbar />}
      <Careerus />
      <Howto />
      <CareerForm />
      <Footer />
    </>
  );
};

export default Career;