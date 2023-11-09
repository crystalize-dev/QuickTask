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
                        className="h-full w-full rounded-lg bg-gray-100 p-4 lg:h-fit lg:w-fit"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
