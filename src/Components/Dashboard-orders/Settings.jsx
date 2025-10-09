import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      orderUpdates: true,
      newOrders: true,
      promotions: false,
      systemAlerts: true,
      emailNotifications: true,
      pushNotifications: true
    },
    privacy: {
      shareLocation: true,
      showOnlineStatus: true,
      allowDataCollection: false,
      sharePerformanceData: true
    },
    preferences: {
      language: 'en',
      theme: 'light',
      soundEnabled: true,
      autoAcceptOrders: false,
      workingHours: {
        start: '09:00',
        end: '18:00'
      }
    },
    account: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      autoLogout: true
    }
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('riderSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleNestedSettingChange = (category, parentSetting, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentSetting]: {
          ...prev[category][parentSetting],
          [setting]: value
        }
      }
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('riderSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetSettings = () => {
    const defaultSettings = {
      notifications: {
        orderUpdates: true,
        newOrders: true,
        promotions: false,
        systemAlerts: true,
        emailNotifications: true,
        pushNotifications: true
      },
      privacy: {
        shareLocation: true,
        showOnlineStatus: true,
        allowDataCollection: false,
        sharePerformanceData: true
      },
      preferences: {
        language: 'en',
        theme: 'light',
        soundEnabled: true,
        autoAcceptOrders: false,
        workingHours: {
          start: '09:00',
          end: '18:00'
        }
      },
      account: {
        twoFactorAuth: false,
        sessionTimeout: '30',
        autoLogout: true
      }
    };
    setSettings(defaultSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4 flex items-center">
            <span className="mr-3 text-orange-500 text-4xl">⚙️</span>
            Settings
          </h1>
          <p className="text-gray-600 text-lg">Customize your rider dashboard experience</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
            ✅ Settings saved successfully!
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-orange-500">🔔</span>
              Notifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(settings.notifications || {}).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <label className="text-gray-700 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-orange-500">🔒</span>
              Privacy & Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(settings.privacy || {}).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <label className="text-gray-700 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-orange-500">🎨</span>
              Preferences
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center">
                    <span className="mr-2 text-orange-500">🌐</span>
                    Language
                  </label>
                  <select
                    value={settings.preferences?.language || 'en'}
                    onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="mr">मराठी</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Theme</label>
                  <select
                    value={settings.preferences?.theme || 'light'}
                    onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <label className="text-gray-700 font-medium flex items-center">
                    <span className="mr-2 text-orange-500">🔊</span>
                    Sound Enabled
                  </label>
                  <input
                    type="checkbox"
                    checked={settings.preferences?.soundEnabled || false}
                    onChange={(e) => handleSettingChange('preferences', 'soundEnabled', e.target.checked)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <label className="text-gray-700 font-medium">Auto Accept Orders</label>
                  <input
                    type="checkbox"
                    checked={settings.preferences?.autoAcceptOrders || false}
                    onChange={(e) => handleSettingChange('preferences', 'autoAcceptOrders', e.target.checked)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Working Hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 font-medium">Start Time</label>
                    <input
                      type="time"
                      value={settings.preferences?.workingHours?.start || '09:00'}
                      onChange={(e) => handleNestedSettingChange('preferences', 'workingHours', 'start', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium">End Time</label>
                    <input
                      type="time"
                      value={settings.preferences?.workingHours?.end || '18:00'}
                      onChange={(e) => handleNestedSettingChange('preferences', 'workingHours', 'end', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={saveSettings}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-500 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>💾</span>
              Save Settings
            </button>
            <button
              onClick={resetSettings}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-400 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-500 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>🔄</span>
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;