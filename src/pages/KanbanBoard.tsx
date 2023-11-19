import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { useScroll } from 'framer-motion';
import ArrowUp from '../components/SmallComponents/ArrowUp';
import Navbar from '../components/Navbar';
import TaskTable from '../components/TaskTable';
import { TaskContext } from '../context/TaskContext';

export default function KanbanBoard() {
    const ref = React.useRef(null);
    const { scrollY } = useScroll({ container: ref });

    const {
        ContainerModal,
        TaskModal,
        containers,
        setContainers,
        setCurrentContainerId,
        setContainerModal,
        setTaskModal,
        markDeadOrAlive,
        removeItem
    } = useTasks();

    return (
        <TaskContext.Provider
            value={{
                ContainerModal,
                TaskModal,
                containers,
                setContainers,
                setCurrentContainerId,
                setContainerModal,
                setTaskModal,
                markDeadOrAlive,
                removeItem
            }}
        >
            <div
                ref={ref}
                className="wrapper relative h-screen w-screen overflow-y-scroll bg-white px-4 dark:bg-dark-bg"
            >
                <ArrowUp scrollY={scrollY} />

                <div className="px-1/20 mx-auto flex max-w-8xl flex-col gap-8 py-4">
                    <ContainerModal />

                    <TaskModal />

                    <Navbar />

                    <TaskTable />
                </div>
            </div>
        </TaskContext.Provider>
    );
}
