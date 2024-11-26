import cn from 'classnames';
import Caret from "./Caret";

interface UserInputsProps {
    userInput: string;
    className?: string;
    words: string;
}

const UserInputs = ({ userInput, className, words }: UserInputsProps) => {
    const typedCharacters = userInput.split("");

    return (
        <div className={className}>
            {typedCharacters.map((char, index) => {
                return (
                    <Character 
                        key={`${char}_${index}`}
                        actual = {char}
                        expected = {words[index]}
                    />
                )
            })}
            
            <Caret />
        </div>
    )
};

const Character = ({ actual, expected }: { actual: string, expected: string }) => {
    //
    const isCorrect = actual === expected;
    //
    const isWhiteSpace = expected === ' ';


    return (
        <span 
            className={cn({
                'text-stone-600/90': !isCorrect && !isWhiteSpace,    //
                'text-[#E64833]': isCorrect && !isWhiteSpace,  //
                'bg-red-500/50': !isCorrect && isWhiteSpace     //
            })}
        >
            {expected}
        </span>
    );
};

export default UserInputs;