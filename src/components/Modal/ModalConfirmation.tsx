interface IProps {
    onConfirm: (state: boolean) => void;
}

const ModalConfirmation = ({ onConfirm }: IProps) => {
    const handleConfirm = () => {
        onConfirm(true);
    };

    const handleCancel = () => {
        onConfirm(false);
    };

    return (
        <form
            className="fixed left-0 top-0 z-9999 flex h-full w-full items-center justify-center backdrop-blur"
            onMouseDown={handleCancel}
            onSubmit={handleConfirm}
        >
            <div className="flex h-full w-full flex-col justify-center gap-4 bg-white p-8 shadow-xl dark:bg-dark-obj dark:text-white md:h-fit md:w-fit md:items-center md:rounded-lg">
                <p className="text-center text-xl font-semibold">
                    Are you sure?
                </p>

                <div className="flex items-center gap-2">
                    <button
                        autoFocus
                        type="submit"
                        className="flex h-12 w-24 cursor-pointer items-center justify-center rounded-lg bg-green-500 px-4 py-2 text-white"
                    >
                        Да
                    </button>
                    <div
                        className="flex h-12 w-24 cursor-pointer items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white"
                        onClick={handleCancel}
                    >
                        Нет
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ModalConfirmation;
