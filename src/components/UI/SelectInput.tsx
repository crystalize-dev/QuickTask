import { useTranslation } from 'react-i18next';
import Select, { PropsValue, SingleValue } from 'react-select';
import { getPriorityLocale } from '../../utility/getPriorityLocale';
import React from 'react';

export type OptionType<T> = { label: string; value: T };

interface IProps<T> {
    optionsRaw: Array<T>;
    required?: boolean;
    onChange?: (newValue: SingleValue<OptionType<T>>) => void;
    defaultValue: T;
    name: string;
}

function SelectInput<T extends string>({
    optionsRaw,
    defaultValue,
    onChange,
    name,
    required
}: IProps<T>) {
    const { t } = useTranslation();

    const options: OptionType[] = [
        ...optionsRaw.map((option) => {
            return {
                label: getPriorityLocale(option, t),
                value: option
            };
        })
    ];

    const defaultOption = {
        label: getPriorityLocale(defaultValue, t),
        value: defaultValue
    } as OptionType<T>;

    const [value, setValue] = React.useState<
        PropsValue<OptionType<T>> | undefined
    >(defaultOption);

    const handleChange = (newValue: SingleValue<OptionType<T>>) => {
        onChange && onChange(newValue);
        setValue(newValue);
    };

    return (
        <Select
            name={name}
            isSearchable={false}
            onChange={handleChange}
            required={required}
            classNames={{
                container: () => '!min-w-full lg:!w-72 !select-none !z-999',
                control: () =>
                    '!bg-transparent !p-1 !h-12 !rounded-md !text-black dark:!text-white !border-2 !border-main !cursor-pointer !shadow-none',
                menu: () =>
                    'dark:!bg-dark-obj !w-max !border-2 !border-main !border-solid !min-w-full !rounded-md',
                menuList: () => '!p-0',
                option: () =>
                    '!whitespace-nowrap !w-full hover:!bg-main dark:!text-white !text-black hover:!text-white !cursor-pointer',
                singleValue: () => 'dark:!text-white !text-black',
                indicatorSeparator: () => 'dark:!bg-gray-500'
            }}
            styles={{
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? 'var(--main)' : 'unset',
                    color: state.isSelected ? 'white !important' : 'unset'
                })
            }}
            value={value}
            options={options}
        />
    );
}
export default SelectInput;
