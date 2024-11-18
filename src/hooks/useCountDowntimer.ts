import { useCallback, useEffect, useRef, useState } from "react";

const useCountdownTimer = (seconds: number) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const startCountdown = useCallback(() => {
        console.log('syatying countdown...');

        intervalRef.current = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000);
    }, [setTimeLeft]);

    const resetCountdown = useCallback(() => {
        console.log('resetting...');

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setTimeLeft(seconds);
    }, [seconds]);

    // When interval reaches 0, clear the countdown
    useEffect(() => {
        if (!timeLeft && intervalRef.current) {
            console.log('clearing timer...');

            clearInterval(intervalRef.current);
        }
    }, [timeLeft, intervalRef]);

    return { timeLeft, startCountdown, resetCountdown};
};

export default useCountdownTimer;