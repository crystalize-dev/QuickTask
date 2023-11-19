import React from 'react';
import Button from './SmallComponents/Button';
import logo from '../assets/logo.webp';
import { useTranslation } from 'react-i18next';
import Icon from './SmallComponents/Icon';
import ModalSettings from './Modal/ModalSettings';
import { SettingsContext } from '../context/SettingsContext';
import { TaskContext } from '../context/TaskContext';

export default function Navbar() {
    const { t } = useTranslation();
    const { changeSetting } = React.useContext(SettingsContext);
    const { setContainerModal } = React.useContext(TaskContext);

    return (
        <div className="relative flex h-fit w-full select-none items-center justify-between gap-4 md:justify-normal">
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
                {t('navbar.button')}
            </Button>

            <Icon
                icon="settings"
                onClick={() => changeSetting('modalSettingsVisible', true)}
                className="h-7 w-7"
            />

            <ModalSettings />
        </div>
    );
}
