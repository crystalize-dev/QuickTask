import './App.css';
import { SettingsContext } from './context/SettingsContext';
import { useSettings } from './hooks/useSettings';
import AppRouter from './routing/AppRouter';

function App() {
    const { settings, changeSetting } = useSettings();

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
