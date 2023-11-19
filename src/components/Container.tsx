import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from './UI/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './SmallComponents/Icon';
import { AnimatePresence, motion } from 'framer-motion';
import { TaskContext } from '../context/TaskContext';
import { ContainerType } from '../utility/Task-Types';
import { getDarkerColor } from '../utility/getDarkerColor';

interface ContainerProps {
    container: ContainerType;
    onAddItem: () => void;
    setShowTrash: React.Dispatch<React.SetStateAction<boolean>>;
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
        setShowTrash(isDragging);

        return () => setShowTrash(false);
    }, [isDragging, setShowTrash]);

    const constructStyles = () => {
        let resStyles = '';

        if (container.status === 'dead') resStyles += 'hover:!opacity-80 ';
        if (isDragging || container.status === 'dead')
            resStyles += '!opacity-50 ';
        if (container.color) resStyles += '!text-white ';

        return resStyles;
    };

    return (
        <div
            {...attributes}
            id={container.id.toString()}
            ref={setNodeRef}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
                backgroundColor: container.color ? container.color : undefined
            }}
            className={`group/container relative min-h-max w-full cursor-default rounded-xl border-none bg-gray-200 outline-none dark:bg-dark-obj dark:text-white ${constructStyles()}`}
        >
            <AnimatePresence initial={false}>
                {container.status !== 'dead' ? (
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
                                className="text-inherit opacity-0 transition-all group-hover/container:opacity-100"
                            />

                            <div className="flex flex-col gap-y-1">
                                <h1 className="select-none text-xl">
                                    {container.title}
                                </h1>
                                <p className="text-xs text-zinc-600 opacity-70">
                                    {container.description}
                                </p>
                            </div>

                            <Icon
                                icon="drag"
                                listners={listeners}
                                hover={false}
                                className="ml-auto cursor-grab text-inherit opacity-0 transition-all group-hover/container:opacity-100"
                            />
                        </div>

                        {children}
                        <Button
                            isMotion={true}
                            whileHover={
                                container.color
                                    ? {
                                          backgroundColor: getDarkerColor(
                                              container.color,
                                              0.5
                                          )
                                      }
                                    : undefined
                            }
                            variant={!container.color ? 'ghost' : null}
                            style={
                                container.color
                                    ? {
                                          backgroundColor: getDarkerColor(
                                              container.color,
                                              0.8
                                          )
                                      }
                                    : undefined
                            }
                            onClick={onAddItem}
                            className="hover: mt-auto"
                        >
                            {t('modal.createTask')}
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        exit={{ scale: 0 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="min-h-sm flex h-full w-full cursor-pointer select-none items-center justify-center gap-2 text-3xl transition-all"
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
