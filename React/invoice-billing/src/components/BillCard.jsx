import React from 'react'

const BillCard = ({ billNumber, totalAmount, itemCount, onView, onPrint, includeGST, gstRate, subtotal, gstAmount }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
  };

  // Calculate the correct total amount
  const getCorrectTotal = () => {
    if (includeGST && typeof subtotal === 'number' && typeof gstAmount === 'number') {
      return subtotal + gstAmount;
    }
    return totalAmount;
  };

  return (
    <div className='bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200'>
      <div className='flex items-start justify-between mb-4'>
        <div>
          <h3 className='text-lg font-semibold text-slate-900'>Bill #{billNumber}</h3>
          <p className='text-sm text-slate-500'>{itemCount} items</p>
        </div>
        <div className='w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center'>
          <span className='text-xl'>📄</span>
        </div>
      </div>
      
      <div className='mb-6'>
        {includeGST ? (
          <div className='space-y-2'>
            <div className='flex justify-between items-center text-sm'>
              <span className='text-slate-600'>Subtotal:</span>
              <span className='font-medium'>₹ {formatAmount(subtotal || 0)}</span>
            </div>
            <div className='flex justify-between items-center text-sm'>
              <span className='text-slate-600'>GST ({gstRate || 0}%):</span>
              <span className='font-medium text-green-600'>₹ {formatAmount(gstAmount || 0)}</span>
            </div>
            <div className='flex justify-between items-center pt-2 border-t border-slate-200'>
              <span className='text-slate-900 font-semibold'>Total:</span>
              <span className='text-2xl font-bold text-slate-900'>₹ {formatAmount(getCorrectTotal())}</span>
            </div>
          </div>
        ) : (
          <div>
            <p className='text-2xl font-bold text-slate-900'>
              ₹ {formatAmount(getCorrectTotal())}
            </p>
            <p className='text-sm text-slate-500'>Total Amount</p>
          </div>
        )}
      </div>
      
      <div className='flex gap-2'>
        <button
          onClick={onView}
          className='flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors text-sm'
        >
          View Bill
        </button>
        <button
          onClick={onPrint}
          className='flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm'
        >
          Print Bill
        </button>
      </div>
    </div>
  )
}

export default BillCard
