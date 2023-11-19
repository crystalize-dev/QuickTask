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

export default function ModalTaskCreate({
    taskModal,
    setTaskModal,
    onSubmit,
    taskName,
    setTaskName
}: TaskModalProps) {
    const { t } = useTranslation();

    const defaultColors = [
        'green',
        'lime',
        '#54c3ac',
        'yellow',
        '#ffa402',
        '#d31d2b',
        '#007390',
        '#0d4c7f'
    ];
    const [taskColor, setTaskColor] = React.useState<string | null>(
        defaultColors[0]
    );

    return (
        <ModalWrapper isVisible={taskModal} setVisible={setTaskModal}>
            <form
                className="flex w-full flex-col items-start gap-y-4"
                onSubmit={(e) => onSubmit(e, 'task')}
            >
                <h1 className="text-3xl font-bold ">{t('modal.createTask')}</h1>

                <Input
                    type="text"
                    placeholder="Item title"
                    name="itemTitle"
                    value={taskName}
                    autoFocus={true}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <ColorInput
                    withTransparent={true}
                    defaultMap={defaultColors}
                    onClick={setTaskColor}
                    activeColor={taskColor}
                />

                <Button type="submit">{t('submit')}</Button>
            </form>
        </ModalWrapper>
    );
}
