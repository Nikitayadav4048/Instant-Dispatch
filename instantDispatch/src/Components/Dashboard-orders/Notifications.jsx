import React from 'react';
import './Notifications.css';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'New order received from John Doe.' },
    { id: 2, message: 'Order #123 has been delivered.' },
    { id: 3, message: 'System maintenance scheduled for tomorrow.' },
  ];

  return (
    <div className="notifications-container bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="mb-2">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
