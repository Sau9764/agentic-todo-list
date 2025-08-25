import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const typeStyles = {
    danger: {
      icon: 'text-red-600',
      button: 'btn-danger',
    },
    warning: {
      icon: 'text-yellow-600',
      button: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    },
    info: {
      icon: 'text-blue-600',
      button: 'btn-primary',
    },
  };

  const currentStyle = typeStyles[type];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="p-6">
            {/* Icon and Title */}
            <div className="flex items-center space-x-3 mb-4">
              <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${
                type === 'danger' ? 'bg-red-100 dark:bg-red-900/20' :
                type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                'bg-blue-100 dark:bg-blue-900/20'
              }`}>
                <AlertTriangle className={`w-6 h-6 ${currentStyle.icon}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            </div>

            {/* Message */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className={`btn ${currentStyle.button}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
