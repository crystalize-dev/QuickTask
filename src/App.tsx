import './App.css';
import { SettingsContext } from './context/SettingsContext';
import { useSettings } from './hooks/useSettings';
import { TranslationProvider } from 'i18nano';
import { translations } from './localization/translation';
import AppRouter from './routing/AppRouter';

function App() {
    const {
        SettingsModal,
        setSettingsModal,
        isFixedTrash,
        setFixedTrash,
        toggleTheme,
        theme,
        switchLang
    } = useSettings();

    return (
        <TranslationProvider
            translations={translations}
            transition={true}
            preloadFallback={true}
            fallback={'ru'}
        >
            <SettingsContext.Provider
                value={{
                    SettingsModal,
                    setSettingsModal,
                    isFixedTrash,
                    setFixedTrash,
                    toggleTheme,
                    theme,
                    switchLang
                }}
            >
                <AppRouter />
            </SettingsContext.Provider>
        </TranslationProvider>
    );
}

export default App;
