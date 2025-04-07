import { NotificationType } from "../types/notificationTypes";

export interface ToastNotificationProps {
  id: number;
  type: NotificationType;
  message: string;
  duration?: number; // Duration in milliseconds
  onClose: () => void; // Function to call when the notification finishes
  order: number; // Index of the notification for dynamic positioning
}

function ToastNotification({ message, type, duration = 4000, onClose, order: index }: ToastNotificationProps) {
  setTimeout(() => {
    onClose();
  }, duration);

  return (
    <div
      className={`fixed right-4 p-4 rounded shadow-lg flex items-center -z-50 transition-transform ${
        type === NotificationType.SUCCESS ? "bg-green-500" : type === NotificationType.ERROR ? "bg-orange-500" : "bg-blue-500"
        } text-white`}
        style={{ bottom: `${4 + index * 60}px` }} // Adjust the offset based on the index
      >
      <span className="flex-grow">{message}</span>
      <button onClick={onClose} className={`ml-4 p-1 w-6 h-6 flex items-center justify-center ${
        type === NotificationType.SUCCESS ? "bg-green-400" : type === NotificationType.ERROR ? "bg-orange-400" : "bg-blue-400"}`}>
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
        </svg>
      </button>
    </div>
  );
}

export default ToastNotification;