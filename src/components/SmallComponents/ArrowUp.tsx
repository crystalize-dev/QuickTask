import {
    motion,
    AnimatePresence,
    MotionValue,
    useTransform,
    useMotionValueEvent
} from 'framer-motion';
import { useState } from 'react';
import Icon from './Icon';

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
            <div
                className="pointer-events-none absolute left-0 top-0 z-absolute h-14 w-full"
                id="start"
            />

            <AnimatePresence>
                {visible && (
                    <motion.a
                        initial="hidden"
                        animate="visible"
                        exit={'hidden'}
                        className="fixed bottom-1 right-1 z-50 cursor-pointer rounded-full bg-main p-3 text-xs text-white md:bottom-6 md:right-8 md:rounded-none"
                        href="#start"
                        variants={arrowVariants}
                    >
                        <Icon icon="arrowUp" hover={false} />
                    </motion.a>
                )}
            </AnimatePresence>
        </>
    );
}
