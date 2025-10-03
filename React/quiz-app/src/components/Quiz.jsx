import { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalTimeLeft, setTotalTimeLeft] = useState(60); // 1 minute total for all questions
  const [questionTimeLeft, setQuestionTimeLeft] = useState(20); // 20 seconds per question
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setQuestionTimeLeft(20); // Reset question timer for each new question
  }, [currentQuestionIndex]);

  // Start the overall timer when quiz begins
  useEffect(() => {
    if (quizStarted && totalTimeLeft > 0) {
      const timer = setTimeout(() => {
        setTotalTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (totalTimeLeft === 0) {
      // Time's up - complete the quiz
      onComplete(score);
    }
  }, [totalTimeLeft, quizStarted, score, onComplete]);

  // Question timer - move to next question after 20 seconds
  useEffect(() => {
    if (quizStarted && questionTimeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setQuestionTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (questionTimeLeft === 0 && !isAnswered) {
      // Question time's up - move to next question
      handleTimeUp();
    }
  }, [questionTimeLeft, quizStarted, isAnswered]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (answerIndex) => {
    if (isAnswered || !quizStarted) return;
    
    setIsAnswered(true);
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }
    
    // Auto-move to next question after 1 second
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const handleTimeUp = () => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    
    // End the quiz immediately if user doesn't answer within 20 seconds
    onComplete(score);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-start-screen">
          <h2>Ready to Start?</h2>
          <p>You have <strong>1 minute (60 seconds)</strong> total to answer all {questions.length} questions!</p>
          <p>Each question has a <strong>20-second limit</strong> - if you don't answer in time, the quiz ends immediately!</p>
          <p>⚠️ <strong>Warning:</strong> You must answer within 20 seconds or the game exits!</p>
          <button className="start-quiz-button" onClick={startQuiz}>
            Start Quiz Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="quiz-info">
          <span className="question-number">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="score">Score: {score}</span>
        </div>
      </div>
      
      <div className="quiz-content">
        <div className="timers-container">
          <div className="total-timer">
            <span className="timer-label">Total Time:</span>
            <Timer timeLeft={totalTimeLeft} onTimeUp={() => onComplete(score)} />
          </div>
          <div className="question-timer">
            <span className="timer-label">Question Time:</span>
            <Timer timeLeft={questionTimeLeft} onTimeUp={handleTimeUp} />
          </div>
        </div>
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          correct={currentQuestion.correct}
          onAnswer={handleAnswer}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
        />
      </div>
    </div>
  );
};

export default Quiz;
