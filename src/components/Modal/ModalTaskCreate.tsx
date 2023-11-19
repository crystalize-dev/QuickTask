import React from 'react';
import ModalWrapper from './ModalWrapper';
import Button from '../UI/Button';
import ColorInput from '../UI/ColorInput';
import { useTranslation } from 'react-i18next';
import WithLabel from '../SmallComponents/WithLabel';
import Textarea from '../UI/Textarea';
import { TaskContext } from '../../context/TaskContext';
import { TaskType, priorities } from '../../utility/Task-Types';
import { v4 as uuidv4 } from 'uuid';
import DateInput from '../UI/DateInput';
import { useDate } from '../../hooks/useDate';
import SelectInput from '../UI/SelectInput';

interface TaskModalProps {
    taskModal: boolean;
    setTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalTaskCreate({
    taskModal,
    setTaskModal
}: TaskModalProps) {
    const { t } = useTranslation();

    const { curDate } = useDate();

    const defaultColors = [
        '#57da0b',
        '#54c3ac',
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
        const deadline = formData.get('deadline');
        const priority = formData.get('priority');

        const newTask = {
            id: `item-${uuidv4()}`,
            title: title,
            status: 'alive',
            deadline: deadline,
            priority: priority,
            color: taskColor
        } as TaskType;

        addTask(newTask);
        setTaskModal(false);
        setTaskColor(null);
    };

    return (
        <ModalWrapper isVisible={taskModal} setVisible={setTaskModal}>
            <form
                className="flex w-full flex-col items-center gap-y-4"
                onSubmit={(e) => onSubmit(e)}
            >
                <h1 className="text-3xl font-bold ">
                    {t('modal.createTask.title')}
                </h1>

                <WithLabel label={t('description')} className="w-full">
                    <Textarea
                        name="taskName"
                        maxRows={5}
                        handleKeyDown={handleKeyDown}
                        required={true}
                        placeholder={t('modal.createTask.titlePlaceholder')}
                        className="resize-none p-2"
                    />
                </WithLabel>

                <div className="flex h-fit w-full items-center justify-between gap-2">
                    <WithLabel label={t('deadline')}>
                        <DateInput
                            name="deadline"
                            required={true}
                            minDate={curDate}
                            maxDate="9999-12-31"
                        />
                    </WithLabel>

                    <WithLabel label={t('priority')}>
                        <SelectInput
                            required={true}
                            name="priority"
                            optionsRaw={priorities}
                            defaulValue={priorities[0]}
                        />
                    </WithLabel>
                </div>

                <ColorInput
                    withTransparent={true}
                    defaultMap={defaultColors}
                    onClick={setTaskColor}
                    activeColor={taskColor}
                />

                <Button ref={buttonRef} variant={'main'} type="submit">
                    {t('submit')}
                </Button>
            </form>
        </ModalWrapper>
    );
}
