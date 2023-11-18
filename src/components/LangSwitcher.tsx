import { Translation } from 'i18nano';
import { SettingsContext } from '../context/SettingsContext';
import React from 'react';

const LangSwitcher = () => {
    const { settings, changeSetting } = React.useContext(SettingsContext);

    const switchLang = () => {
        if (settings.lang === 'ru') {
            changeSetting('lang', 'en');
        } else {
            changeSetting('lang', 'ru');
        }
    };

    return (
        <div
            onClick={switchLang}
            className="flex cursor-pointer items-center gap-1"
        >
            123123
        </div>
    );
};

export default LangSwitcher;
