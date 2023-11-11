import React from 'react';
import Button from './UI/Button';
import ThemeSwitcher from './ThemeSwitcher';
import logo from '../assets/logo.webp';

interface NavbarProps {
    setContainerModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setContainerModal }: NavbarProps) {
    return (
        <div className="relative flex select-none items-center justify-between gap-4 md:justify-normal">
            <img
                src={logo}
                alt="logo"
                draggable={false}
                className="hidden h-12 md:block"
            />

            <h1 className="hidden text-3xl font-bold dark:text-white md:block">
                QuickTask
            </h1>

            <Button
                className="md:ml-auto"
                onClick={() => setContainerModal(true)}
            >
                Add container
            </Button>

            <ThemeSwitcher />
        </div>
    );
}
