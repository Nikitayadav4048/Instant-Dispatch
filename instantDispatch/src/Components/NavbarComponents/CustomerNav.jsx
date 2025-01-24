/* eslint-disable no-unused-vars */
import "./CustomerNav.css";
import logo from '../../assets/logo-final.png';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const CustomerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const [userclick, setUserClick] = useState(false);

  return (
    <>
    <nav className="main-div">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <img src={logo} alt="logo" className="nav-logo nav-brand md:ml-0 sm:ml-5 lg:ml-28" />
        <button onClick={() => setIsOpen(!isOpen)} className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? "block" : "hidden"}`}>
          <div className="text-sm md:flex-grow md:flex md:justify-center gap-20">
            <NavLink  to="/" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Home</NavLink>
            <NavLink to="/about" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">About Us</NavLink>
            <NavLink to="/services" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Services</NavLink>
            <NavLink to="/Book" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Booking</NavLink>
            <NavLink to="/career" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Career</NavLink>

          </div>
          <button className="log-img ml-3  md:ml-20 mr-20 md:mb-3 mb-5 " onClick={() => setUserClick(!userclick)}>{user.email.charAt(0).toUpperCase()}</button>
        </div>
      </div>
    </nav>

    
<div>
{userclick && (
   <div className="userDetails  flex flex-col items-center h-40">
     <p className="my-3">Welcome</p> 
     <h4 >{user?.name}</h4>
     <h4 >{user.email}</h4>
    
      <button className="login-img ml-3 md:ml-20 mr-20 md:mb-3 mt-12"
       onClick={() => logout({ returnTo: window.location.origin })}> Log Out </button>
       </div>
       )}
</div>
</>
  );
}

export default CustomerNav;
