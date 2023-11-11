import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface ModalProps {
    isVisible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

export default function Modal({ isVisible, setVisible, children }: ModalProps) {
    return (
        <AnimatePresence initial={false}>
            {isVisible && (
                <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    className="fixed left-0 top-0 z-9999 flex h-full w-full items-center justify-center backdrop-blur"
                    onMouseDown={() => setVisible(false)}
                >
                    <div
                        className="flex h-full w-full justify-center bg-white p-8 shadow-xl dark:bg-dark-obj dark:text-white md:h-fit md:w-fit md:items-center md:rounded-lg"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
