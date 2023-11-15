import {
    DndContext,
    DragOverlay,
    UniqueIdentifier,
    closestCorners
} from '@dnd-kit/core';
import React from 'react';
import { useDrag } from '../hooks/useDrag';
import { ContainerType } from '../utility/Task-Types';
import { SortableContext } from '@dnd-kit/sortable';
import Container from './Container';
import TaskCard from './TaskCard';
import { findValue } from '../utility/findValue';
import { AnimatePresence } from 'framer-motion';
import Trash from './Trash';
import nothingFound from '../assets/nothingFound.png';

interface TaskTableProps {
    containers: ContainerType[];
    setContainers: React.Dispatch<React.SetStateAction<ContainerType[]>>;
    setTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentContainerId: React.Dispatch<
        React.SetStateAction<UniqueIdentifier | undefined>
    >;
    removeItem: (
        type: 'container' | 'task',
        containerId?: UniqueIdentifier,
        taskId?: UniqueIdentifier
    ) => void;
}

export default function TaskTable({
    containers,
    setContainers,
    setTaskModal,
    setCurrentContainerId,
    removeItem
}: TaskTableProps) {
    const {
        activeId,
        sensors,
        handleDragEnd,
        handleDragMove,
        handleDragStart
    } = useDrag(containers, setContainers, removeItem);

    const [showTrash, setShowTrash] = React.useState(false);

    return (
        <div
            className={`${
                containers.length === 0
                    ? 'flex items-center justify-center'
                    : 'grid grid-cols-1 gap-6 lg:grid-cols-3'
            }`}
        >
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
                                title={container.title}
                                id={container.id}
                                setShowTrash={setShowTrash}
                                onAddItem={() => {
                                    setTaskModal(true);
                                    setCurrentContainerId(container.id);
                                }}
                                removeItem={removeItem}
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
                                                        containerId={
                                                            container.id
                                                        }
                                                        key={item.id}
                                                        title={item.title}
                                                        id={item.id}
                                                        setShowTrash={
                                                            setShowTrash
                                                        }
                                                        removeItem={removeItem}
                                                    />
                                                ))
                                            ) : (
                                                <p className="w-full p-4 text-center text-xl font-semibold text-zinc-500">
                                                    Nothing yet!
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
                            <h1>Nothing yet!</h1>
                        </div>
                    )}
                </SortableContext>

                <DragOverlay>
                    {activeId && activeId.toString().includes('item') && (
                        <TaskCard
                            id={activeId}
                            title={String(
                                findValue(
                                    activeId,
                                    'item',
                                    containers
                                )?.items.find((item) => item.id === activeId)
                                    ?.title
                            )}
                        />
                    )}
                    {activeId && activeId.toString().includes('container') && (
                        <Container
                            id={activeId}
                            title={
                                findValue(activeId, 'container', containers)
                                    ?.title
                            }
                        >
                            {findValue(activeId, 'container', containers)?.items
                                .length !== 0 ? (
                                findValue(
                                    activeId,
                                    'container',
                                    containers
                                )?.items.map((item) => (
                                    <TaskCard
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                    />
                                ))
                            ) : (
                                <p className="w-full p-4 text-center text-xl font-semibold text-zinc-500">
                                    Nothing yet!
                                </p>
                            )}
                        </Container>
                    )}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
