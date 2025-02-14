import { useState, useEffect, useCallback } from 'react';

interface NotificationProps {
  message: string;
  duration?: number; // Duration in milliseconds
  onClose?: () => void; // Function to call when the notification finishes
  index: number; // Index of the notification for dynamic positioning
}

function Notification({ message, duration = 5000, onClose, index }: NotificationProps) {
  const [visible, setVisible] = useState(true);

  const closeNotification = useCallback(() => {
    if (visible) {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }
  }, [onClose, visible]);

  useEffect(() => {
    const timer = setTimeout(closeNotification, duration);
    return () => clearTimeout(timer);
  }, [duration, closeNotification]);

  if (!visible) return null;

  return (
    <div
      className="fixed right-4 bg-blue-500 text-white p-4 rounded shadow-lg flex items-center z-50 transition-transform"
      style={{ bottom: `${4 + index * 60}px` }} // Adjust the offset based on the index
    >
      <span className="flex-grow">{message}</span>
      <button onClick={closeNotification} className="ml-4 p-1 w-6 h-6 bg-blue-400 flex items-center justify-center">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
      </button>
    </div>
  );
}

export default Notification;