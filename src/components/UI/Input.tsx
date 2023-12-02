import React from 'react';

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    autoFocus?: boolean;
    required?: boolean;
    value?: string | null;
    setValue?: React.Dispatch<React.SetStateAction<string | null>>;
    onChange?: (e: React.ChangeEvent) => void;
    options?: {
        maxSymbols?: number;
        minSymbols?: number;
    };
}

const Input = ({
    name,
    value,
    setValue,
    onChange,
    placeholder,
    autoFocus,
    required,
    options
}: InputProps) => {
    const [defaultValue, setDefaultValue] = React.useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = (e.target as HTMLInputElement).value;

        if (options) {
            if (options.maxSymbols) {
                if (text.length > options.maxSymbols) return;
            }
            if (options.minSymbols) {
                if (text.length < options.minSymbols) return;
            }
        }

        if (onChange) {
            onChange(e);
        }

        if (setValue) {
            setValue(text);
        } else {
            setDefaultValue(text);
        }
    };

    return (
        <input
            required={required}
            autoFocus={autoFocus}
            name={name}
            value={value ? value : defaultValue}
            autoComplete={'off'}
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            className="w-full rounded-md border-2 border-main bg-transparent p-2 text-black outline-none transition-all focus:!border-main focus:ring-0 dark:text-white"
        />
    );
};

export default Input;
