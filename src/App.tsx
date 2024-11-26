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

      <SiteFooter />
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
    <div className="text-slate-400 text-pretty">
      {words}
    </div>
  );
};

//  Countdown when the user starts playing ( 30 seconds )
const CoundDownTimer = ({timeLeft}: {timeLeft: number}) => {
  return (
    <h2 className="text-[#E64833] font-medium">
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

const SiteFooter = () => {
  return (
    <div className="flex justify-center bottom-0 fixed right-[40%] left-[40%] py-4">
      <div className="flex flex-col items-center right-[50%] text-center gap-5">
        <a href="https://github.com/manubetances/octotype" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#E64833" className="bi bi-github opacity-50 hover:opacity-100" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
          </svg>
        </a>
        <h3 className="text-sm opacity-65 text-[#E64833]">2024 Manuel Betances ©</h3>
      </div>
    </div>
  )
}

export default App;
