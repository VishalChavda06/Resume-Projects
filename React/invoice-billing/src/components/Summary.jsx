import React, { useState, useEffect } from 'react'
import { calculateItemTotal, calculateSummary } from '../Utils/Cal'
import * as XLSX from 'xlsx'
// Resolved URL for the print stylesheet (moved from public to src)
import printCssUrl from '../print.css?url'

const Summary = ({items}) => {
  // Helper: round amounts to nearest whole number for display
  const formatAmount = (n) => {
    const num = parseFloat(n);
    if (!Number.isFinite(num)) return 0;
    return Math.round(num);
  };
  // Helper: format as Indian Rupees (no decimals as per requirement)
  const formatINR = (n) => `₹ ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(formatAmount(n))}`;
  // State to track printed items
  const [printedItems, setPrintedItems] = useState([]);
  // Pagination state (latest-first) - increased page size for better UX
  const pageSize = 6; // Increased from 3 to 6 cards per page
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const [currentPage, setCurrentPage] = useState(totalPages);

  // Whenever items change, jump to the last page to show latest items
  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(items.length / pageSize));
    setCurrentPage(newTotalPages);
  }, [items]);

  // Load printed items from localStorage on component mount
  useEffect(() => {
    const savedPrintedItems = localStorage.getItem('printedItems');
    if (savedPrintedItems) {
      try {
        setPrintedItems(JSON.parse(savedPrintedItems));
      } catch (error) {
        console.error('Error parsing printed items:', error);
      }
    }
  }, []);

  // Save printed items to localStorage whenever it changes
  useEffect(() => {
    if (printedItems.length > 0) {
      localStorage.setItem('printedItems', JSON.stringify(printedItems));
    }
  }, [printedItems]);

  // Function to handle print and track printed items
  const handlePrintAndTrack = (index, items) => {
    // Print the bill
    printSingleBill(index, items);
    
    // Add to printed items with timestamp
    const itemToPrint = items[index];
    const total = calculateItemTotal(itemToPrint.qty, itemToPrint.price, itemToPrint.discount);
    
    // Create a unique key for this item (name + qty + price + discount)
    const itemKey = `${itemToPrint.name}-${itemToPrint.qty}-${itemToPrint.price}-${itemToPrint.discount}`;
    
    // Check if this exact item already exists in printedItems
    const existingItemIndex = printedItems.findIndex(printedItem => {
      const existingKey = `${printedItem.name}-${printedItem.qty}-${printedItem.price}-${printedItem.discount}`;
      return existingKey === itemKey;
    });
    
    const printedItem = {
      ...itemToPrint,
      total: total,
      printedAt: new Date().toISOString(),
      invoiceNumber: `INV-${Date.now()}-${index + 1}`,
      printCount: 1 // Track how many times this item was printed
    };
    
    if (existingItemIndex !== -1) {
      // Update existing item with new print info and increment count
      setPrintedItems(prev => {
        const updated = [...prev];
        updated[existingItemIndex] = {
          ...printedItem,
          printCount: (prev[existingItemIndex].printCount || 1) + 1,
          lastPrintedAt: new Date().toISOString()
        };
        return updated;
      });
    } else {
      // Add new item
      setPrintedItems(prev => [...prev, printedItem]);
    }
  };

  // Function to export printed items to Excel
  const exportToExcel = () => {
    if (printedItems.length === 0) {
      alert('No printed items to export! Please print some bills first.');
      return;
    }

    // Prepare data for Excel
    const excelData = printedItems.map((item, index) => ({
      'Invoice #': item.invoiceNumber,
      'Printed Date': new Date(item.printedAt).toLocaleDateString(),
      'Printed Time': new Date(item.printedAt).toLocaleTimeString(),
      'Item Name': item.name,
      'Quantity': item.qty,
      'Price': item.price,
      'Discount (%)': item.discount,
      'Amount': item.total.toFixed(2),
      'Print Count': item.printCount || 1,
      'Last Printed': item.lastPrintedAt ? new Date(item.lastPrintedAt).toLocaleString() : new Date(item.printedAt).toLocaleString()
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 15 }, // Invoice #
      { wch: 12 }, // Printed Date
      { wch: 12 }, // Printed Time
      { wch: 20 }, // Item Name
      { wch: 10 }, // Quantity
      { wch: 12 }, // Price
      { wch: 12 }, // Discount
      { wch: 12 }, // Amount
      { wch: 10 }, // Print Count
      { wch: 18 }  // Last Printed
    ];
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Printed Bills');

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `Printed_Bills_${currentDate}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
  };

  // Clear confirmation modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', tone: 'info', phase: 'enter' });
  const showToast = (message, tone='info', duration=2500) => {
    setToast({ visible: true, message, tone, phase: 'enter' });
    window.setTimeout(() => setToast(prev => ({ ...prev, phase: 'show' })), 20);
    window.setTimeout(() => setToast(prev => ({ ...prev, phase: 'exit' })), Math.max(500, duration - 250));
    window.setTimeout(() => setToast({ visible: false, message: '', tone: 'info', phase: 'enter' }), duration);
  };
  const openClearConfirm = () => setShowConfirm(true);
  const cancelClear = () => { setShowConfirm(false); showToast('Clear cancelled', 'neutral'); };
  const confirmClear = () => {
    // First show animated toast, then clear data when the animation ends
    setShowConfirm(false);
    const delay = 1500; // match toast duration below for consistency
    showToast('All records deleted', 'success', delay);
    window.setTimeout(() => {
      setPrintedItems([]);
      localStorage.removeItem('printedItems');
      localStorage.removeItem('items');
      try { window.dispatchEvent(new StorageEvent('storage', { key: 'items' })); } catch (_) {}
      try { window.location.reload(); } catch (_) {}
    }, delay);
  };

  return (
    <div className='space-y-4'>
      {/* Bill Summary (all items combined) */}
      {items.length > 0 && (() => {
        const { subtotal, tax, total } = calculateSummary(items);
        return (
          <div className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
            <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-3'>
              <h2 className='text-lg font-semibold'>Bill Summary</h2>
              <button
                onClick={() => printFullBill(items)}
                className='w-full md:w-auto px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200'
              >
                🧾 Print Full Bill
              </button>
            </div>
            <div className='grid grid-cols-1 gap-3'>
              <div className='p-3 rounded-lg bg-slate-50 border border-slate-200'>
                <p className='text-xs text-slate-500'>Total</p>
                <p className='text-base font-semibold'>{formatINR(subtotal)}</p>
              </div>
            </div>
          </div>
        );
      })()}
      {/* Excel Export Section */}
      <div className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
        <h2 className='text-lg font-semibold mb-3'>Export Management</h2>
        <div className='space-y-3'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <span className='text-sm text-gray-600'>
              Printed Items: <strong>{printedItems.length}</strong>
            </span>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full sm:w-auto'>
              <button 
                onClick={exportToExcel}
                className='w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md'
                disabled={printedItems.length === 0}
              >
                📊 Export to Excel
              </button>
              <button 
                onClick={openClearConfirm}
                className='w-full px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md'
                disabled={printedItems.length === 0}
              >
                🗑️ Clear Records
              </button>
            </div>
          </div>
          {printedItems.length > 0 && (
            <div className='text-xs text-gray-500'>
              Last printed: {new Date(printedItems[printedItems.length - 1]?.printedAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Confirm Clear Modal */}
      {showConfirm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'>
          <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-5 sm:p-6'>
            <h3 className='text-lg font-semibold mb-3'>Clear all records?</h3>
            <p className='text-sm text-slate-600 mb-6 leading-relaxed'>This will remove printed records and current items from your browser storage. This action cannot be undone.</p>
            <div className='flex flex-col sm:flex-row gap-3 sm:justify-end'>
              <button 
                onClick={cancelClear} 
                className='w-full sm:w-auto px-4 py-3 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 min-h-[44px] touch-manipulation font-semibold shadow-sm hover:shadow-md transition-all duration-200'
              >
                Cancel
              </button>
              <button 
                onClick={confirmClear} 
                className='w-full sm:w-auto px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 min-h-[44px] touch-manipulation font-semibold shadow-md hover:shadow-lg transition-all duration-200'
              >
                Yes, clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast with animation */}
      {toast.visible && (
        <div aria-live='polite' aria-atomic='true' className='fixed bottom-4 right-4 z-50'>
          <div className={`relative px-4 py-2 rounded-lg shadow-lg text-white transition-all duration-300 ${toast.phase === 'enter' ? 'opacity-0 translate-y-3 scale-95' : ''} ${toast.phase === 'show' ? 'opacity-100 translate-y-0 scale-100' : ''} ${toast.phase === 'exit' ? 'opacity-0 translate-y-2' : ''} ${toast.tone === 'success' ? 'bg-emerald-600' : toast.tone === 'neutral' ? 'bg-slate-700' : 'bg-indigo-600'}`}>
            <span className='mr-2'>
              {toast.tone === 'success' ? '✅' : toast.tone === 'neutral' ? 'ℹ️' : '✨'}
            </span>
            {toast.message}
            <div className='toast-bar'></div>
          </div>
          <style>{`
            .toast-bar{position:absolute;left:0;bottom:0;height:3px;background:rgba(255,255,255,.7);animation:toastbar 2.5s linear forwards}
            @keyframes toastbar{from{width:100%}to{width:0}}
          `}</style>
        </div>
      )}

      {/* Pagination Controls */}
      <div className='flex items-center justify-between gap-2 sm:gap-3'>
        <button
          className='flex-1 sm:flex-none px-4 py-3 sm:py-2.5 rounded-lg bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation text-sm font-semibold hover:bg-slate-300 shadow-sm transition-all duration-200'
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
        >
          ← Prev
        </button>
        <span className='text-sm text-slate-600 text-center flex-1 px-2 font-medium'>Page {currentPage} of {totalPages}</span>
        <button
          className='flex-1 sm:flex-none px-4 py-3 sm:py-2.5 rounded-lg bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation text-sm font-semibold hover:bg-slate-300 shadow-sm transition-all duration-200'
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
        >
          Next →
        </button>
      </div>

      {/* Items List (latest first, 6 per page) */}
      <div className='max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 pt-4 pb-4'>
        <div className='space-y-4'>
          {(() => {
            const reversed = [...items].reverse();
            const start = (currentPage - 1) * pageSize;
            const pageSlice = reversed.slice(start, start + pageSize);
            return pageSlice.map((ele, i) => {
          // Map back to original index for actions like print
          const globalIndexFromReversed = start + i; // index in reversed array
          const originalIndex = items.length - 1 - globalIndexFromReversed;
          const total = calculateItemTotal(ele.qty, ele.price, ele.discount);
          const subTotal = total; // GST removed
          return (
            <div key={`card-${originalIndex}`} id={`item-${originalIndex}`} className='bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow'>
              {/* Card Header */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2'>
                <h2 className='text-lg font-semibold truncate'>Bill No: {originalIndex + 1}</h2>
                <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100 self-start sm:self-auto'>
                  Paid: <span className='font-semibold'>{formatINR(subTotal)}</span>
                </span>
              </div>
              {/* Card Body */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-200'>
                    <span className='text-slate-500 text-sm'>Name</span>
                    <span className='text-slate-800 text-sm font-medium truncate max-w-[120px]' title={ele.name}>{ele.name}</span>
                  </div>
                  <div className='flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-200'>
                    <span className='text-slate-500 text-sm'>Price</span>
                    <span className='text-slate-800 text-sm font-medium'>{formatINR(ele.price)}</span>
                  </div>
                  <div className='flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-200'>
                    <span className='text-slate-500 text-sm'>Discount</span>
                    <span className='text-slate-800 text-sm font-medium'>{ele.discount}%</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-200'>
                    <span className='text-slate-500 text-sm'>Quantity</span>
                    <span className='text-slate-800 text-sm font-medium'>{ele.qty}</span>
                  </div>
                  <div className='flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-200'>
                    <span className='text-slate-500 text-sm'>Amount</span>
                    <span className='text-slate-800 text-sm font-semibold'>{formatINR(subTotal)}</span>
                  </div>
                </div>
              </div>
              {/* Card Footer */}
              <div className='mt-4 flex justify-end'>
                <button 
                  className='inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg text-sm font-semibold min-h-[44px] touch-manipulation transition-all duration-200'
                  onClick={() => handlePrintAndTrack(originalIndex, items)}
                >
                  <span role='img' aria-label='print'>🖨️</span> Print Bill
                </button>
              </div>
            </div>
          );
        });
        })()}
        </div>
      </div>
    </div>
  )
}
export default Summary

// Opens a minimal new window and prints only the selected item's HTML
const printSingleBill=(index, items)=>{
    const printWindow = window.open('', 'print', 'height=700,width=900');
    if(!printWindow) return;
    printWindow.document.write("<html><head><title>Invoice Bill</title>");
    printWindow.document.write(`<link rel=\"stylesheet\" href=\"${printCssUrl}\" />`);
    printWindow.document.write("</head><body>");
    
    // Currency formatter for invoice with Indian grouping and no decimals (e.g., ₹ 30,798)
    // Returns inline HTML with spans to keep symbol and amount perfectly aligned in one line
    const inr2 = (n) => {
      const num = parseFloat(n) || 0;
      const full = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
      return `<span class=\"currency\"><span class=\"rs\">₹</span><span class=\"amt\">${full}</span></span>`;
    };
    
    // Create a properly formatted print layout
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    // Process only the selected item data
    const selectedItem = items[index];
    const total = calculateItemTotal(selectedItem.qty, selectedItem.price, selectedItem.discount); // no GST
    const subtotal = total;
    
    const itemData = [{
        name: selectedItem.name,
        qty: parseFloat(selectedItem.qty) || 0,
        price: parseFloat(selectedItem.price) || 0,
        discount: parseFloat(selectedItem.discount) || 0,
        total: total
    }];
    
    // Calculate totals
    const grandTotal = itemData.reduce((sum, item) => sum + item.total, 0);
    
    printWindow.document.write(`
        <div class="print-content">
            <div class="print-header">
                <h1 class="print-title">INVOICE BILL</h1>
                <p class="print-date">${currentDate}, ${currentTime}</p>
            </div>
            
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Discount (%)</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemData.map((item, index) => `
                        <tr>
                            <td class="text-center">${index + 1}</td>
                            <td>${item.name}</td>
                            <td class="text-right">${item.qty}</td>
                            <td class="text-right">${inr2(item.price)}</td>
                            <td class="text-right">${item.discount}%</td>
                            <td class="text-right">${inr2(item.total)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="total-section">
                <table class="total-table">
                    <tr class="final-total">
                        <td class="total-label">Total Amount:</td>
                        <td class="total-value">${inr2(grandTotal)}</td>
                    </tr>
                </table>
            </div>
            
            <div class="print-footer">
                <p>Thank you for your business!</p>
            </div>
        </div>
    `);
    
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { try { printWindow.print(); } catch (_) {} }, 250);
}

// Prints a full invoice containing all items in the current bill
const printFullBill = (items) => {
    if (!items || items.length === 0) return;
    const printWindow = window.open('', 'print', 'height=900,width=1100');
    if(!printWindow) return;
    printWindow.document.write("<html><head><title>Invoice - Full Bill</title>");
    printWindow.document.write(`<link rel=\"stylesheet\" href=\"${printCssUrl}\" />`);
    printWindow.document.write("</head><body>");

    const { subtotal, tax, total } = calculateSummary(items);

    printWindow.document.write(`
      <div class="header">
        <div class="title">INVOICE - FULL BILL</div>
        <div style="color:#6b7280; font-size:12px;">${new Date().toLocaleString()}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount (%)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((it, idx) => {
            const t = calculateItemTotal(it.qty, it.price, it.discount); // no GST
            return `
              <tr>
                <td class="right">${idx + 1}</td>
                <td>${it.name}</td>
                <td class="right">${(parseFloat(it.qty)||0)}</td>
                <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(parseFloat(it.price)||0)}</td>
                <td class="right">${(parseFloat(it.discount)||0)}</td>
                <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(t)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <table class="totals">
        <tr><td>Subtotal</td><td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(subtotal)}</td></tr>
        <tr class="final"><td>Total Amount</td><td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(subtotal)}</td></tr>
      </table>
    `);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { try { printWindow.print(); } catch (_) {} }, 250);
}