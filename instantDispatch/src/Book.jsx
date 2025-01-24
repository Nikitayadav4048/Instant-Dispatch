import Booking from "./Components/bookingcomponent/Booking"
// import Form from "./Components/bookingcomponent/BookForm"

import Footer from "./Components/homecomponent/Footer"

import BookForm from "./Components/bookingcomponent/BookForm"
import CustomerNav from "./Components/NavbarComponents/CustomerNav"
import RiderNav from "./Components/NavbarComponents/RiderNav"
import Navbar from "./Components/NavbarComponents/Navbar"
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

function Book() {

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
        {console.log(role)}
      <Booking/>
  
    <BookForm/>
      <Footer/>
    </>
  )
}

export default Book
