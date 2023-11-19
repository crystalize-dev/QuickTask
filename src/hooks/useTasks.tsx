import React from 'react';
import { ContainerType, TaskType } from '../utility/Task-Types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { findValue } from '../utility/findValue';
import ModalTaskCreate from '../components/Modal/ModalTaskCreate';
import ModalCreateContainer from '../components/Modal/ModalCreateContainer';

export const useTasks = () => {
    const [containers, setContainers] = React.useState<ContainerType[]>([]);

    const [currentContainerId, setCurrentContainerId] =
        React.useState<UniqueIdentifier>();

    const [containerName, setContainerName] = React.useState('');
    const [taskName, setTaskName] = React.useState('');

    const [containerModal, setContainerModal] = React.useState(false);
    const [taskModal, setTaskModal] = React.useState(false);

    const onAddContainer = () => {
        if (!containerName) return;

        const id = `container-${uuidv4()}`;
        setContainers([
            ...containers,
            {
                id: id,
                title: containerName,
                items: [],
                description: '',
                status: 'alive'
            }
        ]);

        setContainerModal(false);
        setContainerName('');
    };

    const onAddTask = () => {
        if (!taskName) return;

        const id = `item-${uuidv4()}`;
        const container = containers.find(
            (item) => item.id === currentContainerId
        );

        if (!container) return;

        container.items.push({ id, title: taskName, status: 'alive' });

        setContainers([...containers]);
        setTaskName('');
        setTaskModal(false);
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

    const onSubmit = (e: React.FormEvent, type: 'container' | 'task') => {
        e.preventDefault();

        switch (type) {
            case 'container': {
                setContainerName('');
                setContainerModal(false);
                onAddContainer();
                break;
            }
            case 'task': {
                setTaskName('');
                setTaskModal(false);
                onAddTask();
                break;
            }
        }
    };

    const TaskModal = () => {
        return (
            <ModalTaskCreate
                taskModal={taskModal}
                setTaskModal={setTaskModal}
                onSubmit={onSubmit}
                taskName={taskName}
                setTaskName={setTaskName}
            />
        );
    };

    const ContainerModal = () => {
        return (
            <ModalCreateContainer
                containerModal={containerModal}
                setContainerModal={setContainerModal}
                onSubmit={onSubmit}
                containerName={containerName}
                setContainerName={setContainerName}
            />
        );
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
        ContainerModal,
        TaskModal,
        containers,
        setContainers,
        setCurrentContainerId,
        setContainerModal,
        setTaskModal,
        markDeadOrAlive,
        removeItem
    };
};
