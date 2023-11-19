import React from 'react';
import ModalWrapper from './ModalWrapper';
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

    const { settings, changeSetting } = React.useContext(SettingsContext);

    const changeFixedTrash = (e: React.ChangeEvent) => {
        changeSetting('isFixedTrash', (e.target as HTMLInputElement).checked);
    };

    const changeColor = (color: string | null) => {
        if (color) changeSetting('mainColor', color);
    };

    return (
        <ModalWrapper
            isVisible={settings?.modalSettingsVisible}
            setVisible={() => changeSetting('modalSettingsVisible', false)}
        >
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
                        checked={settings.isFixedTrash}
                        onChange={(e) => changeFixedTrash(e)}
                    />
                </div>
            </div>
        </ModalWrapper>
    );
}
