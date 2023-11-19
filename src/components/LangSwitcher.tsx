import { useTranslation } from 'react-i18next';

const LangSwitcher = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        if (i18n.language === 'ru') {
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
        } else {
            i18n.changeLanguage('ru');
            localStorage.setItem('language', 'ru');
        }
    };

    return (
        <div
            onClick={changeLanguage}
            className="group flex cursor-pointer items-center gap-1 font-semibold"
        >
            <p>{t('langSwitcher.lang') + ': '}</p>
            <p className="group-hover:underline">
                {t('langSwitcher.langName')}
            </p>
        </div>
    );
};

export default LangSwitcher;
