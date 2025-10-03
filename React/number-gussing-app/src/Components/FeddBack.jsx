import React from 'react'

const FeddBack = ({feedback}) => {
  return (
    <div className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
      <h2 className='text-lg font-semibold mb-2'>Feedback</h2>
      <p className='text-slate-700'>{feedback || 'Start guessing to get feedback!'}</p>
    </div>
  )
}

export default FeddBack