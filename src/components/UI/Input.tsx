import React from 'react';

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    autoFocus?: boolean;
    required?: boolean;
    options?: {
        maxSymbols?: number;
        minSymbols?: number;
    };
}

const Input = ({
    name,
    placeholder,
    autoFocus,
    required,
    options
}: InputProps) => {
    const [value, setValue] = React.useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = (e.target as HTMLInputElement).value;

        if (options) {
            if (options.maxSymbols) {
                if (text.length > options.maxSymbols) return;
            }
            if (options.minSymbols) {
                if (text.length < options.minSymbols) return;
            }
        }

        setValue(text);
    };

    return (
        <input
            required={required}
            autoFocus={autoFocus}
            name={name}
            value={value}
            autoComplete={'off'}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
            className="w-full rounded-md border-2 border-main bg-transparent p-2 outline-none transition-all focus:!border-white focus:ring-0"
        />
    );
};

export default Input;
