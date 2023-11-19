import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import Icon from './SmallComponents/Icon';
import { useTranslation } from 'react-i18next';
import { TaskContext } from '../context/TaskContext';
import { TaskType } from '../utility/Task-Types';

type ItemsType = {
    task: TaskType;
    containerId: UniqueIdentifier;
    setShowTrash: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskCard = ({ task, setShowTrash, containerId }: ItemsType) => {
    const { markDeadOrAlive } = React.useContext(TaskContext);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
        data: {
            type: 'item',
            containerId: containerId
        }
    });

    const { t } = useTranslation();

    React.useEffect(() => {
        setShowTrash(isDragging);

        return () => setShowTrash(false);
    }, [isDragging, setShowTrash]);

    const constructStyles = () => {
        let resStyles = '';

        if (task.status === 'dead') resStyles += 'hover:!opacity-80 ';
        if (isDragging || task.status === 'dead') resStyles += '!opacity-50 ';
        if (task.color) resStyles += '!text-white ';

        return resStyles;
    };

    return (
        <motion.div
            id={task.id.toString()}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            ref={setNodeRef}
            {...attributes}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
                backgroundColor: task.color ? task.color : undefined
            }}
            className={`group relative w-full max-w-full cursor-default rounded-xl border-none bg-white px-10 py-8 shadow-lg outline-none dark:bg-darker-bg dark:text-white ${constructStyles()}`}
        >
            <AnimatePresence initial={false}>
                {task.status !== 'dead' ? (
                    <div className="flex items-center gap-4">
                        <Icon
                            icon="xmark"
                            onClick={() =>
                                markDeadOrAlive &&
                                markDeadOrAlive(
                                    'dead',
                                    'task',
                                    containerId,
                                    task.id
                                )
                            }
                            className="absolute left-2 top-3 w-6 align-baseline opacity-0 transition-all group-hover:opacity-100"
                        />

                        <p className="whitespace-pre-line break-all">
                            {task.title}
                        </p>

                        <Icon
                            icon="drag"
                            className="absolute right-3 top-3 ml-auto h-6 w-6 cursor-grab text-inherit opacity-0 transition-all group-hover:opacity-100"
                            listners={listeners}
                            hover={false}
                        />
                    </div>
                ) : (
                    <motion.div
                        exit={{ scale: 0 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-1xl flex h-full w-full cursor-pointer select-none items-center justify-center gap-2"
                        onClick={() =>
                            markDeadOrAlive &&
                            markDeadOrAlive(
                                'alive',
                                'task',
                                containerId,
                                task.id
                            )
                        }
                    >
                        <Icon
                            icon="recover"
                            hover={false}
                            className="text-inherit"
                        />
                        <p>{t('recover')}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TaskCard;
