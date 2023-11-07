import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    DirectionType,
    getDirection
} from '../../utility/functions/getDirection';

interface IProps {
    children: React.ReactNode;
    hint: string;
    className?: string;
    direction: DirectionType;
    breakWord?: boolean;
}

export default function WithHint({
    hint,
    direction,
    children,
    className,
    breakWord
}: IProps) {
    const [isHover, setHover] = React.useState(false);

    const directionObj = getDirection(direction);

    className = className ? ' ' + className : '';

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={
                `relative flex h-fit w-fit items-center ${directionObj.align}` +
                className
            }
        >
            {children}

            <AnimatePresence initial={false}>
                {isHover && (
                    <motion.h1
                        initial={'hidden'}
                        exit={'hidden'}
                        animate={'visible'}
                        variants={directionObj.variants}
                        className={`${
                            directionObj.margin
                        } pointer-events-none absolute z-absolute h-fit w-fit select-none whitespace-nowrap rounded-lg bg-white-obj-lighter px-4 py-2 font-semibold text-black shadow-lg dark:bg-obj dark:text-white ${
                            breakWord ? '!whitespace-pre' : ''
                        }`}
                    >
                        {hint}
                    </motion.h1>
                )}
            </AnimatePresence>
        </div>
    );
}
