import { AnimatePresence, motion } from 'framer-motion';
import transparent from '../../assets/transparent.jpg';

interface ColorInputProps {
    defaultMap: Array<string>;
    activeColor: string | null;
    onClick: (color: string | null) => void;
    withTransparent?: boolean;
}

export default function ColorInput({
    defaultMap,
    activeColor,
    onClick,
    withTransparent = false
}: ColorInputProps) {
    return (
        <div className="flex items-center gap-2">
            <AnimatePresence>
                {defaultMap.map((color) => (
                    <div
                        key={color}
                        onClick={() => onClick(color)}
                        className={`relative h-4 w-4 cursor-pointer items-center justify-center rounded-full`}
                        style={{ backgroundColor: color }}
                    >
                        {activeColor === color && (
                            <motion.div
                                layoutId="themeColor"
                                className={`absolute h-full w-full rounded-full outline-offset-2`}
                                style={{
                                    outline: `2px solid ${color}`
                                }}
                            />
                        )}
                    </div>
                ))}

                {withTransparent && (
                    <div
                        className={`relative h-4 w-4 cursor-pointer items-center justify-center rounded-full`}
                    >
                        <img
                            onClick={() => onClick(null)}
                            alt="transparent"
                            className={`absolute h-full w-full rounded-full outline-offset-2`}
                            src={transparent}
                        />
                        <div>
                            {!activeColor && (
                                <motion.div
                                    layoutId="themeColor"
                                    className={`absolute h-full w-full rounded-full outline-offset-2`}
                                    style={{
                                        outline: `2px solid gray`
                                    }}
                                />
                            )}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
