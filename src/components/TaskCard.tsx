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
    containerId?: UniqueIdentifier;
    setShowTrash?: React.Dispatch<React.SetStateAction<boolean>>;
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
        setShowTrash && setShowTrash(isDragging);
    }, [isDragging, setShowTrash]);

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
                transform: CSS.Translate.toString(transform)
            }}
            className={`${
                task.status === 'dead' && 'hover:!opacity-100'
            } group w-full cursor-default rounded-xl border-none bg-white p-4 shadow-md outline-none dark:bg-darker-bg dark:text-white ${
                (isDragging || task.status === 'dead') && '!opacity-50'
            }`}
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
                            className="opacity-0 transition-all  group-hover:opacity-100"
                        />

                        {task.title}

                        <Icon
                            icon="drag"
                            className="ml-auto cursor-grab opacity-0 transition-all  group-hover:opacity-100"
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
                        <Icon icon="recover" hover={false} />
                        <p>{t('recover')}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TaskCard;
