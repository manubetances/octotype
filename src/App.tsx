import RestartButton from "./components/RestartButton";
import ResultsWindow from "./components/ResultsWindow";
import UserInputs from "./components/UserInputs";
import useEngine from "./hooks/useEngine";
import { calculateAccuracy, calculateWPM } from "./utils/helpers";


const App = () => {
  const { state, words, timeLeft, typed, errors, totalTyped, restart } = useEngine();
  
  return (
    <>
      <SiteHeader />

      <CoundDownTimer timeLeft = {timeLeft} />

      <WordsContainer>
        <GeneratedWords words = {words}/>
        <UserInputs 
          className="absolute inset-0"
          words = {words}
          userInput = {typed} 
        />
      </WordsContainer>
      
      <RestartButton 
        className = {"mx-auto mt-10 text-slate-500"}
        onRestart = {restart}
      />

      <ResultsWindow
        state = {state}
        className = {"mt-10"}
        errors = {errors}
        accurracyPercentage={calculateAccuracy(errors, totalTyped)}
        WPM = {calculateWPM(totalTyped, errors)}
      />
    </>
  );
};

//  Main Application component, container for words and user input
const WordsContainer = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="relative max-w-5xl mt-3 text-3xl leading-relaxed break-all">
      {children}
    </div>
  )
}

//  Generated words for the user to type
const GeneratedWords = ({ words }: { words: string}) => {
  return (
    <div className="text-slate-500 text-pretty">
      {words}
    </div>
  );
};

//  Countdown when the user starts playing ( 30 seconds )
const CoundDownTimer = ({timeLeft}: {timeLeft: number}) => {
  return (
    <h2 className="text-yellow-500 font-medium">
      Time: {timeLeft}
    </h2>
  )
}

//  Identity
const SiteHeader = () => {
  return (
    <div className="flex justify-between mb-20 -mt-32 items-center">
      <h1 className="title-text">OctoType</h1>
      <img src="/images/Octo-logo.png" height={400} width={220} />
    </div>
  )
}

export default App;
