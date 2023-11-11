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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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

                    {containers.map((container) => (
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
                                items={container.items.map((item) => item.id)}
                            >
                                <div className="flex flex-col items-start gap-y-4">
                                    <AnimatePresence>
                                        {container.items.map((item) => (
                                            <TaskCard
                                                containerId={container.id}
                                                key={item.id}
                                                title={item.title}
                                                id={item.id}
                                                setShowTrash={setShowTrash}
                                                removeItem={removeItem}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </SortableContext>
                        </Container>
                    ))}
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
                            {findValue(
                                activeId,
                                'container',
                                containers
                            )?.items.map((item) => (
                                <TaskCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                />
                            ))}
                        </Container>
                    )}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
