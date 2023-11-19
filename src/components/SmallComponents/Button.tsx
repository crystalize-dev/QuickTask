import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    onClick?: (() => void) | undefined;
    children: React.ReactNode;
    variant?: 'ghost';
    className?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
    children,
    variant,
    onClick,
    type,
    className
}: ButtonProps) {
    const getStyle = () => {
        switch (variant) {
            case 'ghost':
                return 'bg-zinc-400 dark:bg-zinc-800 hover:!bg-main transition-all hover:!text-white';
            default:
                return 'bg-main hover:border-main hover:bg-transparent hover:text-black hover:dark:text-white';
        }
    };

    className = ' ' + className;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded-md border-2 border-solid border-transparent px-4 py-2 font-bold text-white transition-all ${getStyle()} ${className}`}
        >
            {children}
        </button>
    );
}
