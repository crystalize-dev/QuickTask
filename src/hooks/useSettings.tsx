import React from 'react';
import { SettingsType } from '../utility/Settings-Types';

export const useSettings = () => {
    const defaultSettings: SettingsType = {
        modalSettingsVisible: false,
        mainColor: '#6655f3',
        isFixedTrash: false,
        theme: 'light'
    };

    const [settings, setSettings] =
        React.useState<SettingsType>(defaultSettings);

    const changeSetting = (
        setting: keyof SettingsType,
        value: SettingsType[typeof setting]
    ) => {
        const newSettings = { ...settings, [setting]: value } as SettingsType;

        setSettings(newSettings);
    };

    React.useEffect(() => {
        const settingsRaw = localStorage.getItem('settings');

        if (settingsRaw) setSettings(JSON.parse(settingsRaw));
        else {
            setSettings(defaultSettings);
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));

        if (settings.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const root = document.getElementById('root');

        root?.style.setProperty('--main', settings.mainColor);
    }, [settings]);

    return {
        settings,
        changeSetting
    };
};
