import React from 'react';
import ModalWrapper from './ModalWrapper';
import { SettingsContext } from '../../context/SettingsContext';
import Checkbox from '../UI/Checkbox';
import ThemeSwitcher from '../ThemeSwitcher';
import LangSwitcher from '../LangSwitcher';
import { useTranslation } from 'react-i18next';
import ColorInput from '../UI/ColorInput';
import Icon from '../UI/Icon';

export default function ModalSettings() {
    const defaultColors = ['#6655f3', '#f41382', 'red', 'green', 'blue'];

    const { t } = useTranslation();

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
                    path={[
                        'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z',
                        'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    ]}
                    className="!h-20 !w-20"
                    strokeWidth={1}
                    hover={false}
                />
                <h1 className="mb-8 text-3xl font-bold">
                    {t('settings.title')}
                </h1>

                <div className="flex w-full items-center gap-2 font-semibold">
                    <Icon
                        path="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        hover={false}
                    />

                    <ThemeSwitcher />
                </div>

                <div className="flex w-full items-center gap-2 font-semibold">
                    <Icon
                        path="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                        hover={false}
                    />

                    <LangSwitcher />
                </div>

                <div className="flex w-full items-center gap-2 font-semibold">
                    <Icon
                        path="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                        hover={false}
                    />

                    <p>{t('settings.mainColor')} - </p>
                    <ColorInput
                        defaultMap={defaultColors}
                        onClick={changeColor}
                        activeColor={settings.mainColor}
                    />
                </div>

                <div className="flex w-full items-center gap-2 font-semibold">
                    <Icon
                        path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        hover={false}
                    />

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
