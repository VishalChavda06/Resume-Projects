import React from 'react'

export const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />
      <div className='relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6'>{children}</div>
    </div>
  );
};

export const DialogHeader = ({ children }) => (
  <div className='mb-3 text-lg font-semibold'>{children}</div>
);

export const DialogFooter = ({ children }) => (
  <div className='mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end'>{children}</div>
);


