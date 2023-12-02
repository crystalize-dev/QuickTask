import { SettingsType } from '../utility/Types/Settings-Types';
import React from 'react';

type SettingsProps = {
    settings: SettingsType;
    changeSetting: (
        setting: keyof SettingsType,
        value: SettingsType[typeof setting]
    ) => void;
};

export const SettingsContext = React.createContext({} as SettingsProps);
