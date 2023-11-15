import React from 'react';
import Button from '../UI/Button';
import Modal from './Modal';
import Input from '../UI/Input';

interface ContainerModalProps {
    containerModal: boolean;
    setContainerModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (e: React.FormEvent, type: 'container' | 'task') => void;
    containerName: string;
    setContainerName: React.Dispatch<React.SetStateAction<string>>;
}

export default function ContainerCreateModal({
    containerModal,
    setContainerModal,
    onSubmit,
    containerName,
    setContainerName
}: ContainerModalProps) {
    return (
        <Modal isVisible={containerModal} setVisible={setContainerModal}>
            <form
                className="flex w-full flex-col items-center gap-y-8"
                onSubmit={(e) => onSubmit(e, 'container')}
            >
                <h1 className="text-3xl font-bold ">Add Container</h1>

                <Input
                    type="text"
                    autoFocus={true}
                    placeholder="Container title"
                    name="containerTitle"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                />

                <Button type="submit">Add container</Button>
            </form>
        </Modal>
    );
}
