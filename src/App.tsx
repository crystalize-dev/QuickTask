import './App.css';
import { SettingsContext } from './context/SettingsContext';
import { useSettings } from './hooks/useSettings';
import AppRouter from './routes/AppRouter';
import './localization/localization';
import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
    const { settings, changeSetting } = useSettings();

    const { i18n } = useTranslation();

    React.useEffect(() => {
        const language = localStorage.getItem('language');

        if (language) i18n.changeLanguage(language);
    }, [i18n]);

    return (
        <SettingsContext.Provider
            value={{
                settings,
                changeSetting
            }}
        >
            <AppRouter />
        </SettingsContext.Provider>
    );
}

export default App;
