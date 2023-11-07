import React from 'react';
import './App.css';
import { NotificationContext } from './context/NotificationContext';
import { useNotifications } from './hooks/useNotifications';
import { useScroll } from 'framer-motion';
import ArrowUp from './components/UI/ArrowUp';
import { v4 as uuidv4 } from 'uuid';
import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    closestCorners,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import Container from './components/Container';
import Item from './components/Item';
import { containersSchema } from './utility/hardcode';
import Modal from './components/Modal';
import Input from './components/UI/Input';
import { Button } from './components/UI/Button';

function App() {
    const { notifications, addNotification } = useNotifications();

    const ref = React.useRef(null);
    const { scrollY } = useScroll({ container: ref });

    // Drag&Drop states
    const [containers, setContainers] =
        React.useState<ContainerType[]>(containersSchema);
    const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(
        null
    );
    const [currentContainerId, setCurrentContainerId] =
        React.useState<UniqueIdentifier>();

    // Container create modal
    const [containerModal, setContainerModal] = React.useState(false);
    const [containerName, setContainerName] = React.useState('');

    // Task create modal
    const [itemModal, setItemModal] = React.useState(false);
    const [itemName, setItemName] = React.useState('');

    // Types
    type ContainerType = {
        id: UniqueIdentifier;
        title: string;
        items: TaskType[];
    };
    type TaskType = {
        id: UniqueIdentifier;
        title: string;
    };

    // Dnd Handlers

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

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
        if (!itemName) return;
        const id = `item-${uuidv4()}`;
        const container = containers.find(
            (item) => item.id === currentContainerId
        );

        if (!container) return;

        container.items.push({ id, title: itemName });

        setContainers([...containers]);
        setItemName('');
        setItemModal(false);
    };

    function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
        if (type === 'container') {
            return containers.find((item) => item.id === id);
        }
        if (type === 'item') {
            return containers.find((container) =>
                container.items.find((item) => item.id === id)
            );
        }
    }

    const findItemTitle = (id: UniqueIdentifier | undefined) => {
        const container = findValueOfItems(id, 'item');
        if (!container) return '';
        const item = container.items.find((item) => item.id === id);
        if (!item) return '';
        return item.title;
    };

    const findContainerTitle = (id: UniqueIdentifier | undefined) => {
        const container = findValueOfItems(id, 'container');
        if (!container) return '';
        return container.title;
    };

    const findContainerItems = (id: UniqueIdentifier | undefined) => {
        const container = findValueOfItems(id, 'container');
        if (!container) return [];
        return container.items;
    };

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
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'item');

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
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'container');

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
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'item');

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
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'container');

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

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification }}
        >
            <div
                ref={ref}
                className="wrapper h-screen w-screen overflow-y-scroll bg-white dark:bg-dark-bg"
            >
                <ArrowUp scrollY={scrollY} />

                <div className="mx-auto max-w-7xl py-10">
                    {/* Container Modal */}
                    <Modal
                        showModal={containerModal}
                        setShowModal={setContainerModal}
                    >
                        <div className="flex w-full flex-col items-start gap-y-4">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Add Container
                            </h1>

                            <Input
                                type="text"
                                placeholder="Container title"
                                name="containerTitle"
                                value={containerName}
                                onChange={(e) =>
                                    setContainerName(e.target.value)
                                }
                            />

                            <Button onClick={onAddContainer}>
                                Add container
                            </Button>
                        </div>
                    </Modal>

                    {/* Tasks Modal */}
                    <Modal showModal={itemModal} setShowModal={setItemModal}>
                        <div className="flex w-full flex-col items-start gap-y-4">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Add task
                            </h1>

                            <Input
                                type="text"
                                placeholder="Item title"
                                name="itemTitle"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />

                            <Button onClick={onAddItem}>Add task</Button>
                        </div>
                    </Modal>
                    <div className="flex items-center justify-between gap-y-2">
                        <h1 className="text-3xl font-bold text-gray-800">
                            QuickTask
                        </h1>
                        <Button onClick={() => setContainerModal(true)}>
                            Add container
                        </Button>
                    </div>
                    <div className="mt-10">
                        <div className="grid grid-cols-3 gap-6">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCorners}
                                onDragStart={handleDragStart}
                                onDragMove={handleDragMove}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={containers.map(
                                        (container) => container.id
                                    )}
                                >
                                    {containers.map((container) => (
                                        <Container
                                            key={container.id}
                                            title={container.title}
                                            id={container.id}
                                            onAddItem={() => {
                                                setItemModal(true);
                                                setCurrentContainerId(
                                                    container.id
                                                );
                                            }}
                                        >
                                            <SortableContext
                                                items={container.items.map(
                                                    (item) => item.id
                                                )}
                                            >
                                                <div className="flex flex-col items-start gap-y-4">
                                                    {container.items.map(
                                                        (item) => (
                                                            <Item
                                                                key={item.id}
                                                                title={
                                                                    item.title
                                                                }
                                                                id={item.id}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </SortableContext>
                                        </Container>
                                    ))}
                                </SortableContext>
                                <DragOverlay>
                                    {activeId &&
                                        activeId
                                            .toString()
                                            .includes('item') && (
                                            <Item
                                                id={activeId}
                                                title={findItemTitle(activeId)}
                                            />
                                        )}
                                    {activeId &&
                                        activeId
                                            .toString()
                                            .includes('container') && (
                                            <Container
                                                id={activeId}
                                                title={findContainerTitle(
                                                    activeId
                                                )}
                                            >
                                                {findContainerItems(
                                                    activeId
                                                ).map((item) => (
                                                    <Item
                                                        key={item.id}
                                                        id={item.id}
                                                        title={item.title}
                                                    />
                                                ))}
                                            </Container>
                                        )}
                                </DragOverlay>
                            </DndContext>
                        </div>
                    </div>
                </div>
            </div>
        </NotificationContext.Provider>
    );
}

export default App;
