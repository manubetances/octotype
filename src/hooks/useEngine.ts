// 'useEngine' manages the entire (business logic of the) application
import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountdownTimer from "./useCountDowntimer";
import useInputs from "./useInputs";
import { countErrors } from "../utils/helpers";

export type State = 'start' | 'run' | 'finish';

const NUMBER_OF_WORDS = 30;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
    const [state, setState] = useState<State>('start');
    const { words, updateWords } = useWords(NUMBER_OF_WORDS);
    const { timeLeft, startCountdown, resetCountdown} = useCountdownTimer(COUNTDOWN_SECONDS);
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped} = useInputs(state !== 'finish');
    
    const [errors, setErrors] = useState(0);

    //
    const isStarting = state === 'start' && cursor > 0;

    const areWordsFinished = cursor === words.length;

    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, cursor);
        setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
    }, [typed, words, cursor]);

    // When user starts typing we start the engine.
    useEffect(() => {
        if (isStarting) {
            setState('run');
            startCountdown();
        }
    }, [isStarting, startCountdown, cursor]);

    // When time reaches zero ( 0 ) game is over.
    useEffect(() => {
        if (!timeLeft) {
            console.log('Time is up!');
            setState('finish');
            sumErrors();
        }
    }, [timeLeft, sumErrors]);

    //
    useEffect(() => {
        if (areWordsFinished) {
            sumErrors();
            updateWords();
            clearTyped();
        }
    }, [
        cursor,
        words,
        clearTyped,
        areWordsFinished,
        updateWords,
        sumErrors,
    ]);

    //
    const restart = useCallback(() => {
        resetCountdown();
        resetTotalTyped();
        setState('start');
        setErrors(0);
        updateWords();
        clearTyped();
    }, [clearTyped, updateWords, resetCountdown, resetTotalTyped])


    return { state, words, timeLeft, typed, restart, errors, totalTyped };
}

export default useEngine;