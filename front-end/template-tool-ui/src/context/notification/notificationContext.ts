import { createContext } from 'react';
import { ToastNotificationProps } from '../../components/ToastNotification';
import { NotificationType } from '../../types/notificationTypes';

export interface NotificationContextType {
  notifications: ToastNotificationProps[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);