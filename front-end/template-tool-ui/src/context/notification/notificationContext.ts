// used for creating the notification context

import { createContext } from 'react';
import { ToastNotificationProps } from '../../components/ToastNotification';
import { NotificationType } from '../../types/notificationTypes';

export interface NotificationContextType {
  notifications: ToastNotificationProps[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: number) => void;
  handleNetworkError: (errorState: boolean) => void;
  networkError: boolean;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);