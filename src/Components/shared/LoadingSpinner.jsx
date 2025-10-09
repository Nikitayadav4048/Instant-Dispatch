import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'orange' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    orange: 'border-orange-500',
    blue: 'border-blue-500',
    green: 'border-green-500'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;