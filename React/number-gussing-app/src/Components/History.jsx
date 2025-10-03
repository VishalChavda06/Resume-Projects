import React from 'react'

const History = ({guesses}) => {
  return (
    <div className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
      <h2 className='text-lg font-semibold mb-2'>Previous Guesses ({guesses.length})</h2>
      {guesses.length === 0 ? (
        <p className='text-slate-600'>No guesses yet</p>
      ) : (
        <div className='flex flex-wrap gap-2'>
          {guesses.map((g, idx) => (
            <span key={idx} className='px-2 py-1 text-sm bg-slate-100 rounded-md'>{g}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default History