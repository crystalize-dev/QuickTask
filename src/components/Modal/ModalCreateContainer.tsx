import React from 'react';
import Button from '../UI/Button';
import ModalWrapper from './ModalWrapper';
import { useTranslation } from 'react-i18next';
import WithLabel from '../SmallComponents/WithLabel';
import { TaskContext } from '../../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';
import { ContainerType } from '../../utility/Task-Types';
import Input from '../UI/Input';
import ColorInput from '../UI/ColorInput';

interface ContainerModalProps {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalCreateContainer({
    modal,
    setModal
}: ContainerModalProps) {
    const defaultColors = [
        '#84f542',
        '#54c3ac',
        '#ffa402',
        '#d31d2b',
        '#007390',
        '#0d4c7f'
    ];
    const [activeColor, setActiveColor] = React.useState<string | null>(null);

    const { t } = useTranslation();
    const { addContainer } = React.useContext(TaskContext);

    const buttonRef = React.useRef(null);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get('containerName');
        const description = formData.get('containerDescription');

        const newContainer = {
            id: `container-${uuidv4()}`,
            title: title,
            color: activeColor,
            description: description ? description : null,
            items: [],
            status: 'alive'
        } as ContainerType;
        addContainer(newContainer);
        setModal(false);
    };

    return (
        <ModalWrapper isVisible={modal} setVisible={setModal}>
            <form
                className="flex w-full flex-col items-center gap-y-4"
                onSubmit={(e) => onSubmit(e)}
            >
                <h1 className="text-3xl font-bold ">
                    {t('modal.createContainer.title')}
                </h1>

                <WithLabel
                    label={
                        t('modal.createContainer.name') +
                        ` (${t('restriction', { length: 32 })})`
                    }
                    className="w-full"
                >
                    <Input
                        name="containerName"
                        type="text"
                        required={true}
                        autoFocus={true}
                        options={{ maxSymbols: 32 }}
                        placeholder={t(
                            'modal.createContainer.titlePlaceholder'
                        )}
                    />
                </WithLabel>

                <WithLabel
                    label={
                        t('modal.createContainer.description') +
                        ` (${t('optional')})`
                    }
                    className="w-full"
                >
                    <Input
                        name="containerDescription"
                        type="text"
                        placeholder={t(
                            'modal.createContainer.descriptionPlaceholder'
                        )}
                    />
                </WithLabel>

                <ColorInput
                    defaultMap={defaultColors}
                    activeColor={activeColor}
                    withTransparent={true}
                    onClick={setActiveColor}
                />

                <Button
                    ref={buttonRef}
                    variant={'main'}
                    type="submit"
                    className="mt-4"
                >
                    {t('submit')}
                </Button>
            </form>
        </ModalWrapper>
    );
}
