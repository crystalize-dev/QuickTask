import React from "react"


type SettingsProps = {
    SettingsModal: React.ReactNode
    setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
    isFixedTrash: boolean;
    setFixedTrash: React.Dispatch<React.SetStateAction<boolean>>;
    toggleTheme: () => void;
    theme: "dark" | "light"
}

export const SettingsContext = React.createContext({} as SettingsProps)