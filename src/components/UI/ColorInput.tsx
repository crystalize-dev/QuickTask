import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export default function ColorInput() {
    type ColorType = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | null;
    const defaultMap = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        null
    ] as Array<ColorType>;

    const [activeColor, setActiveColor] = React.useState<ColorType>(null);

    return (
        <AnimatePresence>
            <div className="flex items-center gap-2">
                {defaultMap.map((color) =>
                    color ? (
                        <motion.div
                            key={color}
                            className="relative flex h-4 w-4 items-center justify-center"
                        >
                            <motion.div
                                onClick={() => setActiveColor(color)}
                                className={`bg-${color}-500 h-full w-full cursor-pointer rounded-full`}
                            ></motion.div>
                            {activeColor === color && (
                                <motion.div
                                    layoutId="color"
                                    className={`absolute h-full w-full rounded-full bg-transparent outline outline-offset-1 outline-${color}-500`}
                                />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div className="relative flex h-4 w-4 items-center justify-center">
                            <motion.div
                                onClick={() => setActiveColor(null)}
                                className={`h-full w-full cursor-pointer rounded-full bg-gray-500`}
                            ></motion.div>
                            {!activeColor && (
                                <motion.div
                                    layoutId="color"
                                    className="absolute h-full w-full rounded-full bg-transparent outline outline-offset-1 outline-gray-500"
                                />
                            )}
                        </motion.div>
                    )
                )}
            </div>
        </AnimatePresence>
    );
}
