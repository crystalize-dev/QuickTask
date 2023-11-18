import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import React from 'react';
import Icon from './UI/Icon';

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
        setShowTrash && setShowTrash(isDragging);
    }, [isDragging, setShowTrash]);

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
            className={`w-full cursor-default rounded-xl border-none bg-white p-4 shadow-md outline-none dark:bg-darker-bg dark:text-white ${
                isDragging && '!opacity-50'
            }`}
        >
            <div className="flex items-center gap-4">
                <Icon
                    path="M6 18L18 6M6 6l12 12"
                    onClick={() =>
                        removeItem && removeItem('task', containerId, id)
                    }
                />

                {title}

                <Icon
                    path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    className="ml-auto cursor-grab"
                    listners={listeners}
                    hover={false}
                />
            </div>
        </motion.div>
    );
};

export default TaskCard;
