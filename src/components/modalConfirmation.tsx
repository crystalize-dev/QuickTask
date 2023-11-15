interface IProps {
    onConfirm: (state: boolean) => void;
}

const ConfirmationModal = ({ onConfirm }: IProps) => {
    const handleConfirm = () => {
        onConfirm(true);
    };

    const handleCancel = () => {
        onConfirm(false);
    };

    return (
        <div className="fixed left-0 top-0 z-9999 flex h-full w-full items-center justify-center backdrop-blur">
            <div className="flex h-full w-full flex-col justify-center gap-4 bg-white p-8 shadow-xl dark:bg-dark-obj dark:text-white md:h-fit md:w-fit md:items-center md:rounded-lg">
                <p className="text-center text-xl font-semibold">
                    Area you sure?
                </p>

                <div className="flex items-center gap-2">
                    <input
                        className="absolute hidden h-0 w-0 lg:block"
                        autoFocus
                        onKeyDown={(e) =>
                            e.key === 'Enter' ? handleConfirm() : null
                        }
                    />
                    <button
                        className="h-12 w-24 rounded-lg bg-green-500 px-4 py-2 text-white"
                        onClick={handleConfirm}
                    >
                        Да
                    </button>
                    <button
                        className="h-12 w-24 rounded-lg bg-red-500 px-4 py-2 text-white"
                        onClick={handleCancel}
                    >
                        Нет
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;