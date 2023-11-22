import { UniqueIdentifier } from '@dnd-kit/core';

// Types
export type ContainerType = {
    id: UniqueIdentifier;
    title: string | undefined;
    description: string | null;
    color: string | null;
    items: TaskType[];
    status: StatusType;
};
export type TaskType = {
    id: UniqueIdentifier;
    title: string;
    status: StatusType;
    deadline: string;
    priority: PriorityType;
    color: string | null;
};

export type StatusType = 'alive' | 'dead' | "corrupted";

export type PriorityType =
    | 'very high'
    | 'high'
    | 'medium'
    | 'low'
    | 'Based on deadline';

export const priorities: Array<PriorityType> = [
    'low',
    'medium',
    'high',
    'very high',
    'Based on deadline'
];
