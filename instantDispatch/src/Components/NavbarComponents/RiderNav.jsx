/* eslint-disable no-unused-vars */
import "./RIder.css"
import logo from '../../assets/logo-final.png';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useEffect } from "react";

const RiderNav = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const [userclick, setUserClick] = useState(false);
console.log(user);
const userRole = user['https://instant-dispatch.com/role'];
// console.log(userRole);


const [role, setRole] = useState("");

useEffect(() => {
  if (isAuthenticated && user) {

    // Fetch user data from your backend
    fetch(`http://localhost:5000/api/users/${user.email}`)
      .then(response => response.json())
      .then(data => setRole(data.username))
      .catch(err => console.error("Error fetching user role:", err));
  }

}, [isAuthenticated, user]);

  return (

   
   <>
      <nav className="main-div">
     
     
        <div className="container mx-auto flex flex-wrap  items-center  justify-between" >
       
        <img src={logo} alt="logo"  className = "nav-logo nav-brand md:ml-0 sm:ml-5 lg:ml-28 "/>

        <button onClick={() => setIsOpen(!isOpen)} className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2" >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
            </button>

            <div className={`  w-full md:flex md:items-center md:w-auto ${isOpen ? "block" : "hidden"}`}>
  <div className="text-sm md:flex-grow md:flex md:justify-center gap-20">
    <a href="/" className=" nav-item block  md:inline-block  ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black ">Home</a>
    <a href="/about" className=" nav-item block md:inline-block ml-5 md:ml-0 md:mt-0  mt-4 mx-2 text-black ">About Us</a>
    <a href="/services" className=" nav-item block md:inline-block  ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black ">Services</a>
    <a href="/order" className=" nav-item block md:inline-block  ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black ">Orders</a>

   
   
   
  </div>
  <button className="log-img ml-3  md:ml-20 mr-20 md:mb-3 mb-5 " onClick={() => setUserClick(!userclick)}>{user.email.charAt(0).toUpperCase()}</button>
   
</div>
        
         
      
           
        </div>
      </nav>
      <div>
{userclick && (
   <div className="userDetails  flex flex-col items-center h-40">
     <p className="my-3">Welcome</p> 
   <div className=" flex flex-col items-start mb-2">
   <h3>{role}</h3>
   <h4 >{user.email}</h4>
    </div> 
     
   
      <button className="login-img ml-3 md:ml-20 mr-20 md:mb-3 mt-12"
       onClick={() => logout({ returnTo: window.location.origin })}> Log Out </button>
       </div>
       )}
</div>
 </>
  )
}

export default RiderNav;
