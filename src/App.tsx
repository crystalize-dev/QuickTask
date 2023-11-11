import React from 'react';
import './App.css';
import { useScroll } from 'framer-motion';
import ArrowUp from './components/ArrowUp';
import { useTasks } from './hooks/useTasks';
import TaskTable from './components/TaskTable';
import Navbar from './components/Navbar';

function App() {
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
        removeItem
    } = useTasks();

    return (
        <div
            ref={ref}
            className="wrapper h-screen w-screen overflow-y-scroll bg-white px-4 dark:bg-dark-bg"
        >
            <ArrowUp scrollY={scrollY} />

            <div className="mx-auto flex max-w-7xl flex-col gap-8 py-10">
                {ContainerModal}
                {TaskModal}
                <Navbar setContainerModal={setContainerModal} />
                <TaskTable
                    containers={containers}
                    removeItem={removeItem}
                    setContainers={setContainers}
                    setTaskModal={setTaskModal}
                    setCurrentContainerId={setCurrentContainerId}
                />
            </div>
        </div>
    );
}

export default App;
