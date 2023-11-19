import { useSortable } from '@dnd-kit/sortable';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { SettingsContext } from '../context/SettingsContext';
import Icon from './UI/Icon';

interface TrashProps {
    isDragging: boolean;
}

export default function Trash({ isDragging }: TrashProps) {
    const [visible, setVisible] = React.useState(isDragging);

    const { attributes, setNodeRef, isOver } = useSortable({
        id: 'trash',
        data: { type: 'trash' }
    });

    const { settings } = React.useContext(SettingsContext);

    React.useEffect(() => {
        if (settings.isFixedTrash) setVisible(settings.isFixedTrash);
        else setVisible(isDragging);
    }, [settings.isFixedTrash, isDragging]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    initial={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.15 }}
                    {...attributes}
                    ref={setNodeRef}
                    id="trash"
                    className={`fixed bottom-4 left-4 z-9999 hidden h-12 w-12 items-center justify-center rounded-full bg-main p-3 text-black transition-all md:flex ${
                        isOver && '!scale-110 !bg-red-500'
                    }`}
                >
                    <Icon
                        path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        className="text-white"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
