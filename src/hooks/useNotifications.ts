import { useState } from "react";

export type NotificationType = {
    text: string;
    id: number;
};

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Array<NotificationType>>(
        []
    );

    const addNotification = (text: string) => {
        if (notifications.find(item => item.text === text)) return;

        const newNotification = {
            id: notifications.length + 1,
            text
        };

        setNotifications([...notifications, newNotification]);

        setTimeout(() => {
            setNotifications((prevNotifications) =>
                prevNotifications.filter(
                    (notification) => notification.id !== newNotification.id
                )
            );
        }, 5000);
    };

    return {notifications, addNotification}
}