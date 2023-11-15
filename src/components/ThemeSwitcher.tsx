import { motion } from 'framer-motion';
import { SettingsContext } from '../context/SettingsContext';
import React from 'react';

export default function ThemeSwitcher() {
    const sun =
        'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z';
    const moon =
        'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z';

    const { theme, toggleTheme } = React.useContext(SettingsContext);

    return (
        <div
            title="Change theme"
            data-theme={theme}
            className="h-fit w-fit"
            onClick={toggleTheme}
        >
            <motion.svg
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7 cursor-pointer outline-none dark:text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={theme === 'light' ? sun : moon}
                />
            </motion.svg>
        </div>
    );
}
