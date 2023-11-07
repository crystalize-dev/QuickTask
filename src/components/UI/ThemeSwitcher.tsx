import { useEffect, useState } from 'react';
import { moon, sun } from '../../assets/paths';
import { motion } from 'framer-motion';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', theme);
    };

    useEffect(() => {
        const theme = localStorage.getItem('theme');

        if (theme) setTheme(theme);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    return (
        <div
            title="Change theme"
            data-theme={theme}
            className="fixed right-3 top-4 z-999 h-fit w-fit self-start md:right-8"
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
