// import Booking from "./Components/bookingcomponent/Booking"
// // import Form from "./Components/bookingcomponent/BookForm"

// import Footer from "./Components/homecomponent/Footer"

// import BookForm from "./Components/bookingcomponent/BookForm"
// import CustomerNav from "./Components/NavbarComponents/CustomerNav"
// import RiderNav from "./Components/NavbarComponents/RiderNav"
// import Navbar from "./Components/NavbarComponents/Navbar"
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useState } from "react";

// function Book() {

//   const { isAuthenticated, user } = useAuth0(); // Get user information
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       // Fetch user data from your backend
//       fetch(`http://localhost:5003/api/users/${user.email}`)
//         .then(response => response.json())
//         .then(data => setRole(data.role))
//         .catch(err => console.error("Error fetching user role:", err));
//     }
//   }, [isAuthenticated, user]);

//   return (
//     <>
//    {
    
//         isAuthenticated ? (
         
//           role === 'customer' ? <CustomerNav /> : <RiderNav />
        
//         ) : (
//           <Navbar />
//         )
//       }
//         {console.log(role)}
//       <Booking/>
     
//       {/* <Form/> */}
//     <BookForm/>
//       <Footer/>
//     </>
//   )
// }

// export default Book


// cSpell:ignore homecomponent
import Footer from "./Components/homecomponent/Footer";
import BookForm from "./Components/bookingcomponent/BookForm";
import Navbar from "./Components/NavbarComponents/Navbar";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';

function Book() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'bookNow', 'history'
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const notifications = useSelector(state => state.notifications.notifications);

  useEffect(() => {
    if (currentView === 'history') {
      fetchOrderHistory();
    }
  }, [currentView]);

  const fetchOrderHistory = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.email) {
        console.log('No user email found');
        setLoading(false);
        return;
      }
      
      const response = await axios.get('http://localhost:5002/api/bookings');
      const userOrders = response.data.filter(order => {
        return order.email === user.email || 
               order.customerEmail === user.email ||
               order.customerUsername === user.email;
      });
      
      setOrderHistory(userOrders);
    } catch (error) {
      console.log('Backend not available, using notifications as order history');
      // Use notifications from Redux as fallback
      const bookingNotifications = notifications.filter(n => n.type === 'booking');
      setOrderHistory(bookingNotifications);
    }
    setLoading(false);
  };

  const renderDashboard = () => (
    <div className="booking-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Instant Dispatch</h1>
          <p>Fast & Reliable Delivery Service</p>
        </div>
        <button className="history-btn" onClick={() => setCurrentView('history')}>
          <i className="fas fa-history"></i> Order History
        </button>
      </div>
      <BookForm />
    </div>
  );

  const renderOrderHistory = () => (
    <div className="order-history">
      <div className="history-header">
        <button className="back-button" onClick={() => setCurrentView('dashboard')}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h2>Order History</h2>
      </div>
      
      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : orderHistory.length === 0 ? (
        <div className="no-orders">
          <i className="fas fa-box-open"></i>
          <p>No orders found</p>
          <button onClick={() => setCurrentView('bookNow')} className="book-now-btn">
            Create Your First Order
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orderHistory.map((order, index) => (
            <div key={order.id || index} className="order-card">
              <div className="order-header">
                <span className="order-id">{order.parcelId || `ORDER-${index + 1}`}</span>
                <span className={`order-status ${order.status || 'pending'}`}>
                  {order.status || 'Pending'}
                </span>
              </div>
              
              <div className="order-details">
                <div className="detail-row">
                  <i className="fas fa-map-marker-alt"></i>
                  <span><strong>From:</strong> {order.details?.pickup || order.pickupAddress}</span>
                </div>
                <div className="detail-row">
                  <i className="fas fa-map-pin"></i>
                  <span><strong>To:</strong> {order.details?.delivery || order.deliveryAddress}</span>
                </div>
                <div className="detail-row">
                  <i className="fas fa-box"></i>
                  <span><strong>Item:</strong> {order.details?.parcelDescription || order.parcelDescription}</span>
                </div>
                <div className="detail-row">
                  <i className="fas fa-rupee-sign"></i>
                  <span><strong>Price:</strong> ₹{order.details?.price || order.price}</span>
                </div>
                <div className="detail-row">
                  <i className="fas fa-calendar"></i>
                  <span><strong>Date:</strong> {order.timestamp || new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderBookForm = () => (
    <div className="book-form-section">
      <div className="form-header">
        <button className="back-button" onClick={() => setCurrentView('dashboard')}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
      <BookForm />
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="book-container">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'history' && renderOrderHistory()}
      </div>
      <Footer />
      
      <style jsx>{`
        .book-container {
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 70vh;
        }
        
        .booking-dashboard {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .dashboard-header {
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
        }
        
        .header-content h1 {
          color: black;
          font-weight: bold;
          font-size: 2rem;
          margin: 0 0 0.3rem 0;
        }
        
        .header-content p {
          color: #666;
          margin: 0;
        }
        
        .history-btn {
          background: #FF8800;
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .history-btn:hover {
          background: #e67700;
        }
        
        .order-history {
          max-width: 100%;
        }
        
        .history-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .back-button {
          background: #FF8800;
          color: white;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.9rem;
        }
        
        .back-button:hover {
          background: #e67700;
        }
        
        .history-header h2 {
          color: #333;
          margin: 0;
          font-size: 1.5rem;
        }
        
        .loading {
          text-align: center;
          padding: 1rem;
          color: #666;
        }
        
        .no-orders {
          text-align: center;
          padding: 2rem 1rem;
          color: #666;
        }
        
        .no-orders i {
          font-size: 2.5rem;
          color: #ddd;
          margin-bottom: 0.5rem;
        }
        
        .book-now-btn {
          background: #FF8800;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 20px;
          cursor: pointer;
          margin-top: 0.5rem;
        }
        
        .orders-list {
          display: grid;
          gap: 0.8rem;
        }
        
        .order-card {
          background: white;
          border-radius: 6px;
          padding: 1rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
          padding-bottom: 0.3rem;
          border-bottom: 1px solid #eee;
        }
        
        .order-id {
          font-weight: bold;
          color: #FF8800;
          font-size: 0.9rem;
        }
        
        .order-status {
          padding: 0.2rem 0.6rem;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .order-status.pending {
          background: #fff3cd;
          color: #856404;
        }
        
        .order-status.completed {
          background: #d4edda;
          color: #155724;
        }
        
        .order-details {
          display: grid;
          gap: 0.3rem;
        }
        
        .detail-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .detail-row i {
          color: #FF8800;
          width: 14px;
        }
        
        .form-header {
          margin-bottom: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .book-container {
            padding: 0.5rem;
          }
          
          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .history-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        
        .back-button {
          background: #F8AD42;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .back-button:hover {
          background: #e9a038;
        }
        
        .history-header h2 {
          color: #333;
          margin: 0;
          font-size: 24px;
        }
        
        .loading {
          text-align: center;
          padding: 40px;
          color: #666;
        }
        
        .no-orders {
          text-align: center;
          padding: 40px;
        }
        
        .no-orders i {
          font-size: 50px;
          color: #ddd;
          margin-bottom: 15px;
        }
        
        .no-orders p {
          font-size: 16px;
          color: #666;
          margin-bottom: 20px;
        }
        
        .book-now-btn {
          background: #F8AD42;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .book-now-btn:hover {
          background: #e9a038;
        }
        
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .order-card {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 15px;
          border: 1px solid #ddd;
        }
        
        .order-card:hover {
          background: white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .order-id {
          font-weight: bold;
          color: #F8AD42;
          font-size: 14px;
        }
        
        .order-status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .order-status.pending {
          background: #fff3cd;
          color: #856404;
        }
        
        .order-status.completed {
          background: #d4edda;
          color: #155724;
        }
        
        .order-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .detail-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }
        
        .detail-row i {
          color: #F8AD42;
          width: 15px;
        }
        
        .form-header {
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .dashboard-options {
            flex-direction: column;
            align-items: center;
          }
          
          .dashboard-card {
            width: 100%;
            max-width: 300px;
          }
          
          .order-history {
            margin: 10px;
          }
        }
      `}</style>
    </>
  );
}

export default Book;
