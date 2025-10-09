
// import { useSelector, useDispatch } from 'react-redux';
// import { removeNotification } from './notificationSlice';

// const NotificationList = () => {
//   const notifications = useSelector((state) => state.notifications.notifications);
//   const dispatch = useDispatch();

//   const handleDelete = (id) => {
//     dispatch(removeNotification(id));
//   };

//   return (
//     <div>
//       {notifications.length > 0 && (
//         <div className="notification-sec flex flex-col items-center h-40">
//           <h2>Notifications</h2>
//           <div className="notifications">
//             <ul>
//               {notifications.map((notification) => (
//                 <li key={notification.id} className="notification">
//                   <div>
//                     <p>{notification.message}</p>
//                     <p>{notification.timestamp}</p>
//                   </div>
//                   <button onClick={() => handleDelete(notification.id)}>Delete</button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationList;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from './notificationSlice';
import './NotificationList.css';

const NotificationList = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeNotification(id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking': return '📦';
      case 'payment': return '💳';
      case 'delivery': return '🚚';
      default: return '🔔';
    }
  };

  return (
    <div className="notification-container">
      {notifications.length > 0 ? (
        <div className="notification-section">
          <div className="notification-header">
            <h2>🔔 Notifications</h2>
            <span className="notification-count">{notifications.length}</span>
          </div>
          <div className="notification-list">
            {notifications.map((notification) => (
              <div key={notification.id} className="notification-card">
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  {notification.details && (
                    <div className="notification-details">
                      <p><strong>Customer:</strong> {notification.details.customerName}</p>
                      <p><strong>From:</strong> {notification.details.pickup}</p>
                      <p><strong>To:</strong> {notification.details.delivery}</p>
                      <p><strong>Price:</strong> ₹{notification.details.price}</p>
                    </div>
                  )}
                  <div className="notification-timestamp">
                    {notification.timestamp}
                  </div>
                </div>
                <button 
                  className="notification-delete" 
                  onClick={() => handleDelete(notification.id)}
                  title="Remove notification"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-notifications">
          <div className="no-notifications-icon">🔕</div>
          <p>No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default NotificationList;

