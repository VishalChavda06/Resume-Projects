import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogFooter } from './ui/Dialog'
import Button from './ui/Button'

const CreateBillModal = ({ open, onClose, catalogItems, onAddItems }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = catalogItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addItemToBill = (catalogItem) => {
    const existingItem = selectedItems.find(item => item.name === catalogItem.name)
    if (existingItem) {
      setSelectedItems(prev => prev.map(item =>
        item.name === catalogItem.name
          ? { ...item, qty: item.qty + 1 }
          : item
      ))
    } else {
      setSelectedItems(prev => [...prev, {
        name: catalogItem.name,
        price: catalogItem.price,
        qty: 1,
        discount: 0
      }])
    }
  }

  const updateItem = (index, field, value) => {
    setSelectedItems(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ))
  }

  const removeItem = (index) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index))
  }

  const calculateItemTotal = (item) => {
    return item.qty * item.price * (1 - (item.discount || 0) / 100)
  }

  const calculateTotal = () => {
    return selectedItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  }

  const handleSave = () => {
    if (selectedItems.length > 0) {
      onAddItems(selectedItems)
      setSelectedItems([])
      setSearchTerm('')
    }
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>Create New Bill</DialogHeader>
      
      <div className='space-y-6'>
        {/* Search */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Search Items
          </label>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Type to search items...'
            className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        {/* Catalog Items */}
        <div>
          <h3 className='text-lg font-semibold text-slate-900 mb-3'>Available Items</h3>
          <div className='grid grid-cols-1 gap-3 max-h-60 overflow-y-auto'>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors'
                >
                  <div className='flex-1'>
                    <h4 className='font-medium text-slate-900'>{item.name}</h4>
                    <p className='text-sm text-slate-500'>₹ {formatAmount(item.price)}</p>
                  </div>
                  <button
                    onClick={() => addItemToBill(item)}
                    className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium'
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <div className='text-center py-8 text-slate-500'>
                {catalogItems.length === 0 ? 'No items in catalog' : 'No items found'}
              </div>
            )}
          </div>
        </div>

        {/* Selected Items */}
        {selectedItems.length > 0 && (
          <div>
            <h3 className='text-lg font-semibold text-slate-900 mb-3'>Selected Items</h3>
            <div className='space-y-3 max-h-60 overflow-y-auto'>
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className='p-4 border border-slate-200 rounded-lg bg-slate-50'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <h4 className='font-medium text-slate-900'>{item.name}</h4>
                    <button
                      onClick={() => removeItem(index)}
                      className='text-red-600 hover:text-red-700 text-sm font-medium'
                    >
                      Remove
                    </button>
                  </div>
                  
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                    <div>
                      <label className='block text-xs font-medium text-slate-600 mb-1'>
                        Quantity
                      </label>
                      <input
                        type='number'
                        min='1'
                        value={item.qty}
                        onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value) || 1)}
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
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
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
                        value={item.discount}
                        onChange={(e) => updateItem(index, 'discount', parseFloat(e.target.value) || 0)}
                        className='w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      />
                    </div>
                  </div>
                  
                  <div className='mt-3 flex justify-between items-center'>
                    <span className='text-sm text-slate-600'>
                      Unit Price: ₹ {formatAmount(item.price)}
                    </span>
                    <span className='font-semibold text-slate-900'>
                      Total: ₹ {formatAmount(calculateItemTotal(item))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        {selectedItems.length > 0 && (
          <div className='border-t border-slate-200 pt-4'>
            <div className='flex justify-between items-center'>
              <span className='text-lg font-semibold text-slate-900'>Total Amount:</span>
              <span className='text-2xl font-bold text-indigo-600'>
                ₹ {formatAmount(calculateTotal())}
              </span>
            </div>
          </div>
        )}
      </div>

      <DialogFooter>
        <Button variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={selectedItems.length === 0}
        >
          Create Bill
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default CreateBillModal
