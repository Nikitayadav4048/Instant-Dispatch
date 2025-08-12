
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

const NotificationList = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div>
      {notifications.length > 0 && (
        <div className="notification-sec flex flex-col items-center h-40">
          <h2>Notifications</h2>
          <div className="notifications">
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className="notification">
                  <div>
                    <p>{notification.message}</p>
                    <p>{notification.timestamp}</p>
                  </div>
                  <button onClick={() => handleDelete(notification.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationList;

