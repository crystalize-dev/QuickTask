import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from './UI/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './SmallComponents/Icon';
import { AnimatePresence, motion } from 'framer-motion';
import { TaskContext } from '../context/TaskContext';
import { ContainerType } from '../utility/Types/Task-Types';
import { getDarkerColor } from '../utility/Functions/getDarkerColor';
import ModalContainerUpdate from './Modal/ModalContainerUpdate';

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
    const [updateModal, setUpdateModal] = React.useState(false);

    const buttonColors: {
        buttonColor: string | undefined;
        darkerButtonColor: string | undefined;
    } = {
        buttonColor: container.color
            ? getDarkerColor(container.color, 0.5)
            : undefined,
        darkerButtonColor: container.color
            ? getDarkerColor(container.color, 0.8)
            : undefined
    };

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

    React.useEffect(() => {}, [container]);

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
            className={`group/container relative min-h-max w-full cursor-default rounded-xl border-none bg-gray-200 text-black outline-none dark:bg-dark-obj dark:text-white ${constructStyles()}`}
        >
            <ModalContainerUpdate
                modal={updateModal}
                setModal={setUpdateModal}
                currentOptions={container}
            />

            <AnimatePresence initial={false}>
                {container.status !== 'dead' ? (
                    <motion.div
                        className="flex h-full w-full flex-col gap-y-4 p-4"
                        exit={{ scale: 0 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        <div className="relative flex w-full items-center justify-between gap-4">
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
                                className="absolute text-inherit opacity-0 transition-all group-hover/container:opacity-100"
                            />

                            <div className="ml-8 flex flex-col gap-y-1">
                                <h1 className="select-none text-xl">
                                    {container.title}
                                </h1>
                                <p className="text-xs font-semibold text-zinc-400 opacity-70">
                                    {container.description}
                                </p>
                            </div>

                            <Icon
                                icon="settings"
                                onClick={() => setUpdateModal(true)}
                                className="absolute right-10 text-inherit opacity-0 transition-all group-hover/container:opacity-100"
                            />

                            <Icon
                                icon="drag"
                                listners={listeners}
                                hover={false}
                                className="absolute right-2 cursor-grab text-inherit opacity-0 transition-all group-hover/container:opacity-100"
                            />
                        </div>

                        {children}
                        <Button
                            isMotion={true}
                            whileHover={{
                                backgroundColor: buttonColors.buttonColor
                            }}
                            variant={!container.color ? 'ghost' : null}
                            style={{
                                backgroundColor: buttonColors.darkerButtonColor
                            }}
                            onClick={onAddItem}
                            className="hover: mt-auto"
                        >
                            {t('modal.createTask.title')}
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        exit={{ scale: 0 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-full min-h-sm w-full cursor-pointer select-none items-center justify-center gap-2 text-3xl transition-all"
                        onClick={() =>
                            markDeadOrAlive &&
                            markDeadOrAlive('alive', 'container', container.id)
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
        </div>
    );
};

export default Container;
