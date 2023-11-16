import React from 'react';

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    autoFocus?: boolean;
}

const Input = ({
    name,
    value,
    placeholder,
    onChange,
    autoFocus
}: InputProps) => {
    return (
        <input
            autoFocus={autoFocus}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full rounded-lg border border-solid border-transparent bg-transparent p-2 shadow-lg outline-none transition-all hover:shadow-xl focus:border-black dark:focus:border-white"
        ></input>
    );
};

export default Input;
