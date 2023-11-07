import { AnimatePresence, motion } from 'framer-motion';
import { NotificationContext } from '../../context/NotificationContext';
import React from 'react';

export default function NotificationsArea() {
    const { notifications } = React.useContext(NotificationContext);

    return (
        <div className="z-absolute pointer-events-none fixed top-24 flex flex-col gap-2">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="z-absolute rounded-lg bg-red-500 px-4 py-2 text-white"
                    >
                        {notification.text}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
