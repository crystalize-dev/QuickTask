import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from './SmallComponents/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './SmallComponents/Icon';
import { AnimatePresence, motion } from 'framer-motion';
import { TaskContext } from '../context/TaskContext';
import { ContainerType } from '../utility/Task-Types';

interface ContainerProps {
    container: ContainerType;
    onAddItem?: () => void;
    setShowTrash?: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

const Container = ({
    container,
    onAddItem,
    setShowTrash,
    children
}: ContainerProps) => {
    const { markDeadOrAlive } = React.useContext(TaskContext);

    const { t } = useTranslation();

    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: container.id,
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
            id={container.id.toString()}
            ref={setNodeRef}
            style={{
                transition,
                transform: CSS.Translate.toString(transform)
            }}
            className={`${
                container.status === 'dead' && 'hover:!opacity-80'
            } group/container relative min-h-max w-full cursor-default rounded-xl border-none bg-gray-200 outline-none dark:bg-dark-obj dark:text-white ${
                (isDragging || container.status === 'dead') && '!opacity-50'
            }`}
        >
            <AnimatePresence initial={false}>
                {status !== 'dead' ? (
                    <motion.div
                        className="flex h-full w-full flex-col gap-y-4 p-4"
                        exit={{ scale: 0 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        <div className="flex items-center gap-4">
                            <Icon
                                icon="xmark"
                                onClick={() =>
                                    markDeadOrAlive &&
                                    markDeadOrAlive(
                                        'dead',
                                        'container',
                                        container.id
                                    )
                                }
                                className="opacity-0 transition-all  group-hover/container:opacity-100"
                            />

                            <div className="flex flex-col gap-y-1">
                                <h1 className="select-none text-xl">
                                    {container.title}
                                </h1>
                                <p className="text-sm">
                                    {container.description}
                                </p>
                            </div>

                            <Icon
                                icon="drag"
                                listners={listeners}
                                hover={false}
                                className="ml-auto cursor-grab opacity-0 transition-all group-hover/container:opacity-100"
                            />
                        </div>

                        {children}
                        <Button
                            variant="ghost"
                            onClick={onAddItem}
                            className="mt-auto"
                        >
                            {t('modal.createTask')}
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        exit={{ scale: 0 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-full w-full cursor-pointer select-none items-center justify-center gap-2 text-3xl transition-all"
                        onClick={() =>
                            markDeadOrAlive &&
                            markDeadOrAlive('alive', 'container', container.id)
                        }
                    >
                        <Icon icon="recover" hover={false} />
                        <p>{t('recover')}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Container;
