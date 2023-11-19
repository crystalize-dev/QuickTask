import React from 'react';
import ModalWrapper from './ModalWrapper';
import Input from '../SmallComponents/Input';
import Button from '../SmallComponents/Button';
import ColorInput from '../SmallComponents/ColorInput';
import { useTranslation } from 'react-i18next';

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
