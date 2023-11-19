import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { useScroll } from 'framer-motion';
import ArrowUp from '../components/SmallComponents/ArrowUp';
import Navbar from '../components/Navbar';
import TaskTable from '../components/TaskTable';
import { TaskContext } from '../context/TaskContext';
import ModalCreateContainer from '../components/Modal/ModalCreateContainer';

export default function KanbanBoard() {
    const ref = React.useRef(null);
    const { scrollY } = useScroll({ container: ref });

    const [modalContainer, setModalContainer] = React.useState(false);

    const {
        containers,
        setContainers,
        setCurrentContainerId,
        markDeadOrAlive,
        removeItem,
        addContainer,
        addTask
    } = useTasks();

    return (
        <TaskContext.Provider
            value={{
                containers,
                setContainers,
                setCurrentContainerId,
                markDeadOrAlive,
                removeItem,
                addContainer,
                addTask
            }}
        >
            <div
                ref={ref}
                className="wrapper relative h-screen w-screen overflow-y-scroll bg-white px-4 dark:bg-dark-bg"
            >
                <ArrowUp scrollY={scrollY} />

                <div className="mx-auto flex max-w-8xl flex-col gap-8 px-1/20 py-4">
                    <ModalCreateContainer
                        modal={modalContainer}
                        setModal={setModalContainer}
                    />

                    <Navbar setModalContainer={setModalContainer} />

                    <TaskTable />
                </div>
            </div>
        </TaskContext.Provider>
    );
}
