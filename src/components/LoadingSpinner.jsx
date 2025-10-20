import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader className={`${sizeClasses[size]} animate-spin text-blue-500`} />
      {text && (
        <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>
      )}
    </div>
  );
}
