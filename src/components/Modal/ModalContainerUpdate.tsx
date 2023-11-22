import React from 'react';
import ModalWrapper from './ModalWrapper';
import { ContainerType, TaskType } from '../../utility/Task-Types';

interface ContainerModalProps {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentOptions: ContainerType;
}

export default function ModalContainerUpdate({
    modal,
    setModal,
    currentOptions
}: ContainerModalProps) {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
    };

    const [title, setTitle] = React.useState<string | undefined>(
        currentOptions.title
    );
    const [description, setDescription] = React.useState<string | null>(
        currentOptions.description
    );
    const [color, setColor] = React.useState<string | null>(
        currentOptions.color
    );
    const [items, setItems] = React.useState<Array<TaskType>>([
        ...currentOptions.items
    ]);

    return (
        <ModalWrapper isVisible={modal} setVisible={setModal}>
            <form
                className="flex w-full flex-col items-center gap-y-4"
                onSubmit={(e) => onSubmit(e)}
            >
                123123
            </form>
        </ModalWrapper>
    );
}
