import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogFooter } from './ui/Dialog'
import Button from './ui/Button'

const ViewBillModal = ({ open, onClose, bill, billNumber, onEditItem, onDeleteItem, onPrint }) => {
  const [editingIndex, setEditingIndex] = useState(null)
  const [editItem, setEditItem] = useState({})

  const calculateItemTotal = (item) => {
    return item.qty * item.price * (1 - (item.discount || 0) / 100)
  }

  const calculateTotal = () => {
    return bill.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)
  }

  const handleEdit = (index, item) => {
    setEditingIndex(index)
    setEditItem({ ...item })
  }

  const handleSaveEdit = () => {
    onEditItem(editingIndex, editItem)
    setEditingIndex(null)
    setEditItem({})
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditItem({})
  }

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDeleteItem(index)
    }
  }

  const updateEditItem = (field, value) => {
    setEditItem(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>
        <div className='flex items-center justify-between'>
          <span>Bill #{billNumber}</span>
          <button
            onClick={onPrint}
            className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium'
          >
            🖨️ Print Bill
          </button>
        </div>
      </DialogHeader>
      
      <div className='space-y-4'>
        {bill.length > 0 ? (
          <div className='space-y-3'>
            {bill.map((item, index) => (
              <div key={index} className='p-4 border border-slate-200 rounded-lg bg-slate-50'>
                {editingIndex === index ? (
                  // Edit Mode
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <h4 className='font-medium text-slate-900'>{item.name}</h4>
                      <div className='flex gap-2'>
                        <button
                          onClick={handleSaveEdit}
                          className='px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700'
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className='px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-700'
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                      <div>
                        <label className='block text-xs font-medium text-slate-600 mb-1'>
                          Quantity
                        </label>
                        <input
                          type='number'
                          min='1'
                          value={editItem.qty}
                          onChange={(e) => updateEditItem('qty', parseInt(e.target.value) || 1)}
                          className='w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                      </div>
                      
                      <div>
                        <label className='block text-xs font-medium text-slate-600 mb-1'>
                          Price
                        </label>
                        <input
                          type='number'
                          min='0'
                          step='0.01'
                          value={editItem.price}
                          onChange={(e) => updateEditItem('price', parseFloat(e.target.value) || 0)}
                          className='w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                      </div>
                      
                      <div>
                        <label className='block text-xs font-medium text-slate-600 mb-1'>
                          Discount (%)
                        </label>
                        <input
                          type='number'
                          min='0'
                          max='100'
                          value={editItem.discount}
                          onChange={(e) => updateEditItem('discount', parseFloat(e.target.value) || 0)}
                          className='w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                      </div>
                    </div>
                    
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-slate-600'>
                        Unit Price: ₹ {formatAmount(editItem.price)}
                      </span>
                      <span className='font-semibold text-slate-900'>
                        Total: ₹ {formatAmount(calculateItemTotal(editItem))}
                      </span>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className='flex items-center justify-between mb-3'>
                      <h4 className='font-medium text-slate-900'>{item.name}</h4>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => handleEdit(index, item)}
                          className='px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className='px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm'>
                      <div>
                        <span className='text-slate-600'>Qty:</span>
                        <span className='ml-2 font-medium'>{item.qty}</span>
                      </div>
                      <div>
                        <span className='text-slate-600'>Price:</span>
                        <span className='ml-2 font-medium'>₹ {formatAmount(item.price)}</span>
                      </div>
                      <div>
                        <span className='text-slate-600'>Discount:</span>
                        <span className='ml-2 font-medium'>{item.discount}%</span>
                      </div>
                      <div className='text-right'>
                        <span className='text-slate-600'>Total:</span>
                        <span className='ml-2 font-semibold text-slate-900'>
                          ₹ {formatAmount(calculateItemTotal(item))}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Total */}
            <div className='border-t border-slate-200 pt-4'>
              <div className='flex justify-between items-center'>
                <span className='text-lg font-semibold text-slate-900'>Total Amount:</span>
                <span className='text-2xl font-bold text-indigo-600'>
                  ₹ {formatAmount(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center py-8 text-slate-500'>
            No items in this bill
          </div>
        )}
      </div>

      <DialogFooter>
        <Button variant='outline' onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default ViewBillModal
