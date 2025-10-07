import React, { useState } from 'react'
import { calculateItemTotal } from '../Utils/Cal'
// Display helpers
const round = (n) => Math.round(parseFloat(n) || 0);
const inr = (n) => `₹ ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(round(n))}`;
const InvoiceTable = ({items, onEditItem, onDeleteItem}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', qty: '', price: '', discount: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Pagination state for table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 items per page
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  
  // Calculate items for current page (latest first, but keep original order)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Show latest items first by taking from the end of the array
  const totalItems = items.length;
  const fromEnd = totalItems - startIndex;
  const toEnd = totalItems - startIndex - itemsPerPage;
  const currentItems = items.slice(Math.max(0, toEnd), fromEnd).reverse();

  const handleEdit = (index, item) => {
    // Calculate actual index for the item in the original array
    const actualIndex = totalItems - 1 - startIndex - index;
    setEditingIndex(actualIndex);
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

  const handleDeleteClick = (index, item) => {
    // Calculate actual index for the item in the original array
    const actualIndex = totalItems - 1 - startIndex - index;
    setItemToDelete({ index: actualIndex, item });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      onDeleteItem(itemToDelete.index);
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
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
                    {currentItems.map((item, index)=>{
                        const subtotal = calculateItemTotal(item.qty, item.price, item.discount);
                        const total = subtotal; // GST removed
                        return (
                        <tr key={totalItems - 1 - startIndex - index} className='odd:bg-white even:bg-slate-50/50 hover:bg-slate-50'>
                            {editingIndex === (totalItems - 1 - startIndex - index) ? (
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
                                            onClick={() => handleDeleteClick(index, item)}
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
        
        {/* Table Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-between mt-4 pt-4 border-t border-slate-200'>
            <div className='text-sm text-slate-600'>
              Showing {startIndex + 1} to {Math.min(endIndex, items.length)} of {items.length} items
            </div>
            <div className='flex items-center gap-2'>
              <button
                className='px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium hover:bg-slate-50 transition-colors'
                onClick={() => setCurrentPage(1)}
                disabled={currentPage <= 1}
              >
                First
              </button>
              <button
                className='px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium hover:bg-slate-50 transition-colors'
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
              >
                ←
              </button>
              
              {/* Page Numbers */}
              <div className='flex items-center gap-1'>
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage <= 2) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                className='px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium hover:bg-slate-50 transition-colors'
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
              >
                →
              </button>
              <button
                className='px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium hover:bg-slate-50 transition-colors'
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage >= totalPages}
              >
                Last
              </button>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-5 sm:p-6'>
              <h3 className='text-lg font-semibold mb-3'>Delete Item</h3>
              <p className='text-sm text-slate-600 mb-6 leading-relaxed'>
                Are you sure you want to delete <strong>"{itemToDelete?.item?.name}"</strong>? 
                This action cannot be undone.
              </p>
              <div className='flex flex-col sm:flex-row gap-3 sm:justify-end'>
                <button 
                  onClick={cancelDelete} 
                  className='w-full sm:w-auto px-4 py-3 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 min-h-[44px] touch-manipulation font-semibold shadow-sm hover:shadow-md transition-all duration-200'
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  className='w-full sm:w-auto px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 min-h-[44px] touch-manipulation font-semibold shadow-md hover:shadow-lg transition-all duration-200'
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default InvoiceTable