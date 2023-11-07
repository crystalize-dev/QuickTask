import {
    motion,
    AnimatePresence,
    MotionValue,
    useTransform,
    useMotionValueEvent
} from 'framer-motion';
import { useState } from 'react';

interface IProps {
    scrollY: MotionValue<number>;
}

export default function ArrowUp({ scrollY }: IProps) {
    const offset = useTransform(scrollY, [0, 200], [0, 1]);
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(offset, 'change', (latest) => {
        if (latest === 1) setVisible(true);
        else setVisible(false);
    });

    const arrowVariants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
    };

    return (
        <>
            <div className="w-ful absolute left-0 top-0 h-14" id="start" />
            <AnimatePresence>
                {visible && (
                    <motion.a
                        initial="hidden"
                        animate="visible"
                        exit={'hidden'}
                        className="fixed bottom-1 right-2 z-50 cursor-pointer bg-main p-3 text-xs text-white md:bottom-6 md:right-8"
                        href="#start"
                        variants={arrowVariants}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                            />
                        </svg>
                    </motion.a>
                )}
            </AnimatePresence>
        </>
    );
}
