import { useTranslation } from 'react-i18next';
import Select, { ActionMeta, SingleValue } from 'react-select';

type OptionType = { label: string; value: unknown };

interface IProps<T> {
    optionsRaw: Array<T>;
    required?: boolean;
    onChange?: (
        newValue: SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
    ) => void;
    defaulValue: T;
    name: string;
}

function SelectInput<T extends string>({
    optionsRaw,
    defaulValue,
    onChange,
    name,
    required
}: IProps<T>) {
    const { t } = useTranslation();

    const getLabel = (label: string) => {
        switch (label) {
            case 'Based on deadline':
                return t('basedOn');
            case 'low':
                return t('low');
            case 'medium':
                return t('medium');
            case 'high':
                return t('high');
            case 'very high':
                return t('veryHigh');
            default:
                return label;
        }
    };

    const options: OptionType[] = [
        ...optionsRaw.map((option) => {
            return {
                label: getLabel(option),
                value: option
            };
        })
    ];

    const defaultValue = {
        label: getLabel(defaulValue),
        value: defaulValue
    } as OptionType;

    return (
        <Select
            name={name}
            isSearchable={false}
            onChange={onChange}
            required={required}
            classNames={{
                container: () => '!w-72 !select-none !z-999',
                control: () =>
                    '!bg-transparent !p-1 !h-12 !rounded-md !text-black dark:!text-white !border-2 !border-main !cursor-pointer !shadow-none',
                menu: () => 'dark:!bg-dark-obj !w-max !min-w-full !rounded-md',
                menuList: () => '!p-0 !rounded-md',
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
            options={options}
            defaultValue={defaultValue}
        />
    );
}
export default SelectInput;
