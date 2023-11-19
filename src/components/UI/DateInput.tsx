interface InputProps {
    name: string;
    required?: boolean;
    minDate?: string;
    maxDate?: string;
}

export default function DateInput({
    name,
    required,
    minDate,
    maxDate
}: InputProps) {
    return (
        <input
            name={name}
            required={required}
            type="date"
            min={minDate}
            max={maxDate}
            className="!h-12 w-full rounded-md border-2 border-main bg-transparent p-2 outline-none transition-all focus:!border-main focus:ring-0"
        />
    );
}
