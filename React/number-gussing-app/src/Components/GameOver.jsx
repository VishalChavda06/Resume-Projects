import React from 'react'

const GameOver = ({target, attempts, onRestart}) => {
  return (
    <div className='bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center'>
      <h1 className='text-2xl font-bold mb-2'>Game Over 🎉</h1>
      <p className='mb-4'>You guessed the number <span className='font-semibold'>{target}</span> in <span className='font-semibold'>{attempts}</span> attempts.</p>
      <button onClick={onRestart} className='px-4 h-10 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'>Play Again</button>
    </div>
  )
}

export default GameOver