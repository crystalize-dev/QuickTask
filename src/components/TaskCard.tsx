import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ItemsType = {
    id: UniqueIdentifier;
    title: string;
};

const TaskCard = ({ id, title }: ItemsType) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: id,
        data: {
            type: 'item'
        }
    });
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={{
                transition,
                transform: CSS.Translate.toString(transform)
            }}
            className={`w-full cursor-pointer rounded-xl border border-transparent bg-white px-2 py-4 shadow-md dark:bg-darker-bg dark:text-white ${
                isDragging && 'opacity-50'
            }`}
        >
            <div className="flex items-center justify-between">
                {title}
                <svg
                    {...listeners}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
        </div>
    );
};

export default TaskCard;
