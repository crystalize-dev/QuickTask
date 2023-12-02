import React from 'react';
import ModalWrapper from './ModalWrapper';
import { ContainerType, TaskType } from '../../utility/Types/Task-Types';
import WithLabel from '../SmallComponents/WithLabel';
import Input from '../UI/Input';
import ColorInput from '../UI/ColorInput';
import Button from '../UI/Button';
import { useTranslation } from 'react-i18next';
import { defaultContainerColors } from '../../utility/Data/colors';
import { TaskContext } from '../../context/TaskContext';

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
    const { t } = useTranslation();

    const { updateContainer } = React.useContext(TaskContext);

    const [title, setTitle] = React.useState<string | null>(
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

    const [timer, setTimer] = React.useState(true);
    const [buttonText, setButtonText] = React.useState(
        t('modal.updateContainer.clearAll')
    );

    const onSubmit = () => {
        const newContainer: ContainerType = {
            title: title,
            description: description,
            color: color,
            items: items,
            id: currentOptions.id,
            status: currentOptions.status
        };

        updateContainer(newContainer);
        setModal(false);
    };

    const handleRemoveAll = (seconds: number) => {
        if (timer) {
            setTimer(false);

            let secondsRemaining = seconds;

            setButtonText(
                t('modal.updateContainer.sure', {
                    tick: secondsRemaining
                })
            );

            const interval = setInterval(() => {
                if (secondsRemaining > 0) {
                    secondsRemaining--;
                    setButtonText(
                        t('modal.updateContainer.sure', {
                            tick: secondsRemaining
                        })
                    );
                } else {
                    setTimer(true);
                    setButtonText(t('modal.updateContainer.clearAll'));
                    clearInterval(interval);
                }
            }, 1000);
        } else {
            setItems([]);
            onSubmit();
        }
    };

    return (
        <ModalWrapper isVisible={modal} setVisible={setModal}>
            <div className="flex w-full flex-col items-center gap-y-4">
                <h1 className="text-3xl font-bold text-black dark:!text-white">
                    {t('modal.updateContainer.editting') +
                        ': ' +
                        currentOptions.title}
                </h1>

                <WithLabel
                    label={t('name') + ` (${t('restriction', { length: 32 })})`}
                    className="w-full"
                >
                    <Input
                        name="containerName"
                        type="text"
                        value={title}
                        setValue={setTitle}
                        required={true}
                        autoFocus={true}
                        options={{ maxSymbols: 32 }}
                        placeholder={t(
                            'modal.createContainer.titlePlaceholder'
                        )}
                    />
                </WithLabel>

                <WithLabel
                    label={t('description') + ` (${t('optional')})`}
                    className="w-full"
                >
                    <Input
                        name="containerDescription"
                        value={description}
                        setValue={setDescription}
                        type="text"
                        placeholder={t(
                            'modal.createContainer.descriptionPlaceholder'
                        )}
                    />
                </WithLabel>

                <ColorInput
                    defaultMap={defaultContainerColors}
                    activeColor={color}
                    withTransparent={true}
                    onClick={setColor}
                />

                <div
                    className={`mt-8 flex h-fit w-full items-center justify-between gap-2 ${
                        currentOptions.items.length == 0 && '!justify-center'
                    }`}
                >
                    {currentOptions.items.length !== 0 && (
                        <Button
                            type="button"
                            variant={'main'}
                            style={{ '--main': '#ff5c5c' }}
                            onClick={() => handleRemoveAll(5)}
                        >
                            {buttonText}
                        </Button>
                    )}

                    <Button
                        variant={'main'}
                        type="button"
                        onClick={onSubmit}
                        style={{ '--main': '#38b971' }}
                    >
                        {t('submit')}
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
}
