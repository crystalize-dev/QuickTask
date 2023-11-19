import React from 'react';
import WithHint from './WithHint';
import Icon from './Icon';

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
                <p className="text-sm text-zinc-400">{label}</p>
                {withHint && (
                    <WithHint
                        hint={withHint}
                        direction="right"
                        breakWord={true}
                    >
                        <Icon
                            icon="questionRound"
                            className="hidden cursor-help lg:block"
                        />
                    </WithHint>
                )}
            </div>

            {childrenClassName ? <StyledChildren /> : children}
        </div>
    );
}
