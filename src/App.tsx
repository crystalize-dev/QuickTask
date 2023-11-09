import React from 'react';
import './App.css';
import { NotificationContext } from './context/NotificationContext';
import { useNotifications } from './hooks/useNotifications';
import { useScroll } from 'framer-motion';
import ArrowUp from './components/UI/ArrowUp';
import { useTasks } from './hooks/useTasks';
import ThemeSwitcher from './components/UI/ThemeSwitcher';
import Button from './components/UI/Button';
import TaskTable from './components/TaskTable';

function App() {
    const { notifications, addNotification } = useNotifications();

    const ref = React.useRef(null);
    const { scrollY } = useScroll({ container: ref });

    const {
        ContainerModal,
        TaskModal,
        containers,
        setContainers,
        setCurrentContainerId,
        setContainerModal,
        setTaskModal
    } = useTasks();

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification }}
        >
            <div
                ref={ref}
                className="wrapper h-screen w-screen overflow-y-scroll bg-white dark:bg-dark-bg"
            >
                <ThemeSwitcher />

                <ArrowUp scrollY={scrollY} />

                <div className="mx-auto max-w-7xl py-10">
                    {ContainerModal}

                    {TaskModal}

                    <div className="flex items-center justify-between gap-y-2">
                        <h1 className="text-3xl font-bold dark:text-white">
                            QuickTask
                        </h1>
                        <Button onClick={() => setContainerModal(true)}>
                            Add container
                        </Button>
                    </div>

                    <TaskTable
                        containers={containers}
                        setContainers={setContainers}
                        setTaskModal={setTaskModal}
                        setCurrentContainerId={setCurrentContainerId}
                    />
                </div>
            </div>
        </NotificationContext.Provider>
    );
}

export default App;
