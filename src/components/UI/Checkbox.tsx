import React from 'react';

interface CheckboxProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent) => void;
    className?: string;
}

export default function Checkbox({
    checked,
    onChange,
    className
}: CheckboxProps) {
    className = ' ' + className;

    return (
        <input
            checked={checked}
            onChange={onChange}
            className={`cursor-pointer rounded-sm border-main bg-transparent p-1 checked:bg-main focus:border-transparent focus:!bg-main focus:outline-none focus:ring-0 ${className}`}
            type="checkbox"
        />
    );
}
