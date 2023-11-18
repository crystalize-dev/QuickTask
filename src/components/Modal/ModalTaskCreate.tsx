import React from 'react';
import Modal from './ModalWrapper';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ColorInput from '../UI/ColorInput';

interface TaskModalProps {
    taskModal: boolean;
    setTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (e: React.FormEvent, type: 'container' | 'task') => void;
    taskName: string;
    setTaskName: React.Dispatch<React.SetStateAction<string>>;
}

export default function TaskCreateModal({
    taskModal,
    setTaskModal,
    onSubmit,
    taskName,
    setTaskName
}: TaskModalProps) {
    return (
        <Modal isVisible={taskModal} setVisible={setTaskModal}>
            <form
                className="flex w-full flex-col items-start gap-y-4"
                onSubmit={(e) => onSubmit(e, 'task')}
            >
                <h1 className="text-3xl font-bold ">Add task</h1>

                <Input
                    type="text"
                    placeholder="Item title"
                    name="itemTitle"
                    value={taskName}
                    autoFocus={true}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <ColorInput />

                <Button type="submit">Add task</Button>
            </form>
        </Modal>
    );
}