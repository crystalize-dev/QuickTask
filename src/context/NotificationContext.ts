import React from "react";
import { NotificationType } from "../hooks/useNotifications";

type NotificationContextType = {
    notifications: Array<NotificationType>;
    addNotification: (text: string) => void;
}

export const NotificationContext = React.createContext<NotificationContextType>({} as NotificationContextType);