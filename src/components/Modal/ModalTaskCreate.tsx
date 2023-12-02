import React from 'react';
import ModalWrapper from './ModalWrapper';
import Button from '../UI/Button';
import ColorInput from '../UI/ColorInput';
import { useTranslation } from 'react-i18next';
import WithLabel from '../SmallComponents/WithLabel';
import Textarea from '../UI/Textarea';
import { TaskContext } from '../../context/TaskContext';
import {
    PriorityType,
    TaskType,
    priorities
} from '../../utility/Types/Task-Types';
import { v4 as uuidv4 } from 'uuid';
import DateInput from '../UI/DateInput';
import { useDate } from '../../hooks/useDate';
import SelectInput, { OptionType } from '../UI/SelectInput';
import { SingleValue } from 'react-select';
import { defaultTaskColors } from '../../utility/Data/colors';

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

    const [taskColor, setTaskColor] = React.useState<string | null>(null);
    const [requiredDeadline, setRequiredDeadline] =
        React.useState<boolean>(false);

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
        const title = formData.get('taskName') as string;
        const deadline = formData.get('deadline') as string;
        const priority = formData.get('priority') as PriorityType;

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

    const handleDeadlineChange = (
        newValue: SingleValue<OptionType<PriorityType>>
    ) => {
        if (newValue?.value === 'Based on deadline') setRequiredDeadline(true);
        else setRequiredDeadline(false);
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
                        autoFocus={true}
                        handleKeyDown={handleKeyDown}
                        required={true}
                        placeholder={t('modal.createTask.titlePlaceholder')}
                        className="w-full resize-none p-2"
                    />
                </WithLabel>

                <div className="flex h-fit w-full flex-col items-start justify-between gap-2 lg:flex-row lg:items-center">
                    <WithLabel label={t('deadline')}>
                        <DateInput
                            name="deadline"
                            required={requiredDeadline}
                            minDate={curDate}
                            maxDate="9999-12-31"
                        />
                    </WithLabel>

                    <WithLabel label={t('priority')}>
                        <SelectInput
                            required={true}
                            name="priority"
                            onChange={handleDeadlineChange}
                            optionsRaw={priorities}
                            defaultValue={priorities[0]}
                        />
                    </WithLabel>
                </div>

                <ColorInput
                    withTransparent={true}
                    defaultMap={defaultTaskColors}
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
