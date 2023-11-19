import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import Icon from './Icon';

interface TrashProps {
    isDragging: boolean;
}

export default function Trash({ isDragging }: TrashProps) {
    const [visible, setVisible] = React.useState(false);

    const { attributes, setNodeRef, isOver } = useSortable({
        id: 'trash',
        data: { type: 'trash' }
    });

    const { settings } = React.useContext(SettingsContext);

    React.useEffect(() => {
        if (settings.isFixedTrash) {
            setVisible(true);
            return;
        }

        setVisible(isDragging);
    }, [settings.isFixedTrash, isDragging]);

    // React.useEffect(() => {
    //     console.log(visible);
    // }, [visible, isDragging]);

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            id="trash"
            className={`${
                visible ? 'opacity-1' : 'opacity-0'
            } fixed -left-2 top-0 z-9999 hidden h-full w-1/20 !cursor-default items-center justify-center border-2 border-dashed border-transparent bg-main text-black transition-all lg:flex ${
                isOver && '!w-1/10 !border-main !bg-transparent'
            }`}
        >
            <Icon
                icon="trash"
                className="pointer-events-none text-white"
                hover={false}
            />
        </div>
    );
}
