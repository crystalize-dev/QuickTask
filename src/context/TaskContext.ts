import React from 'react';
import { ContainerType } from '../utility/Task-Types';
import { UniqueIdentifier } from '@dnd-kit/core';

type TaskContextProps = {
    ContainerModal: () => JSX.Element;
    TaskModal: () => JSX.Element;
    containers: Array<ContainerType>;
    setContainers: React.Dispatch<React.SetStateAction<Array<ContainerType>>>;
    setCurrentContainerId: React.Dispatch<
        React.SetStateAction<UniqueIdentifier | undefined>
    >;
    setContainerModal: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
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
};

export const TaskContext = React.createContext({} as TaskContextProps);
