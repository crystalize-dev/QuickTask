import { DragEndEvent, DragMoveEvent, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React from "react";
import { findValue } from "../utility/findValue";
import { ContainerType } from "../utility/Task-Types";

export const useDrag = (containers: ContainerType[], setContainers: React.Dispatch<React.SetStateAction<ContainerType[]>>) => {
    const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(
        null
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const { id } = active;

        setActiveId(id);
    };

    const handleDragMove = (event: DragMoveEvent) => {
        const { active, over } = event;

        // Handle Items Sorting
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find active container and over container
            const activeContainer = findValue(active.id, 'item', containers);
            const overContainer = findValue(over.id, 'item', containers);

            // If active or over container is undefined return
            if (!activeContainer || !overContainer) return;

            // Find active and over container index
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id
            );

            // Find the index of active and over items
            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id
            );
            const overItemIndex = overContainer.items.findIndex(
                (item) => item.id === over.id
            );

            // In same container dragging
            if (activeContainerIndex === overContainerIndex) {
                const newItems = [...containers];
                newItems[activeContainerIndex].items = arrayMove(
                    newItems[activeContainerIndex].items,
                    activeItemIndex,
                    overItemIndex
                );

                setContainers(newItems);
            } else {
                const newItems = [...containers];
                const [removedItem] = newItems[
                    activeContainerIndex
                ].items.splice(activeItemIndex, 1);

                newItems[overContainerIndex].items.splice(
                    overItemIndex,
                    0,
                    removedItem
                );

                setContainers(newItems);
            }
        }

        // Handle Item Drop into Container
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find active and over conatiners
            const activeContainer = findValue(active.id, 'item', containers);
            const overContainer = findValue(over.id, 'container', containers);

            if (!activeContainer || !overContainer) return;

            // Find index of containers
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id
            );

            // Find index of items
            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id
            );

            const newItems = [...containers];
            const [removedItem] = newItems[activeContainerIndex].items.splice(
                activeItemIndex,
                1
            );

            newItems[overContainerIndex].items.push(removedItem);
            setContainers(newItems);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Handle container Sorting
        if (
            active.id.toString().includes('container') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === active.id
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === over.id
            );

            //Swap containers
            let newItems = [...containers];
            newItems = arrayMove(
                newItems,
                activeContainerIndex,
                overContainerIndex
            );

            setContainers(newItems);
        }

        // Handle item sorting

        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find active and over containers

            // Find active container and over container
            const activeContainer = findValue(active.id, 'item', containers);
            const overContainer = findValue(over.id, 'item', containers);

            // If active or over container is undefined return
            if (!activeContainer || !overContainer) return;

            // Find active and over container index
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id
            );

            // Find the index of active and over items
            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id
            );
            const overItemIndex = overContainer.items.findIndex(
                (item) => item.id === over.id
            );

            // In same container
            if (activeContainerIndex === overContainerIndex) {
                const newItems = [...containers];
                newItems[activeContainerIndex].items = arrayMove(
                    newItems[activeContainerIndex].items,
                    activeItemIndex,
                    overItemIndex
                );
                setContainers(newItems);
            } else {
                // In different container
                const newItems = [...containers];
                const [removedItem] = newItems[
                    activeContainerIndex
                ].items.splice(activeItemIndex, 1);

                newItems[overContainerIndex].items.splice(
                    overItemIndex,
                    0,
                    removedItem
                );

                setContainers(newItems);
            }
        }

        // Handle items drop in container
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            const activeContainer = findValue(active.id, 'item', containers);
            const overContainer = findValue(over.id, 'container', containers);

            if (!activeContainer || !overContainer) return;

            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id
            );

            // Find the index of active and over items
            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id
            );

            const newItems = [...containers];
            const [removedItem] = newItems[activeContainerIndex].items.splice(
                activeItemIndex,
                1
            );

            newItems[overContainerIndex].items.push(removedItem);
            setContainers(newItems);
        }

        setActiveId(null);
    };

    return {activeId, sensors, handleDragEnd, handleDragMove, handleDragStart}
}