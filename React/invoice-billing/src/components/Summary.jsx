import React, { useState, useEffect } from 'react'
import { calculateItemTotal, calculateSummary } from '../Utils/Cal'
import * as XLSX from 'xlsx'

const Summary = ({items}) => {
  // State to track printed items
  const [printedItems, setPrintedItems] = useState([]);
  // Pagination state (latest-first)
  const pageSize = 3;
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
    const tax = total * 0.18;
    const subTotal = total + tax;
    
    const printedItem = {
      ...itemToPrint,
      total: total,
      tax: tax,
      subTotal: subTotal,
      printedAt: new Date().toISOString(),
      invoiceNumber: `INV-${Date.now()}-${index + 1}`
    };
    
    setPrintedItems(prev => [...prev, printedItem]);
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
      'Total': item.total.toFixed(2),
      'Tax (18%)': item.tax.toFixed(2),
      'Subtotal': item.subTotal.toFixed(2)
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
      { wch: 12 }, // Total
      { wch: 12 }, // Tax
      { wch: 12 }  // Subtotal
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

  // Function to clear printed items
  const clearPrintedItems = () => {
    if (window.confirm('Are you sure you want to clear all printed items? This action cannot be undone.')) {
      setPrintedItems([]);
      localStorage.removeItem('printedItems');
    }
  };

  return (
    <div className='space-y-4'>
      {/* Bill Summary (all items combined) */}
      {items.length > 0 && (() => {
        const { subtotal, tax, total } = calculateSummary(items);
        return (
          <div className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
            <div className='flex items-center justify-between mb-3'>
              <h2 className='text-lg font-semibold'>Bill Summary</h2>
              <button
                onClick={() => printFullBill(items)}
                className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium'
              >
                🧾 Print Full Bill
              </button>
            </div>
            <div className='grid grid-cols-3 gap-3'>
              <div className='p-3 rounded-lg bg-slate-50 border border-slate-200'>
                <p className='text-xs text-slate-500'>Subtotal</p>
                <p className='text-base font-semibold'>{subtotal.toFixed(2)}</p>
              </div>
              <div className='p-3 rounded-lg bg-slate-50 border border-slate-200'>
                <p className='text-xs text-slate-500'>Tax (18%)</p>
                <p className='text-base font-semibold'>{tax.toFixed(2)}</p>
              </div>
              <div className='p-3 rounded-lg bg-slate-50 border border-slate-200'>
                <p className='text-xs text-slate-500'>Grand Total</p>
                <p className='text-base font-semibold'>{total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        );
      })()}
      {/* Excel Export Section */}
      <div className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
        <h2 className='text-lg font-semibold mb-3'>Export Management</h2>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-600'>
              Printed Items: <strong>{printedItems.length}</strong>
            </span>
            <div className='space-x-2'>
              <button 
                onClick={exportToExcel}
                className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium'
                disabled={printedItems.length === 0}
              >
                📊 Export to Excel
              </button>
              <button 
                onClick={clearPrintedItems}
                className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium'
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

      {/* Pagination Controls */}
      <div className='flex items-center justify-between'>
        <button
          className='px-3 py-1.5 rounded-md bg-slate-100 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
        >
          ← Prev
        </button>
        <span className='text-sm text-slate-600'>Page {currentPage} of {totalPages}</span>
        <button
          className='px-3 py-1.5 rounded-md bg-slate-100 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
        >
          Next →
        </button>
      </div>

      {/* Items List (latest first, 3 per page) */}
      {(() => {
        const reversed = [...items].reverse();
        const start = (currentPage - 1) * pageSize;
        const pageSlice = reversed.slice(start, start + pageSize);
        return pageSlice.map((ele, i) => {
          // Map back to original index for actions like print
          const globalIndexFromReversed = start + i; // index in reversed array
          const originalIndex = items.length - 1 - globalIndexFromReversed;
          const total = calculateItemTotal(ele.qty, ele.price, ele.discount);
          const tax = total * 0.18;
          const subTotal = total + tax;
          return (
            <div key={`card-${originalIndex}`} id={`item-${originalIndex}`} className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
              <h2 className='text-lg font-semibold mb-3'>Item {originalIndex + 1}</h2>
              <div className='grid grid-cols-2 gap-x-4 gap-y-1.5'>
                <p className='text-sm'><strong>Name:</strong> {ele.name}</p>
                <p className='text-sm'><strong>Quantity:</strong> {ele.qty}</p>
                <p className='text-sm'><strong>Price:</strong> {ele.price}</p>
                <p className='text-sm'><strong>Discount:</strong> {ele.discount}</p>
                <p className='text-sm'><strong>Total:</strong> {total}</p>
                <p className='text-sm'><strong>Tax:</strong> {tax}</p>
                <p className='text-sm'><strong>SubTotal:</strong> {subTotal}</p>
              </div>
              <div className='mt-2.5 flex justify-end'>
                <button 
                  className='px-3.5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700' 
                  onClick={() => handlePrintAndTrack(originalIndex, items)}
                >
                  Print Bill
                </button>
              </div>
            </div>
          );
        });
      })()}
    </div>
  )
}
export default Summary

// Opens a minimal new window and prints only the selected item's HTML
const printSingleBill=(index, items)=>{
    const printWindow = window.open('', 'print', 'height=700,width=900');
    if(!printWindow) return;
    printWindow.document.write("<html><head><title>Invoice Bill</title>");
    printWindow.document.write(`
        <style>
            @media print {
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: white;
                    color: #000;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .print-header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #2563eb;
                    padding-bottom: 15px;
                }
                
                .print-title {
                    font-size: 24px;
                    font-weight: bold;
                    color: #1e40af;
                    margin: 0 0 5px 0;
                }
                
                .print-date {
                    font-size: 12px;
                    color: #6b7280;
                    margin: 0;
                }
                
                .print-content {
                    max-width: 700px;
                    margin: 0 auto;
                }
                
                .invoice-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    border: 1px solid #e5e7eb;
                }
                
                .invoice-table th {
                    background-color: #f8fafc;
                    color: #374151;
                    font-weight: 600;
                    padding: 12px 8px;
                    text-align: left;
                    border: 1px solid #e5e7eb;
                    font-size: 13px;
                }
                
                .invoice-table td {
                    padding: 10px 8px;
                    border: 1px solid #e5e7eb;
                    vertical-align: top;
                }
                
                .invoice-table .text-right {
                    text-align: right;
                    font-family: 'Courier New', monospace;
                }
                
                .invoice-table .text-center {
                    text-align: center;
                }
                
                .total-section {
                    margin-top: 30px;
                    margin-left: auto;
                    width: 300px;
                }
                
                .total-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .total-table td {
                    padding: 8px 12px;
                    border: 1px solid #e5e7eb;
                }
                
                .total-table .total-label {
                    background-color: #f8fafc;
                    font-weight: 600;
                    color: #374151;
                }
                
                .total-table .total-value {
                    text-align: right;
                    font-family: 'Courier New', monospace;
                    font-weight: 600;
                }
                
                .total-table .final-total {
                    background-color: #1e40af;
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                }
                
                .total-table .final-total .total-value {
                    color: white;
                }
                
                .print-footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 12px;
                    color: #6b7280;
                    border-top: 1px solid #e5e7eb;
                    padding-top: 15px;
                }
                
                .print-button {
                    display: none;
                }
            }
            
            @media screen {
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    padding: 20px;
                    background: #f8fafc;
                }
                
                .print-content {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    max-width: 700px;
                    margin: 0 auto;
                }
                
                .print-header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #2563eb;
                    padding-bottom: 15px;
                }
                
                .print-title {
                    font-size: 24px;
                    font-weight: bold;
                    color: #1e40af;
                    margin: 0 0 5px 0;
                }
                
                .print-date {
                    font-size: 12px;
                    color: #6b7280;
                    margin: 0;
                }
                
                .invoice-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    border: 1px solid #e5e7eb;
                }
                
                .invoice-table th {
                    background-color: #f8fafc;
                    color: #374151;
                    font-weight: 600;
                    padding: 12px 8px;
                    text-align: left;
                    border: 1px solid #e5e7eb;
                    font-size: 13px;
                }
                
                .invoice-table td {
                    padding: 10px 8px;
                    border: 1px solid #e5e7eb;
                    vertical-align: top;
                }
                
                .invoice-table .text-right {
                    text-align: right;
                    font-family: 'Courier New', monospace;
                }
                
                .invoice-table .text-center {
                    text-align: center;
                }
                
                .total-section {
                    margin-top: 30px;
                    margin-left: auto;
                    width: 300px;
                }
                
                .total-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .total-table td {
                    padding: 8px 12px;
                    border: 1px solid #e5e7eb;
                }
                
                .total-table .total-label {
                    background-color: #f8fafc;
                    font-weight: 600;
                    color: #374151;
                }
                
                .total-table .total-value {
                    text-align: right;
                    font-family: 'Courier New', monospace;
                    font-weight: 600;
                }
                
                .total-table .final-total {
                    background-color: #1e40af;
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                }
                
                .total-table .final-total .total-value {
                    color: white;
                }
                
                .print-footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 12px;
                    color: #6b7280;
                    border-top: 1px solid #e5e7eb;
                    padding-top: 15px;
                }
                
                .print-button {
                    display: inline-block;
                    background: #2563eb;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    margin-top: 20px;
                }
                
                .print-button:hover {
                    background: #1d4ed8;
                }
            }
        </style>
    `);
    printWindow.document.write("</head><body onload='window.print()'>");
    
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
    const total = calculateItemTotal(selectedItem.qty, selectedItem.price, selectedItem.discount);
    const tax = total * 0.18;
    const subtotal = total + tax;
    
    const itemData = [{
        name: selectedItem.name,
        qty: parseFloat(selectedItem.qty) || 0,
        price: parseFloat(selectedItem.price) || 0,
        discount: parseFloat(selectedItem.discount) || 0,
        total: total,
        tax: tax,
        subtotal: subtotal
    }];
    
    // Calculate totals
    const grandTotal = itemData.reduce((sum, item) => sum + item.subtotal, 0);
    const grandTax = itemData.reduce((sum, item) => sum + item.tax, 0);
    const grandSubtotal = itemData.reduce((sum, item) => sum + item.total, 0);
    
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
                        <th>Total</th>
                        <th>Tax</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemData.map((item, index) => `
                        <tr>
                            <td class="text-center">${index + 1}</td>
                            <td>${item.name}</td>
                            <td class="text-right">${item.qty}</td>
                            <td class="text-right">${item.price.toFixed(2)}</td>
                            <td class="text-right">${item.discount}%</td>
                            <td class="text-right">${item.total.toFixed(2)}</td>
                            <td class="text-right">${item.tax.toFixed(2)}</td>
                            <td class="text-right">${item.subtotal.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="total-section">
                <table class="total-table">
                    <tr>
                        <td class="total-label">Subtotal:</td>
                        <td class="total-value">${grandSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td class="total-label">Tax (18%):</td>
                        <td class="total-value">${grandTax.toFixed(2)}</td>
                    </tr>
                    <tr class="final-total">
                        <td class="total-label">Total Amount:</td>
                        <td class="total-value">${grandTotal.toFixed(2)}</td>
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
}

// Prints a full invoice containing all items in the current bill
const printFullBill = (items) => {
    if (!items || items.length === 0) return;
    const printWindow = window.open('', 'print', 'height=900,width=1100');
    if(!printWindow) return;
    printWindow.document.write("<html><head><title>Invoice - Full Bill</title>");
    printWindow.document.write(`
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; }
            .header { text-align:center; margin-bottom: 16px; }
            .title { font-size: 22px; font-weight: 700; color: #1e40af; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #e5e7eb; padding: 8px; font-size: 13px; }
            th { background:#f8fafc; text-align: left; }
            .right { text-align:right; font-family:'Courier New', monospace; }
            .totals { margin-top: 20px; width: 360px; margin-left: auto; }
            .totals td { border: 1px solid #e5e7eb; padding: 8px; }
            .final { background:#1e40af; color:#fff; font-weight:700; }
        </style>
    `);
    printWindow.document.write("</head><body onload='window.print()'>");

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
            const t = calculateItemTotal(it.qty, it.price, it.discount);
            return `
              <tr>
                <td class="right">${idx + 1}</td>
                <td>${it.name}</td>
                <td class="right">${(parseFloat(it.qty)||0)}</td>
                <td class="right">${(parseFloat(it.price)||0).toFixed(2)}</td>
                <td class="right">${(parseFloat(it.discount)||0)}</td>
                <td class="right">${t.toFixed(2)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <table class="totals">
        <tr><td>Subtotal</td><td class="right">${subtotal.toFixed(2)}</td></tr>
        <tr><td>Tax (18%)</td><td class="right">${tax.toFixed(2)}</td></tr>
        <tr class="final"><td>Total Amount</td><td class="right">${total.toFixed(2)}</td></tr>
      </table>
    `);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
}