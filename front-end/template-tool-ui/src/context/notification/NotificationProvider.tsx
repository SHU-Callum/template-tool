// used for providing the data context to the app

import { ReactNode, useCallback, useState } from 'react';
import { NotificationContext } from './notificationContext';
import ToastNotification, { ToastNotificationProps } from '../../components/ToastNotification';
import { NotificationType } from '../../types/notificationTypes';

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<ToastNotificationProps[]>([]);
  const [networkError, setNetworkError] = useState(false);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = prevNotifications.filter((notification) => notification.id !== id);
      return updatedNotifications.map((notification, index) => ({ ...notification, order: index }));
    });
  }, []);

  const addNotification = useCallback((message: string, type: NotificationType) => {
    const newId = performance.now() + Math.random();
    setNotifications((prevNotifications) => {
      const newNotification: ToastNotificationProps = 
        { id: newId, type, message, order: prevNotifications.length, onClose: () => removeNotification(newId) };
      const updatedNotifications = [...prevNotifications, newNotification];
      return updatedNotifications.map((notification, index) => ({ ...notification, order: index }));
    });
  }, [removeNotification]);

  const handleNetworkError = useCallback((errorState: boolean) => {
    if(errorState && !networkError) {
      setNetworkError(errorState);
    } else if(!errorState && networkError) {
      setNetworkError(errorState);
    }
  }, [networkError]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, handleNetworkError, networkError }}>
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