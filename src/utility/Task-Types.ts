import { UniqueIdentifier } from '@dnd-kit/core';

// Types
export type ContainerType = {
    id: UniqueIdentifier;
    title: string | undefined;
    description: string;
    items: TaskType[];
    status: 'dead' | 'alive';
};
export type TaskType = {
    id: UniqueIdentifier;
    title: string;
    status: 'dead' | 'alive';
};
