import React, { useState } from 'react'

const GuessForm = ({onGuess}) => {
  
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = Number(value);
    onGuess(parsed);
    setValue('');
  }
 


  return (
   <>
   <form onSubmit={handleSubmit} className='flex gap-2'>
    <input type="number" placeholder='Enter your guess (1-100)' className='flex-1 h-10 px-3 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' value={value} onChange={(e) => setValue(e.target.value)} />
    <button type='submit' className='px-4 h-10 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'>Guess</button>
   </form>
   </>
  )
}

export default GuessForm