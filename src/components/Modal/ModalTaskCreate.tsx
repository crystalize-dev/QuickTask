import React from 'react';
import ModalWrapper from './ModalWrapper';
import Button from '../UI/Button';
import ColorInput from '../UI/ColorInput';
import { useTranslation } from 'react-i18next';
import WithLabel from '../SmallComponents/WithLabel';
import Textarea from '../UI/Textarea';
import { TaskContext } from '../../context/TaskContext';
import { TaskType } from '../../utility/Task-Types';
import { v4 as uuidv4 } from 'uuid';

interface TaskModalProps {
    taskModal: boolean;
    setTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalTaskCreate({
    taskModal,
    setTaskModal
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
    const [taskColor, setTaskColor] = React.useState<string | null>(null);

    const { addTask } = React.useContext(TaskContext);

    const buttonRef = React.useRef(null);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            if (buttonRef.current)
                (buttonRef.current as HTMLButtonElement).click();
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get('taskName');

        const newTask = {
            id: `item-${uuidv4()}`,
            title: title,
            status: 'alive'
        } as TaskType;

        addTask(newTask);
        setTaskModal(false);
    };

    return (
        <ModalWrapper isVisible={taskModal} setVisible={setTaskModal}>
            <form
                className="flex w-full flex-col items-start gap-y-4"
                onSubmit={(e) => onSubmit(e)}
            >
                <h1 className="text-3xl font-bold ">{t('modal.createTask')}</h1>

                <WithLabel label={t('modal.createContainer.name')}>
                    <Textarea
                        name="taskName"
                        maxRows={5}
                        handleKeyDown={handleKeyDown}
                        required={true}
                        className="min-h-full w-full resize-none overflow-auto !border !border-solid border-zinc-300 p-2 transition-all focus:!border-main dark:border-white"
                    />
                </WithLabel>

                <ColorInput
                    withTransparent={true}
                    defaultMap={defaultColors}
                    onClick={setTaskColor}
                    activeColor={taskColor}
                />

                <Button ref={buttonRef} type="submit">
                    {t('submit')}
                </Button>
            </form>
        </ModalWrapper>
    );
}
