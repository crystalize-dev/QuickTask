import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from './UI/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './UI/Icon';

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
    const { t } = useTranslation();

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
        setShowTrash && setShowTrash(isDragging);
    }, [isDragging, setShowTrash]);

    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{
                transition,
                transform: CSS.Translate.toString(transform)
            }}
            className={`flex h-full w-full cursor-default flex-col gap-y-4 rounded-xl border-none bg-gray-200 p-4 outline-none transition-all dark:bg-dark-obj dark:text-white ${
                isDragging && '!opacity-50'
            }`}
        >
            <div className="flex items-center gap-4">
                <Icon
                    path="M6 18L18 6M6 6l12 12"
                    onClick={() => removeItem && removeItem('container', id)}
                />

                <div className="flex flex-col gap-y-1">
                    <h1 className="select-none text-xl">{title}</h1>
                    <p className="text-sm">{description}</p>
                </div>

                <Icon
                    path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    listners={listeners}
                    hover={false}
                    className="ml-auto cursor-grab"
                />
            </div>

            {children}
            <Button variant="ghost" onClick={onAddItem}>
                {t('modal.createTask')}
            </Button>
        </div>
    );
};

export default Container;
