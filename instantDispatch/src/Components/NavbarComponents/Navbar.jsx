// import "./navbar.css"
// import logo from '../../assets/logo-final.png';
// import { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { loginWithRedirect} = useAuth0();
  
 
//   return (
   
//     <nav className="main-div">
     
     
//         <div className="container mx-auto flex flex-wrap  items-center  justify-between" >
       
//         <img src={logo} alt="logo"  className = "nav-logo nav-brand md:ml-0 sm:ml-5 lg:ml-28 "/>

//         <button onClick={() => setIsOpen(!isOpen)} className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2" >
//            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
            
//             </button>

//             <div className={`  w-full md:flex md:items-center md:w-auto ${isOpen ? "block" : "hidden"}`}>
//   <div className="text-sm md:flex-grow md:flex md:justify-center gap-20">
//     <a href="/" className=" nav-item block  md:inline-block  ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black ">Home</a>
//     <a href="/about" className="  nav-item block md:inline-block ml-5 md:ml-0 md:mt-0  mt-4 mx-2 text-black ">About Us</a>
//     <a href="/services" className="  nav-item block md:inline-block  ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black ">Services</a>
//     <a href="/career" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" >Career</a>
   
//   </div>

//   <button className="login-img ml-3 md:ml-20 mr-20 md:mb-3 mb-5 " onClick={() => loginWithRedirect()}>Log In</button>
// </div>
        
         
      
           
//         </div>
//       </nav>
 
//   )
// }

// export default Navbar


import "./navbar.css";
import logo from '../../assets/logo-final.png';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <nav className="main-div">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <img
          src={logo}
          alt="logo"
          className="nav-logo nav-brand md:ml-0 sm:ml-5 lg:ml-28"
        />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? "block" : "hidden"}`}>
          <div className="text-sm md:flex-grow md:flex md:justify-center gap-20">
            <Link to="/" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">Home</Link>
            <Link to="/about" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">About Us</Link>
            <Link to="/services" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">Services</Link>
            <Link to="/career" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">Career</Link>

            {isAuthenticated && (
              <Link to="/book" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black">Booking</Link>
            )}
          </div>

          <div className="ml-3 md:ml-20 mr-20 md:mb-3 mb-5">
            {isAuthenticated ? (
              <button className="login-img" onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsAuthenticated(false);
                setUser(null);
              }}>
                Log Out
              </button>
            ) : (
              <Link to="/login">
                <button className="login-img">Log In</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;