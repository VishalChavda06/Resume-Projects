import { useState } from 'react';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { questions } from './data/questions';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome', 'quiz', 'result'
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = () => {
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (score) => {
    setFinalScore(score);
    setCurrentScreen('result');
  };

  const handleRetry = () => {
    setCurrentScreen('quiz');
  };

  const handleBackToStart = () => {
    setCurrentScreen('welcome');
    setFinalScore(0);
  };

  return (
    <div className="app">
      {currentScreen === 'welcome' && (
        <Welcome onStart={handleStart} />
      )}
      
      {currentScreen === 'quiz' && (
        <Quiz 
          questions={questions} 
          onComplete={handleQuizComplete} 
        />
      )}
      
      {currentScreen === 'result' && (
        <Result 
          score={finalScore}
          totalQuestions={questions.length}
          onRetry={handleRetry}
          onBackToStart={handleBackToStart}
        />
      )}
    </div>
  );
}

export default App;