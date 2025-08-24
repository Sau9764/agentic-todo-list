import React from 'react';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const Error: React.FC<ErrorProps> = ({ 
  message = 'Something went wrong',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div className="mb-4">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error
        </h3>
        <p className="text-gray-600">{message}</p>
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-primary"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
