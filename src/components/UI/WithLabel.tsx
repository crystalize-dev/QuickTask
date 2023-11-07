import React from 'react';
import WithHint from './WithHint';

interface IProps {
    children: React.ReactElement;
    label: string;
    className?: string;
    childrenClassName?: string;
    withHint?: string;
}

export default function WithLabel({
    label,
    children,
    className,
    withHint,
    childrenClassName
}: IProps) {
    const StyledChildren = () =>
        React.cloneElement(children, { className: childrenClassName });

    return (
        <div className={`flex flex-col gap-1 ${className ? className : ''}`}>
            <div className="flex items-center gap-4 text-lg font-semibold">
                <p>{label}</p>
                {withHint && (
                    <WithHint
                        hint={withHint}
                        direction="right"
                        breakWord={true}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="hidden h-5 w-5 cursor-help lg:block"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                        </svg>
                    </WithHint>
                )}
            </div>

            {childrenClassName ? <StyledChildren /> : children}
        </div>
    );
}
