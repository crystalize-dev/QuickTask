import React from 'react';
import SettingsOpenModal from '../components/Modal/ModalSettings';
import { useTranslationChange } from 'i18nano';

export const useSettings = () => {
    const [modal, setSettingsModal] = React.useState(false);
    const [mainColor, setMainColor] = React.useState('#6655f3');
    const [isFixedTrash, setFixedTrash] = React.useState(false);
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    const lang = useTranslationChange();

    React.useEffect(() => {
        if (!lang.lang) {
            const language = localStorage.getItem('lang');

            if (language) lang.change(language);
            else lang.change('ru');
        } else localStorage.setItem('lang', lang.lang);
    }, [lang, lang.lang]);

    const switchLang = () => {
        lang.change(lang.lang === 'ru' ? 'en' : 'ru');
    };

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
        theme,
        switchLang
    };
};
