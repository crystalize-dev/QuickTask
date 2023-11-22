import React from 'react';
import { ContainerType, TaskType } from '../utility/Task-Types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { findValue } from '../utility/findValue';

export const useTasks = () => {
    const [containers, setContainers] = React.useState<ContainerType[]>([]);

    const [currentContainerId, setCurrentContainerId] =
        React.useState<UniqueIdentifier>();

    const addContainer = (container: ContainerType) => {
        if (!container) return;

        setContainers([...containers, container]);
    };

    const addTask = (task: TaskType) => {
        if (!task) return;

        const container = containers.find(
            (item) => item.id === currentContainerId
        );

        if (!container) return;

        container.items.push(task);

        setContainers([...containers]);
    };

    const removeItem = async (
        type: 'container' | 'task',
        ContainerId?: UniqueIdentifier,
        taskId?: UniqueIdentifier
    ) => {
        if (!ContainerId && !taskId) return;

        switch (type) {
            case 'container': {
                setContainers([
                    ...containers.filter(
                        (container) => container.id !== ContainerId
                    )
                ]);
                break;
            }
            case 'task': {
                const targetContainer = findValue(
                    ContainerId,
                    'container',
                    containers
                );

                if (!targetContainer) return;

                const newItems = targetContainer.items.filter(
                    (task) => task.id !== taskId
                );

                targetContainer.items = newItems;

                setContainers([
                    ...containers.map((container) => {
                        if (container.id === targetContainer.id)
                            return targetContainer;
                        else return container;
                    })
                ]);
                break;
            }
        }
    };

    const markDeadOrAlive = (
        status: 'dead' | 'alive',
        type: 'container' | 'task',
        ContainerId?: UniqueIdentifier,
        taskId?: UniqueIdentifier
    ) => {
        if (!ContainerId && !taskId) return;

        switch (type) {
            case 'container': {
                setContainers([
                    ...containers.map((container) => {
                        if (container.id === ContainerId)
                            return {
                                ...container,
                                status: status
                            } as ContainerType;
                        else return container;
                    })
                ]);
                break;
            }
            case 'task': {
                const targetContainer = findValue(
                    ContainerId,
                    'container',
                    containers
                );

                if (!targetContainer) return;

                const newItems = targetContainer.items.map((task) => {
                    if (task.id === taskId)
                        return { ...task, status: status } as TaskType;
                    else return task;
                });

                targetContainer.items = newItems;

                setContainers([
                    ...containers.map((container) => {
                        if (container.id === targetContainer.id)
                            return targetContainer;
                        else return container;
                    })
                ]);
                break;
            }
        }
    };

    const updateTask = (containerId: UniqueIdentifier, newTask: TaskType) => {
        const newContainers = [...containers];
        const targetContainer = newContainers.findIndex(
            (container) => container.id === containerId
        );
        const itemIndex = newContainers[targetContainer].items.findIndex(
            (item) => item.id === newTask.id
        );
        newContainers[targetContainer].items[itemIndex] = newTask;

        setContainers(newContainers);
    };

    const updateContainer = (newContainer: ContainerType) => {
        const newContainers = [...containers];
        const containerIndex = newContainers.findIndex(
            (container) => container.id === newContainer.id
        );
        newContainers[containerIndex] = newContainer;

        setContainers(newContainers);
    };

    React.useEffect(() => {
        const containers = localStorage.getItem('containers');
        if (containers) {
            let aliveContainers = JSON.parse(containers).filter(
                (container: ContainerType) => container.status !== 'dead'
            );

            aliveContainers = aliveContainers.map(
                (container: ContainerType) => {
                    return {
                        ...container,
                        items: container.items.filter(
                            (task) => task.status !== 'dead'
                        )
                    };
                }
            );

            setContainers(aliveContainers);
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('containers', JSON.stringify(containers));
    }, [containers]);

    return {
        containers,
        addContainer,
        setContainers,
        addTask,
        setCurrentContainerId,
        markDeadOrAlive,
        removeItem,
        updateContainer,
        updateTask
    };
};
