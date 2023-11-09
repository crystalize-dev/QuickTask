import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    onClick: (() => void) | undefined;
    children: React.ReactNode;
    variant?: 'ghost' | 'default';
}

export default function Button({ children, variant, onClick }: ButtonProps) {
    const getStyle = () => {
        switch (variant) {
            case 'default':
                return 'bg-main';
            case 'ghost':
                return 'bg-gray-300 dark:bg-gray-500 hover:!bg-main transition-all';
            default:
                return 'bg-main';
        }
    };

    return (
        <button
            onClick={onClick}
            className={`rounded-md px-4 py-2 text-white ${getStyle()}`}
        >
            {children}
        </button>
    );
}
