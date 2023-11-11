import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from './UI/Button';

interface ContainerProps {
    id: UniqueIdentifier;
    children: React.ReactNode;
    title?: string;
    description?: string;
    onAddItem?: () => void;
}

const Container = ({
    id,
    children,
    title,
    description,
    onAddItem
}: ContainerProps) => {
    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: id,
        data: {
            type: 'container'
        }
    });
    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{
                transition,
                transform: CSS.Translate.toString(transform)
            }}
            className={`flex h-full w-full flex-col gap-y-4 rounded-xl bg-gray-100 p-4 transition-all dark:bg-dark-obj dark:text-white ${
                isDragging && 'opacity-50'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <h1 className="select-none text-xl">{title}</h1>
                    <p className="text-sm">{description}</p>
                </div>
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

            {children}
            <Button variant="ghost" onClick={onAddItem}>
                Add Item
            </Button>
        </div>
    );
};

export default Container;
