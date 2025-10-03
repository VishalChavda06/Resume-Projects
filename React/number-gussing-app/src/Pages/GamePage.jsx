import React from 'react'
import GuessForm from '../Components/GuessForm'
import FeddBack from '../Components/FeddBack'
import History from '../Components/History'
import GameOver from '../Components/GameOver'
import { useState } from 'react'
import { generateRandomNumber } from '../Utils/random'

const GamePage = () => {

  const [target, setTarget] = useState(generateRandomNumber());
  const [feedback, setFeedback] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);


  //handle guess
  const handleGuess = (num) => {
    if (gameOver) return;
    if (!num || num < 1 || num > 100) {
      setFeedback('Please enter a number between 1 and 100');
      return;
    }
    setGuesses(prev => [...prev, num]);
    if (num === target) {
      setFeedback('You guessed the number!');
      setGameOver(true);
    } else if (num < target) {
      setFeedback('Too low!');
    } else {
      setFeedback('Too high!');
    }
  }

  // reset game
  const handleRestart=()=>{
    setTarget(generateRandomNumber());
    setFeedback('');
    setGuesses([]);
    setGameOver(false);
  }


  return (
  <div className='max-w-xl mx-auto p-6'>
    <h1 className='text-2xl font-bold mb-4'>Number Guessing Game</h1>

    {!gameOver ? (
      <div className='space-y-4'>
        <GuessForm onGuess={handleGuess} />
        <FeddBack feedback={feedback} />
        <History guesses={guesses} />
      </div>
    ) : (
      <GameOver
        target={target}
        attempts={guesses.length}
        onRestart={handleRestart}
      />
    )}
  </div>
  )
}

export default GamePage