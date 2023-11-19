import React from 'react';
import Modal from './ModalWrapper';
import { SettingsContext } from '../../context/SettingsContext';
import Checkbox from '../SmallComponents/Checkbox';
import ThemeSwitcher from '../SmallComponents/ThemeSwitcher';
import LangSwitcher from '../SmallComponents/LangSwitcher';
import { useTranslation } from 'react-i18next';
import ColorInput from '../SmallComponents/ColorInput';
import Icon from '../SmallComponents/Icon';

export default function ModalSettings() {
    const defaultColors = [
        '#8f0097',
        '#ff334d',
        '#a1c42c',
        '#50b6f6',
        '#6655f3'
    ];

    const { setSettingsModal, setFixedTrash, isFixedTrash, switchLang } =
        React.useContext(SettingsContext);

    const changeFixedTrash = (e: React.ChangeEvent) => {
        setFixedTrash((e.target as HTMLInputElement).checked);
    };

    return (
        <Modal isVisible={modal} setVisible={setSettingsModal}>
            <div className="flex flex-col items-center gap-4">
                <Icon
                    icon="settings"
                    className="!h-20 !w-20"
                    strokeWidth={1}
                    hover={false}
                />
                <h1 className="mb-8 text-3xl font-bold">
                    {t('settings.title')}
                </h1>

                <div className="flex w-full items-center gap-2 font-semibold">
                    <Icon icon="moon" hover={false} />

                    <ThemeSwitcher />
                </div>

                <div className="flex w-full items-center gap-2 font-semibold">
                    <Icon icon="language" hover={false} />

                    <LangSwitcher />
                </div>

                <div className="flex w-full items-center gap-2 font-semibold">
                    <Icon icon="pallete" hover={false} />

                    <p>{t('settings.mainColor')} - </p>
                    <ColorInput
                        defaultMap={defaultColors}
                        onClick={changeColor}
                        activeColor={settings.mainColor}
                    />
                </div>

                <div className="hidden w-full items-center gap-2 font-semibold lg:flex">
                    <Icon icon="trash" hover={false} />

                    <p>{t('settings.fixedTrash')} - </p>

                    <Checkbox
                        checked={isFixedTrash}
                        onChange={(e) => changeFixedTrash(e)}
                    />
                </div>
            </div>
        </Modal>
    );
}
