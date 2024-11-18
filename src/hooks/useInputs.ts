import { useCallback, useEffect, useRef, useState } from "react";

const isKeyboardCodeAllowed = ( code: string ) => {
    return (
        code.startsWith('Key') ||
        code.startsWith('Digit') ||
        code === 'Backspace' ||
        code === 'Space'
    );
};

const useInputs = ( enabled: boolean ) => {
    // Index of current character
    const [cursor, setCursor] = useState(0);
    // Store the current key typed by the user
    const [typed, setTyped] = useState<string>("");
    // Total amount of characters typed
    const totalTyped = useRef(0);

    //
    const keydownHandler = useCallback(({ key, code }: KeyboardEvent) => {
        if (!enabled || !isKeyboardCodeAllowed(code)) {
            return;
        }

        switch (key) {
            //  If its a backspace remove the character typed.
            //  Decrement the cursor and the total characters typed.
            case 'Backspace':
                setTyped((prev) => prev.slice(0, -1));
                setCursor(cursor - 1);
                totalTyped.current -= 1;
                break;
            //  If it's a character concadenate to the previous one
            // Increase the cursor and the total characters typed.
            default:
                setTyped((prev) => prev.concat(key));
                setCursor(cursor + 1);
                totalTyped.current += 1;
        }
    }, [cursor, enabled]);

    // 
    const clearTyped = useCallback(() => {
        setTyped('');
        setCursor(0);
    }, []);

    // 
    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    }, []);

    // Add event listener to record user's keystrokes
    useEffect(() => {
        window.addEventListener('keydown', keydownHandler);

        // Remove it on cleanup
        return () => {
            window.removeEventListener('keydown', keydownHandler);
        };
    }, [keydownHandler]);

    return { typed, cursor, clearTyped, resetTotalTyped, totalTyped: totalTyped.current };
};

export default useInputs;