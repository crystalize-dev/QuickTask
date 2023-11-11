import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import React from 'react';

type ItemsType = {
    id: UniqueIdentifier;
    containerId?: UniqueIdentifier;
    title: string;
    setShowTrash?: React.Dispatch<React.SetStateAction<boolean>>;
    removeItem?: (
        type: 'container' | 'task',
        containerId?: UniqueIdentifier,
        taskId?: UniqueIdentifier
    ) => void;
};

const TaskCard = ({
    id,
    title,
    setShowTrash,
    removeItem,
    containerId
}: ItemsType) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: id,
        data: {
            type: 'item',
            containerId: containerId
        }
    });

    React.useEffect(() => {
        if (isDragging) setShowTrash && setShowTrash(true);
        else setShowTrash && setShowTrash(false);
    }, [isDragging]);

    return (
        <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            ref={setNodeRef}
            {...attributes}
            style={{
                transition,
                transform: CSS.Translate.toString(transform)
            }}
            className={`w-full cursor-pointer rounded-xl border border-transparent bg-white p-4 shadow-md dark:bg-darker-bg dark:text-white ${
                isDragging && '!opacity-50'
            }`}
        >
            <div className="flex items-center gap-4">
                <svg
                    onClick={() =>
                        removeItem && removeItem('task', containerId, id)
                    }
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

                {title}

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
        </motion.div>
    );
};

export default TaskCard;
