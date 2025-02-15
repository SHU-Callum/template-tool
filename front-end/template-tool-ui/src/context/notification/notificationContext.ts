import { createContext } from 'react';
import { ToastNotificationProps } from '../../components/ToastNotification';

export interface NotificationContextType {
  notifications: ToastNotificationProps[];
  addNotification: (message: string) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);