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

interface TaskTableProps {
    containers: ContainerType[];
    setContainers: React.Dispatch<React.SetStateAction<ContainerType[]>>;
    setTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentContainerId: React.Dispatch<
        React.SetStateAction<UniqueIdentifier | undefined>
    >;
}

export default function TaskTable({
    containers,
    setContainers,
    setTaskModal,
    setCurrentContainerId
}: TaskTableProps) {
    const {
        activeId,
        sensors,
        handleDragEnd,
        handleDragMove,
        handleDragStart
    } = useDrag(containers, setContainers);

    return (
        <div className="mt-10">
            <div className="grid grid-cols-3 gap-6">
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
                        {containers.map((container) => (
                            <Container
                                key={container.id}
                                title={container.title}
                                id={container.id}
                                onAddItem={() => {
                                    setTaskModal(true);
                                    setCurrentContainerId(container.id);
                                }}
                            >
                                <SortableContext
                                    items={container.items.map(
                                        (item) => item.id
                                    )}
                                >
                                    <div className="flex flex-col items-start gap-y-4">
                                        {container.items.map((item) => (
                                            <TaskCard
                                                key={item.id}
                                                title={item.title}
                                                id={item.id}
                                            />
                                        ))}
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
                                    )?.items.find(
                                        (item) => item.id === activeId
                                    )?.title
                                )}
                            />
                        )}
                        {activeId &&
                            activeId.toString().includes('container') && (
                                <Container
                                    id={activeId}
                                    title={
                                        findValue(
                                            activeId,
                                            'container',
                                            containers
                                        )?.title
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
        </div>
    );
}
