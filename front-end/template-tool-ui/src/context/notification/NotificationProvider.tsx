import { ReactNode, useCallback, useState } from 'react';
import { NotificationContext } from './notificationContext';
import ToastNotification, { ToastNotificationProps } from '../../components/ToastNotification';
import { NotificationType } from '../../types/notificationTypes';

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<ToastNotificationProps[]>([]);

  const addNotification = (message: string, type: NotificationType) => {
    const newId = Date.now();
    const newNotification: ToastNotificationProps = { id: newId, type, message, order: notifications.length, onClose: () => removeNotification(newId) };
    setNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications, newNotification];
      return updatedNotifications.map((notification, index) => ({ ...notification, order: index }));
    });
  };

  const removeNotification = useCallback((id: number) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = prevNotifications.filter((notification) => notification.id !== id);
      return updatedNotifications.map((notification, index) => ({ ...notification, order: index }));
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children /* renders app.tsx etc. */ }
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <ToastNotification
            key={notification.id}
            id={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
            order={notification.order}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};