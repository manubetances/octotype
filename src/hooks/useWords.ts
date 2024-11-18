//
import { getRandomSentenceWords } from "../utils/sentenceParser";
import { useCallback, useState } from "react";


const generateWords = (count: number) => {
    return getRandomSentenceWords(count);
}

const useWords = (count: number ) => {
    const [words, setWords] = useState<string>(generateWords(count));

    const updateWords = useCallback(() => {
        setWords(generateWords(count));
    }, [count])

    return { words, updateWords };
};

export default useWords;