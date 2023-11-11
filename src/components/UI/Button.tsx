import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    onClick: (() => void) | undefined;
    children: React.ReactNode;
    variant?: 'ghost';
    className?: string;
}

export default function Button({
    children,
    variant,
    onClick,
    className
}: ButtonProps) {
    const getStyle = () => {
        switch (variant) {
            case 'ghost':
                return 'bg-gray-300 dark:bg-zinc-800 hover:!bg-main transition-all hover:!text-white';
            default:
                return 'bg-main hover:border-main hover:bg-transparent hover:text-black hover:dark:text-white';
        }
    };

    className = ' ' + className;

    return (
        <button
            onClick={onClick}
            className={`rounded-md border-2 border-solid border-transparent px-4 py-2 font-bold text-white transition-all ${getStyle()} ${className}`}
        >
            {children}
        </button>
    );
}
