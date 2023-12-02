import { UniqueIdentifier } from '@dnd-kit/core';
import { ContainerType } from '../Types/Task-Types';

export function findValue(
    id: UniqueIdentifier | undefined,
    type: 'container' | 'item',
    containers: ContainerType[]
) {
    if (type === 'container') {
        return containers.find((item) => item.id === id);
    }
    if (type === 'item') {
        return containers.find((container) =>
            container.items.find((item) => item.id === id)
        );
    }
}
