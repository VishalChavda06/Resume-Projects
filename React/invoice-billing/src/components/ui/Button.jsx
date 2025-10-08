import React from 'react'

const variants = {
  default: 'bg-indigo-600 text-white hover:bg-indigo-700',
  outline: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-50'
};

const Button = ({ variant='default', className='', ...props }) => {
  return (
    <button {...props} className={`px-3 py-2 rounded-md text-sm font-semibold shadow-sm ${variants[variant]} ${className}`.trim()} />
  );
};

export default Button


