import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from './UI/Button';
import React from 'react';

interface ContainerProps {
    id: UniqueIdentifier;
    children: React.ReactNode;
    title?: string;
    description?: string;
    onAddItem?: () => void;
    removeItem?: (
        type: 'container' | 'task',
        containerId?: UniqueIdentifier,
        taskId?: UniqueIdentifier
    ) => void;
    setShowTrash?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = ({
    id,
    children,
    title,
    description,
    onAddItem,
    removeItem,
    setShowTrash
}: ContainerProps) => {
    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: id,
        data: {
            type: 'container'
        }
    });

    React.useEffect(() => {
        if (isDragging) setShowTrash && setShowTrash(true);
        else setShowTrash && setShowTrash(false);
    }, [isDragging]);

    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{
                transition,
                transform: CSS.Translate.toString(transform)
            }}
            className={`flex h-full w-full flex-col gap-y-4 rounded-xl bg-gray-200 p-4 transition-all dark:bg-dark-obj dark:text-white ${
                isDragging && '!opacity-50'
            }`}
        >
            <div className="flex items-center gap-4">
                <svg
                    onClick={() => removeItem && removeItem('container', id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-4 w-4 cursor-pointer transition-all hover:scale-125"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>

                <div className="flex flex-col gap-y-1">
                    <h1 className="select-none text-xl">{title}</h1>
                    <p className="text-sm">{description}</p>
                </div>

                <svg
                    {...listeners}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-auto h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>

            {children}
            <Button variant="ghost" onClick={onAddItem}>
                Add Item
            </Button>
        </div>
    );
};

export default Container;
