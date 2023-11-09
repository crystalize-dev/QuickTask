import React from 'react';
import { ContainerType } from '../utility/Task-Types';
import { UniqueIdentifier } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import Input from '../components/UI/Input';
import Modal from '../components/Modal';
import Button from '../components/UI/Button';

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

    const onAddItem = () => {
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

    const TaskModal = (
        <Modal isVisible={taskModal} setVisible={setTaskModal}>
            <div className="flex w-full flex-col items-start gap-y-4">
                <h1 className="text-3xl font-bold text-gray-800">Add task</h1>

                <Input
                    type="text"
                    placeholder="Item title"
                    name="itemTitle"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <Button onClick={onAddItem}>Add task</Button>
            </div>
        </Modal>
    );

    const ContainerModal = (
        <Modal isVisible={containerModal} setVisible={setContainerModal}>
            <div className="flex w-full flex-col items-start gap-y-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    Add Container
                </h1>

                <Input
                    type="text"
                    placeholder="Container title"
                    name="containerTitle"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                />

                <Button onClick={onAddContainer}>Add container</Button>
            </div>
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
        setTaskModal
    };
};
