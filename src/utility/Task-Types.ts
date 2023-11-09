import { UniqueIdentifier } from "@dnd-kit/core";

    // Types
    export type ContainerType = {
        id: UniqueIdentifier;
        title: string;
        items: TaskType[];
    };
    export type TaskType = {
        id: UniqueIdentifier;
        title: string;
    };