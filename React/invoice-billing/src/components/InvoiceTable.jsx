import React, { useState } from 'react'
import { calculateItemTotal } from '../Utils/Cal'
// Display helpers
const round = (n) => Math.round(parseFloat(n) || 0);
const inr = (n) => `₹ ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(round(n))}`;
const InvoiceTable = ({items, onEditItem, onDeleteItem}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', qty: '', price: '', discount: '' });

  const handleEdit = (index, item) => {
    setEditingIndex(index);
    setEditForm({
      name: item.name,
      qty: item.qty,
      price: item.price,
      discount: item.discount
    });
  };

  const handleSave = () => {
    if (editForm.name.trim() && editForm.qty && editForm.price) {
      onEditItem(editingIndex, editForm);
      setEditingIndex(null);
      setEditForm({ name: '', qty: '', price: '', discount: '' });
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditForm({ name: '', qty: '', price: '', discount: '' });
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDeleteItem(index);
    }
  };
  return (
    <div className='overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0'>
        <table className='w-full border-collapse rounded-xl overflow-hidden min-w-[600px]'>
            <thead>
                <tr className='bg-slate-50 text-slate-600'>
                    <th className='text-left font-semibold text-sm p-2 sm:p-3 border-b border-slate-200 min-w-[120px]'>Name</th>
                    <th className='text-center font-semibold text-sm p-2 sm:p-3 border-b border-slate-200 min-w-[80px]'>Qty</th>
                    <th className='text-left font-semibold text-sm p-2 sm:p-3 border-b border-slate-200 min-w-[100px]'>Price</th>
                    <th className='text-left font-semibold text-sm p-2 sm:p-3 border-b border-slate-200 min-w-[80px]'>Discount</th>
                    <th className='text-left font-semibold text-sm p-2 sm:p-3 border-b border-slate-200 min-w-[100px]'>Amount</th>
                    <th className='text-center font-semibold text-sm p-2 sm:p-3 border-b border-slate-200 min-w-[100px]'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index)=>{
                    const subtotal = calculateItemTotal(item.qty, item.price, item.discount);
                    const total = subtotal; // GST removed
                    return (
                    <tr key={index} className='odd:bg-white even:bg-slate-50/50 hover:bg-slate-50'>
                        {editingIndex === index ? (
                            <>
                                <td className='p-2 sm:p-3 border-b border-slate-200'>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                        className='w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                        placeholder="Item name"
                                    />
                                </td>
                                <td className='p-2 sm:p-3 border-b border-slate-200'>
                                    <input
                                        type="number"
                                        value={editForm.qty}
                                        onChange={(e) => setEditForm({...editForm, qty: e.target.value})}
                                        className='w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center'
                                        placeholder="Qty"
                                        min="1"
                                    />
                                </td>
                                <td className='p-2 sm:p-3 border-b border-slate-200'>
                                    <input
                                        type="number"
                                        value={editForm.price}
                                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                                        className='w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                        placeholder="Price"
                                        min="0"
                                    />
                                </td>
                                <td className='p-2 sm:p-3 border-b border-slate-200'>
                                    <input
                                        type="number"
                                        value={editForm.discount}
                                        onChange={(e) => setEditForm({...editForm, discount: e.target.value})}
                                        className='w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center'
                                        placeholder="Discount"
                                        min="0"
                                        max="100"
                                    />
                                </td>
                                <td className='p-2 sm:p-3 border-b border-slate-200 text-sm font-medium'>
                                    {inr(calculateItemTotal(editForm.qty, editForm.price, editForm.discount))}
                                </td>
                                <td className='p-2 sm:p-3 border-b border-slate-200'>
                                    <div className='flex gap-1 justify-center'>
                                        <button
                                            onClick={handleSave}
                                            className='px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-md hover:bg-emerald-700 shadow-sm font-medium'
                                        >
                                            ✓ Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className='px-3 py-1.5 bg-slate-500 text-white text-xs rounded-md hover:bg-slate-600 shadow-sm font-medium'
                                        >
                                            ✕ Cancel
                                        </button>
                                    </div>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className='p-2 sm:p-3 border-b border-slate-200 text-sm truncate max-w-[120px]' title={item.name}>{item.name}</td>
                                <td className='p-2 sm:p-3 border-b border-slate-200 text-sm text-center'>{round(item.qty)}</td>
                                <td className='p-2 sm:p-3 border-b border-slate-200 text-sm'>{inr(item.price)}</td>
                                <td className='p-2 sm:p-3 border-b border-slate-200 text-sm text-center'>{round(item.discount)}%</td>
                                <td className='p-2 sm:p-3 border-b border-slate-200 text-sm font-medium'>{inr(total)}</td>
                                <td className='p-2 sm:p-3 border-b border-slate-200'>
                                    <div className='flex gap-1 justify-center'>
                                        <button
                                            onClick={() => handleEdit(index, item)}
                                            className='px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 shadow-sm font-medium'
                                            title='Edit item'
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className='px-3 py-1.5 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 shadow-sm font-medium'
                                            title='Delete item'
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </td>
                            </>
                        )}
                    </tr>
                )})}
            </tbody>
        </table>
    </div>
  )
}

export default InvoiceTable