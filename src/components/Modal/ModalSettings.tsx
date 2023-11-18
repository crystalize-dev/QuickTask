import React from 'react';
import Modal from './ModalWrapper';
import { SettingsContext } from '../../context/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';
import Checkbox from '../UI/Checkbox';
import ThemeSwitcher from '../ThemeSwitcher';
import LangSwitcher from '../LangSwitcher';

interface SettingsModalProps {
    modal: boolean;
    mainColor: string;
    setMainColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function SettingsOpenModal({
    modal,
    mainColor,
    setMainColor
}: SettingsModalProps) {
    const defaultThemeColors = ['#6655f3', '#f41382', 'red', 'green', 'blue'];

    const { setSettingsModal, setFixedTrash, isFixedTrash, switchLang } =
        React.useContext(SettingsContext);

    const changeFixedTrash = (e: React.ChangeEvent) => {
        setFixedTrash((e.target as HTMLInputElement).checked);
    };

    return (
        <Modal isVisible={modal} setVisible={setSettingsModal}>
            <div className="flex flex-col items-center gap-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="h-20 w-20 dark:text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <h1 className="mb-8 text-3xl font-bold">Settings</h1>

                <LangSwitcher switchLang={switchLang} />

                <div className="flex w-full items-center gap-2 font-semibold">
                    <p>Theme - </p>
                    <ThemeSwitcher />L
                </div>

                <div className="flex w-full items-center gap-2 font-semibold">
                    <p>Main theme color - </p>
                    <AnimatePresence>
                        {defaultThemeColors.map((color) => (
                            <div
                                key={color}
                                onClick={() => setMainColor(color)}
                                className={`relative flex h-4 w-4 cursor-pointer items-center justify-center rounded-full`}
                                style={{ backgroundColor: color }}
                            >
                                {mainColor === color && (
                                    <motion.div
                                        layoutId="themeColor"
                                        className={`absolute h-full w-full rounded-full outline-offset-2`}
                                        style={{
                                            outline: `2px solid ${color}`
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="flex w-full items-center gap-2 font-semibold">
                    <p>Fixed trash - </p>
                    <Checkbox
                        checked={isFixedTrash}
                        onChange={(e) => changeFixedTrash(e)}
                    />
                </div>
            </div>
        </Modal>
    );
}