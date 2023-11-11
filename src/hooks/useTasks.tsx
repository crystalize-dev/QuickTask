import React from 'react';
import { ContainerType } from '../utility/Task-Types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import Input from '../components/UI/Input';
import Modal from '../components/Modal';
import Button from '../components/UI/Button';
import { findValue } from '../utility/findValue';
import { showConfirmationModal } from '../utility/copenConfirm';

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
                items: []
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

        container.items.push({ id, title: taskName });

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

        await showConfirmationModal().then((res) => {
            if (res) {
                if (type === 'container') {
                    setContainers([
                        ...containers.filter(
                            (container) => container.id !== ContainerId
                        )
                    ]);
                } else {
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
                }
            }
        });
    };

    const onSumbit = (e: React.FormEvent, type: 'container' | 'task') => {
        e.preventDefault();

        if (type === 'container') {
            setContainerName('');
            setContainerModal(false);
            onAddContainer();
        } else {
            setTaskName('');
            setTaskModal(false);
            onAddTask();
        }
    };

    const TaskModal = (
        <Modal isVisible={taskModal} setVisible={setTaskModal}>
            <form
                className="flex w-full flex-col items-start gap-y-4"
                onSubmit={(e) => onSumbit(e, 'task')}
            >
                <h1 className="text-3xl font-bold ">Add task</h1>

                <Input
                    type="text"
                    placeholder="Item title"
                    name="itemTitle"
                    value={taskName}
                    autoFocus={true}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <Button type="submit">Add task</Button>
            </form>
        </Modal>
    );

    const ContainerModal = (
        <Modal isVisible={containerModal} setVisible={setContainerModal}>
            <form
                className="flex w-full flex-col items-center gap-y-8"
                onSubmit={(e) => onSumbit(e, 'container')}
            >
                <h1 className="text-3xl font-bold ">Add Container</h1>

                <Input
                    type="text"
                    autoFocus={true}
                    placeholder="Container title"
                    name="containerTitle"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                />

                <Button type="submit">Add container</Button>
            </form>
        </Modal>
    );

    React.useEffect(() => {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            setContainers(JSON.parse(tasks));
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(containers));
    }, [containers]);

    return {
        ContainerModal,
        TaskModal,
        containers,
        setContainers,
        setCurrentContainerId,
        setContainerModal,
        setTaskModal,
        removeItem
    };
};
