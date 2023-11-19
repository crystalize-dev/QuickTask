import { motion } from 'framer-motion';
import paths from '../../assets/iconPaths';

interface IconsProps {
    className?: string;
    onClick?: () => void;
    listners?: object;
    icon: IconType;
    hover?: boolean;
    strokeWidth?: number;
}

type IconType =
    | 'settings'
    | 'moon'
    | 'trash'
    | 'pallete'
    | 'xmark'
    | 'arrowUp'
    | 'language'
    | 'drag'
    | 'recover'
    | 'questionRound';

export default function Icon({
    icon,
    onClick,
    className,
    listners,
    hover = true,
    strokeWidth = 2
}: IconsProps) {
    const path: string | Array<string> = paths[icon];

    return (
        <motion.svg
            {...listners}
            onClick={onClick}
            whileTap={hover ? { scale: 0.9 } : undefined}
            whileHover={hover ? { scale: 1.2 } : undefined}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            className={`${className} h-5 w-5 select-none border-none text-black outline-none dark:text-white ${
                hover ? 'cursor-pointer' : ''
            }`}
        >
            {typeof path === 'string' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d={path} />
            ) : (
                path.map((path) => (
                    <path
                        key={path}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={path}
                    />
                ))
            )}
        </motion.svg>
    );
}
