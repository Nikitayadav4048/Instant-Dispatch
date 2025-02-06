// /* eslint-disable no-unused-vars */
// import "./CustomerNav.css";
// import logo from '../../assets/logo-final.png';
// import { useState } from "react";
// import { NavLink } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";

// const CustomerNav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { logout } = useAuth0();
//   const { user, isAuthenticated } = useAuth0();
//   const [userclick, setUserClick] = useState(false);

//   return (
//     <>
//     <nav className="main-div">
//       <div className="container mx-auto flex flex-wrap items-center justify-between">
//         <img src={logo} alt="logo" className="nav-logo nav-brand md:ml-0 sm:ml-5 lg:ml-28" />
//         <button onClick={() => setIsOpen(!isOpen)} className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//           </svg>
//         </button>
//         <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? "block" : "hidden"}`}>
//           <div className="text-sm md:flex-grow md:flex md:justify-center gap-20">
//             <NavLink  to="/" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Home</NavLink>
//             <NavLink to="/about" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">About Us</NavLink>
//             <NavLink to="/services" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Services</NavLink>
//             <NavLink to="/Book" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Booking</NavLink>
//             <NavLink to="/career" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Career</NavLink>
            

//           </div>
//           <button className="log-img ml-3  md:ml-20 mr-20 md:mb-3 mb-5 " onClick={() => setUserClick(!userclick)}>{user.email.charAt(0).toUpperCase()}</button>
//         </div>
//       </div>
//     </nav>

    
// <div>
// {userclick && (
//    <div className="userDetails  flex flex-col items-center h-40">
//      <p className="my-3">Welcome</p> 
//      <h4 >{user?.name}</h4>
//      <h4 >{user.email}</h4>
    
//       <button className="login-img ml-3 md:ml-20 mr-20 md:mb-3 mt-12"
//        onClick={() => logout({ returnTo: window.location.origin })}> Log Out </button>
//        </div>
//        )}
// </div>
// </>
//   );
// }

// export default CustomerNav;



// notification with redux toolkit


/* eslint-disable no-unused-vars */
// import "./CustomerNav.css";
// import logo from '../../assets/logo-final.png';
// import chat from '../../assets/notification.png'
// import { useState } from "react";
// import { NavLink } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useSelector } from 'react-redux';


// import { useDispatch } from 'react-redux';

// import { addNotification , removeNotification } from '../redux/notificationSlice';

// const CustomerNav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { logout, user } = useAuth0();
//   const [userClick, setUserClick] = useState(false);
//   const [notificationClick, setNotificationClick] = useState(false);

//   // Access notifications from the Redux store
//   const notifications = useSelector((state) => state.notifications.notifications);
//   const dispatch = useDispatch();

//   const handleAccept = (orderId) => {
//     // Your handle accept logic here, including dispatching addNotification
//     const newNotification = {
//       id: Date.now(),
//       message: 'Your order is accepted by the rider',
//       timestamp: new Date().toLocaleString()

//     };
//     dispatch(addNotification(newNotification));
//   };

//   return (
//     <>
//       <nav className="main-div">
//         <div className="container mx-auto flex flex-wrap items-center justify-between">
//           <img src={logo} alt="logo" className="nav-logo nav-brand md:ml-0 sm:ml-5 lg:ml-28" />
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2" >
//             <svg
            
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
            
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//             </svg>
//           </button>
//           <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
//             <div className="text-sm md:flex-grow md:flex md:justify-center gap-20">
//               <NavLink to="/" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Home</NavLink>
//               <NavLink to="/about" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">About Us</NavLink>
//               <NavLink to="/services" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Services</NavLink>
//               <NavLink to="/Book" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Booking</NavLink>
//               {/* <NavLink to="/career" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Career</NavLink> */}
//               {/* <a href="/order" className=" nav-item block md:inline-block  ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black ">Orders</a> */}
//                 </div>
//             <img src={chat} alt="notifications" className="size-7 notification-icon p-1" onClick={() => setNotificationClick(!notificationClick)} />
//             <button className="log-img ml-0 md:ml-20 mr-20 md:mb-3 mb-5" onClick={() => setUserClick(!userClick)}>{user.email.charAt(0).toUpperCase()}</button>
//           </div>
//         </div>
//       </nav>

//       <div>
//         {userClick && (
//           <div className="userDetails flex flex-col items-center h-40">
//             <p className="my-3">Welcome</p>
//             <h4>{user?.name}</h4>
//             <h4>{user.email}</h4>
//             <button className="login-img ml-3 md:ml-20 mr-20 md:mb-3 mt-12" onClick={() => logout({ returnTo: window.location.origin })}> Log Out </button>
//           </div>
//         )}
//       </div>

//       <div>
//         {notificationClick && (
//           <div className="notification-sec flex flex-col items-center h-40">
//             <h2 className="mb-3 mt-3 ">Notifications</h2>
//             <div className="notifications ">
//               <div className="notification  ">

//                 <ul>

//                   {notifications.map((notification) => (
//                     <li key={notification.id} className="notification-item rounded-md bg-orange-50 p-3 mb-3">
//                       <div>
//                         <p>{notification.message}</p>
//                         <button onClick={() => dispatch(removeNotification({ id: notification.id }))} className="bg-orange-200 rounded-md py-1 px-2 border-none mt-1 delete">Delete</button>
                       
//                       </div>
//                      <div className="delete-btn">
//                      <p className="text-sm">{notification.timestamp}</p>
//                      </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//         )}
//       </div>
//     </>
//   );
// }

// export default CustomerNav;

// notification with redux toolkit


// import "./CustomerNav.css";
// import logo from '../../assets/logo-final.png';
// import chat from '../../assets/notification.png'
// import { useState } from "react";
// import { NavLink } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useSelector } from 'react-redux';


// import { useDispatch } from 'react-redux';

// import { addNotification , removeNotification } from '../redux/notificationSlice';

// const CustomerNav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { logout, user } = useAuth0();
//   const [userClick, setUserClick] = useState(false);
//   const [notificationClick, setNotificationClick] = useState(false);

//   // Access notifications from the Redux store
//   const notifications = useSelector((state) => state.notifications.notifications);
//   const dispatch = useDispatch();

//   const handleAccept = (orderId) => {
//     // Your handle accept logic here, including dispatching addNotification
//     const newNotification = {
//       id: Date.now(),
//       message: 'Your order is accepted by the rider',
//       timestamp: new Date().toLocaleString()

//     };
//     dispatch(addNotification(newNotification));
//   };

//   return (
//     <>
//       <nav className="main-div">
//         <div className="container mx-auto flex flex-wrap items-center justify-between">
//           <img src={logo} alt="logo" className="nav-logo nav-brand md:ml-0 sm:ml-5 lg:ml-28" />
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2" >
//             <svg
            
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
            
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//             </svg>
//           </button>
//           <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
//             <div className="text-sm md:flex-grow md:flex md:justify-center gap-20">
//               <NavLink to="/" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Home</NavLink>
//               <NavLink to="/about" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">About Us</NavLink>
//               <NavLink to="/services" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Services</NavLink>
//               <NavLink to="/Book" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Booking</NavLink>
//               {/* <NavLink to="/career" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Career</NavLink> */}
//               {/* <a href="/order" className=" nav-item block md:inline-block  ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black ">Orders</a> */}
//                 </div>
//             <img src={chat} alt="notifications" className="size-7 notification-icon p-1" onClick={() => setNotificationClick(!notificationClick)} />
//             <button className="log-img ml-0 md:ml-20 mr-20 md:mb-3 mb-5" onClick={() => setUserClick(!userClick)}>{user.email.charAt(0).toUpperCase()}</button>
//           </div>
//         </div>
//       </nav>

//       <div>
//         {userClick && (
//           <div className="userDetails flex flex-col items-center h-40">
//             <p className="my-3">Welcome</p>
//             <h4>{user?.name}</h4>
//             <h4>{user.email}</h4>
//             <button className="login-img ml-3 md:ml-20 mr-20 md:mb-3 mt-12" onClick={() => logout({ returnTo: window.location.origin })}> Log Out </button>
//           </div>
//         )}
//       </div>

//       <div>
//         {notificationClick && (
//           <div className="notification-sec flex flex-col items-center h-40">
//             <h2 className="mb-3 mt-3 ">Notifications</h2>
//             <div className="notifications ">
//               <div className="notification  ">

//                 <ul>

//                   {notifications.map((notification) => (
//                     <li key={notification.id} className="notification-item rounded-md bg-orange-50 p-3 mb-3">
//                       <div>
//                         <p>{notification.message}</p>
//                         <button onClick={() => dispatch(removeNotification({ id: notification.id }))} className="bg-orange-200 rounded-md py-1 px-2 border-none mt-1 delete">Delete</button>
                       
//                       </div>
//                      <div className="delete-btn">
//                      <p className="text-sm">{notification.timestamp}</p>
//                      </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//         )}
//       </div>
//     </>
//   );
// }

// export default CustomerNav;


// notification with backend


import "./CustomerNav.css";
import logo from '../../assets/logo-final.png';
import chat from '../../assets/notification.png';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const CustomerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth0();
  const [userClick, setUserClick] = useState(false);
  const [notificationClick, setNotificationClick] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/notifications/${user.email}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user.email]);

  const handleAccept = async (orderId) => {
    const newNotification = {
      userId: user.email, // Replace with the relevant user identifier
      message: 'Your order is accepted by the rider',
    };

    try {
      const response = await axios.post('http://localhost:8000/api/notifications', newNotification);
      setNotifications((prevNotifications) => [...prevNotifications, response.data]);
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/notifications/${id}`);
      setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <>
      <nav className="main-div">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <img src={logo} alt="logo" className="nav-logo nav-brand md:ml-0 sm:ml-5 lg:ml-28" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black border-black bg-white inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hide-button self-start mr-4 mt-2" >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="text-sm md:flex-grow md:flex md:justify-center gap-20">
              <NavLink to="/" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Home</NavLink>
              <NavLink to="/about" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">About Us</NavLink>
              <NavLink to="/services" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Services</NavLink>
              <NavLink to="/Book" className="nav-item block md:inline-block ml-5 md:ml-0 md:mt-0 mt-4 mx-2 text-black" activeClassName="active">Booking</NavLink>
            </div>
            <img src={chat} alt="notifications" className="size-7 notification-icon p-1" onClick={() => setNotificationClick(!notificationClick)} />
            <button className="log-img ml-0 md:ml-20 mr-20 md:mb-3 mb-5" onClick={() => setUserClick(!userClick)}>{user.email.charAt(0).toUpperCase()}</button>
          </div>
        </div>
      </nav>

      <div>
        {userClick && (
          <div className="userDetails flex flex-col items-center h-40">
            <p className="my-3">Welcome</p>
            <h4>{user?.name}</h4>
            <h4>{user.email}</h4>
            <button className="login-img ml-3 md:ml-20 mr-20 md:mb-3 mt-12" onClick={() => logout({ returnTo: window.location.origin })}> Log Out </button>
          </div>
        )}
      </div>

      <div>
        {notificationClick && (
          <div className="notification-sec flex flex-col items-center h-40">
            <h2 className="mb-3 mt-3 ">Notifications</h2>
            <div className="notifications ">
              <div className="notification  ">
                
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification._id} className="notification-item rounded-md bg-orange-50 p-3 mb-3">
                      <div>
                        <p>{notification.message}</p>
                        <button onClick={() => handleDelete(notification._id)} className="bg-orange-200 rounded-md py-1 px-2 border-none mt-1 delete">Delete</button>
                      </div>
                      <div className="delete-btn">
                        <p className="text-sm">{new Date(notification.timestamp).toLocaleString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerNav;
