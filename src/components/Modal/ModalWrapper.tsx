import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import Icon from '../SmallComponents/Icon';

interface ModalProps {
    isVisible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

export default function ModalWrapper({
    isVisible,
    setVisible,
    children
}: ModalProps) {
    return (
        <AnimatePresence initial={false}>
            {isVisible && (
                <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    className="fixed left-0 top-0 z-absolute flex h-full w-full items-center justify-center backdrop-blur"
                    onMouseDown={() => setVisible(false)}
                >
                    <Icon
                        icon={'xmark'}
                        onClick={() => setVisible(false)}
                        className="absolute right-4 top-4 h-6 w-6 lg:hidden"
                    />

                    <div
                        className="flex h-full w-full justify-center bg-white p-12 shadow-xl dark:bg-dark-obj dark:text-white md:h-fit md:w-fit md:items-center md:rounded-xl lg:border-2 lg:border-solid lg:border-main"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
