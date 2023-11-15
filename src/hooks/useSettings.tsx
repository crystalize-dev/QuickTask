import React from 'react';
import SettingsOpenModal from '../components/Modal/settingsModal';

export const useSettings = () => {
    const [modal, setSettingsModal] = React.useState(false);
    const [mainColor, setMainColor] = React.useState('#6e51ec');
    const [isFixedTrash, setFixedTrash] = React.useState(false);
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const SettingsModal = (
        <SettingsOpenModal
            modal={modal}
            setMainColor={setMainColor}
            mainColor={mainColor}
        />
    );

    React.useEffect(() => {
        const optionsRaw = localStorage.getItem('options');

        if (optionsRaw) {
            const options = JSON.parse(optionsRaw);

            setMainColor(options.mainColor);
            setFixedTrash(options.isFixedTrash);
            setTheme(options.theme);
        }
    }, []);

    React.useEffect(() => {
        const root = document.getElementById('root');

        root?.style.setProperty('--main', mainColor);
    }, [mainColor]);

    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    React.useEffect(() => {
        const options = { mainColor, isFixedTrash, theme };

        localStorage.setItem('options', JSON.stringify(options));
    }, [mainColor, isFixedTrash, theme]);

    return {
        SettingsModal,
        setSettingsModal,
        isFixedTrash,
        setFixedTrash,
        toggleTheme,
        theme
    };
};
