import { TargetAndTransition, VariantLabels, motion } from 'framer-motion';
import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    onClick?: (() => void) | undefined;
    children: React.ReactNode;
    variant?: 'ghost' | 'main' | null;
    className?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    style?: React.CSSProperties | undefined;
    isMotion?: boolean;
    whileHover?: VariantLabels | TargetAndTransition | undefined;
}

const Button = React.forwardRef(
    (
        {
            children,
            variant,
            onClick,
            type,
            className,
            style,
            isMotion = false,
            whileHover
        }: ButtonProps,
        ref: React.LegacyRef<HTMLButtonElement> | undefined
    ) => {
        const getStyle = () => {
            switch (variant) {
                case 'ghost':
                    return 'bg-zinc-400 dark:bg-zinc-800 hover:!bg-main transition-all hover:!text-white';
                case 'main':
                    return 'bg-main hover:border-main hover:bg-transparent hover:text-black hover:dark:text-white';
            }
        };

        const constructStyles = () => {
            let resStyles = '';

            if (className) resStyles += className + ' ';
            if (variant) resStyles += getStyle() + ' ';

            return resStyles;
        };

        if (isMotion)
            return (
                <motion.button
                    style={style}
                    whileHover={whileHover}
                    type={type}
                    onClick={onClick}
                    className={`rounded-md border-2 border-solid border-transparent px-4 py-2 font-bold text-white transition-all ${constructStyles()}`}
                >
                    {children}
                </motion.button>
            );
        else
            return (
                <button
                    style={style}
                    ref={ref}
                    type={type}
                    onClick={onClick}
                    className={`rounded-md border-2 border-solid border-transparent px-4 py-2 font-bold text-white transition-all ${constructStyles()}`}
                >
                    {children}
                </button>
            );
    }
);

export default Button;
