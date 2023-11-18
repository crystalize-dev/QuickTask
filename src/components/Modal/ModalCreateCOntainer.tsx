import React from 'react';
import Button from '../UI/Button';
import ModalWrapper from './ModalWrapper';
import Input from '../UI/Input';
import { useTranslation } from 'react-i18next';

interface ContainerModalProps {
    containerModal: boolean;
    setContainerModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (e: React.FormEvent, type: 'container' | 'task') => void;
    containerName: string;
    setContainerName: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModalCreateContainer({
    containerModal,
    setContainerModal,
    onSubmit,
    containerName,
    setContainerName
}: ContainerModalProps) {
    const { t } = useTranslation();

    return (
        <ModalWrapper isVisible={containerModal} setVisible={setContainerModal}>
            <form
                className="flex w-full flex-col items-center gap-y-8"
                onSubmit={(e) => onSubmit(e, 'container')}
            >
                <h1 className="text-3xl font-bold ">
                    {t('modal.createContainer')}
                </h1>

                <Input
                    type="text"
                    autoFocus={true}
                    placeholder="Container title"
                    name="containerTitle"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                />

                <Button type="submit">{t('submit')}</Button>
            </form>
        </ModalWrapper>
    );
}
