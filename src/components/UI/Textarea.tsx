import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface IProps extends React.HTMLAttributes<HTMLTextAreaElement> {
    value?: string;
    required?: boolean;
    name?: string;
    maxRows?: number;
    handleKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function Textarea({
    value,
    required,
    name,
    maxRows,
    handleKeyDown,
    ...props
}: IProps) {
    return (
        <TextareaAutosize
            onKeyDown={handleKeyDown}
            name={name}
            onBlur={props.onBlur}
            maxRows={maxRows}
            value={value}
            className={
                props.className +
                ' ' +
                'w-full rounded-md border-2 border-main bg-transparent p-2 outline-none transition-all focus:!border-main focus:ring-0'
            }
            placeholder={props.placeholder}
            onChange={props.onChange}
            required={required}
            autoFocus={props.autoFocus}
        />
    );
}
