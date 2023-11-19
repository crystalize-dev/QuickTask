import { DndContext, closestCorners } from '@dnd-kit/core';
import React from 'react';
import { useDrag } from '../hooks/useDrag';
import { SortableContext } from '@dnd-kit/sortable';
import Container from './Container';
import TaskCard from './TaskCard';
import { AnimatePresence } from 'framer-motion';
import Trash from './SmallComponents/Trash';
import nothingFound from '../assets/nothingFound.png';
import { useTranslation } from 'react-i18next';
import Dragoverlay from './Dragoverlay';
import { TaskContext } from '../context/TaskContext';
import ModalTaskCreate from './Modal/ModalTaskCreate';

export default function TaskTable() {
    const { containers, setContainers, setCurrentContainerId } =
        React.useContext(TaskContext);

    const {
        activeId,
        sensors,
        handleDragEnd,
        handleDragMove,
        handleDragStart
    } = useDrag(containers, setContainers);

    const [showTrash, setShowTrash] = React.useState(false);
    const [modalTask, setModalTask] = React.useState(false);

    const { t } = useTranslation();

    return (
        <div
            className={`${
                containers.length === 0
                    ? 'flex items-center justify-center'
                    : 'grid grid-cols-1 gap-6 lg:grid-cols-3'
            }`}
        >
            <ModalTaskCreate
                taskModal={modalTask}
                setTaskModal={setModalTask}
            />

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={containers.map((container) => container.id)}
                >
                    <Trash isDragging={showTrash} />

                    {containers.length !== 0 ? (
                        containers.map((container) => (
                            <Container
                                key={container.id}
                                container={container}
                                onAddItem={() => {
                                    setModalTask(true);
                                    setCurrentContainerId(container.id);
                                }}
                                setShowTrash={setShowTrash}
                            >
                                <SortableContext
                                    items={container.items.map(
                                        (item) => item.id
                                    )}
                                >
                                    <div className="flex flex-col items-start gap-y-4">
                                        <AnimatePresence>
                                            {container.items.length !== 0 ? (
                                                container.items.map((item) => (
                                                    <TaskCard
                                                        task={item}
                                                        containerId={
                                                            container.id
                                                        }
                                                        key={item.id}
                                                        setShowTrash={
                                                            setShowTrash
                                                        }
                                                    />
                                                ))
                                            ) : (
                                                <p
                                                    className={`w-full p-4 text-center text-xl font-semibold ${
                                                        container.color
                                                            ? 'text-white'
                                                            : 'text-zinc-500'
                                                    }`}
                                                >
                                                    {t('nothing')}
                                                </p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </SortableContext>
                            </Container>
                        ))
                    ) : (
                        <div className="flex h-96 w-full flex-col items-center justify-center text-3xl font-bold capitalize text-gray-600">
                            <img
                                src={nothingFound}
                                alt="nothing found"
                                draggable={false}
                                className="h-3/4"
                            />
                            <h1> {t('nothing')}</h1>
                        </div>
                    )}
                </SortableContext>

                <Dragoverlay activeId={activeId} />
            </DndContext>
        </div>
    );
}
