import React, { useState, useEffect } from 'react';

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New order #${Math.floor(Math.random() * 9999)} received`,
        time: new Date().toLocaleTimeString(),
        type: 'order'
      };
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-semibold mb-3">Live Notifications</h3>
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No new notifications</p>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
              <span className="text-sm">{notification.message}</span>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RealTimeNotifications;