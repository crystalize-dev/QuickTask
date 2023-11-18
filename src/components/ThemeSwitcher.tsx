import { SettingsContext } from '../context/SettingsContext';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ThemeSwitcher() {
    const { settings, changeSetting } = React.useContext(SettingsContext);
    const switchTheme = () => {
        if (settings.theme === 'light') {
            changeSetting('theme', 'dark');
        } else {
            changeSetting('theme', 'light');
        }
    };

    const { t } = useTranslation();

    return (
        <div
            title="Change theme"
            data-theme={settings.theme}
            className="items group flex h-fit w-fit cursor-pointer items-center gap-1"
            onClick={switchTheme}
        >
            <p>{t('settings.theme.title') + ': '}</p>

            <p className="group-hover:underline">
                {settings.theme === 'dark'
                    ? t('settings.theme.dark')
                    : t('settings.theme.light')}
            </p>
        </div>
    );
}
