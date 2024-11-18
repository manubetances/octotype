import { motion } from 'framer-motion';
import { formatPercentage } from '../utils/helpers';
import { State } from '../hooks/useEngine';

interface ResultsWindowProps {
    errors: number;
    WPM: number;
    accurracyPercentage: number;
    className?: string;
    state: State;
}

const ResultsWindow = ({errors, WPM, accurracyPercentage, className, state}: ResultsWindowProps) => {
    const initial = { opacity: 0};
    const animate = { opacity: 1};
    const duration = { duration: 0.3};

    if (state !== 'finish') {
        return null;
    }
    
    return (
        <motion.ul
            className={`flex flex-col items-center text-yellow-500 space-y-3
            ${className}`}
        >
            <motion.li 
                className="text-xl font-semibold"
                initial={initial}
                animate={animate}
                transition={{...duration, delay: 0}}
            >
                Results
            </motion.li>
            <motion.li
                initial={initial}
                animate={animate}
                transition={{...duration, delay: 0.5}}
            >
                WPM: {WPM.toFixed(2)}
            </motion.li>
            <motion.li
                initial={initial}
                animate={animate}
                transition={{...duration, delay: 0.5}}
            >
                Accurracy: {formatPercentage(accurracyPercentage)}
            </motion.li>
            <motion.li 
                className="text-red-500"
                initial={initial}
                animate={animate}
                transition={{...duration, delay: 1}}
            >
                Errors: {errors}
            </motion.li>
        </motion.ul>
    );
};

export default ResultsWindow;