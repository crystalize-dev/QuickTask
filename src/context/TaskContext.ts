import React from 'react';
import { ContainerType, TaskType } from '../utility/Task-Types';
import { UniqueIdentifier } from '@dnd-kit/core';

type TaskContextProps = {
    containers: Array<ContainerType>;
    setContainers: React.Dispatch<React.SetStateAction<Array<ContainerType>>>;
    setCurrentContainerId: React.Dispatch<
        React.SetStateAction<UniqueIdentifier | undefined>
    >;
    markDeadOrAlive?: (
        status: 'dead' | 'alive',
        type: 'container' | 'task',
        containerId?: UniqueIdentifier,
        taskId?: UniqueIdentifier
    ) => void;
    removeItem: (
        type: 'container' | 'task',
        ContainerId?: UniqueIdentifier,
        taskId?: UniqueIdentifier
    ) => Promise<void>;
    addTask: (task: TaskType) => void;
    addContainer: (container: ContainerType) => void;
    updateContainer: (newContainer: ContainerType) => void;
    updateTask: (containerId: UniqueIdentifier, newTask: TaskType) => void;
};

export const TaskContext = React.createContext({} as TaskContextProps);
