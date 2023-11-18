import { useTranslation } from 'react-i18next';
import React from 'react';
import { SettingsContext } from '../context/SettingsContext';

const LangSwitcher = (switchLang) => {
    const { t } = useTranslation();

    return (
        <p onClick={switchLang}>
            {t && t('lang')}
            <span>{t('langName')}</span>
        </p>
    );
};

export default LangSwitcher;
