import React from 'react'
import { calculateSummary } from '../Utils/Cal'
import printCssUrl from '../print.css?url'

const Summary = ({items, onClearBill}) => {
  // Helper: round amounts to nearest whole number for display
  const formatAmount = (n) => {
    const num = parseFloat(n);
    if (!Number.isFinite(num)) return 0;
    return Math.round(num);
  };
  
  // Helper: format as Indian Rupees (no decimals as per requirement)
  const formatINR = (n) => `₹ ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(formatAmount(n))}`;

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

      {/* Current Bill Preview (single combined bill) */}
      {items.length > 0 && (
        <div className='bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold'>Current Bill</h2>
            <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100'>
              Total: <span className='font-semibold'>{formatINR(calculateSummary(items).subtotal)}</span>
            </span>
          </div>
          <div className='overflow-x-auto -mx-2 px-2'>
            <table className='w-full border-collapse min-w-[600px]'>
              <thead>
                <tr className='bg-slate-50 text-slate-600'>
                  <th className='text-left font-semibold text-sm p-2 border-b border-slate-200'>Name</th>
                  <th className='text-center font-semibold text-sm p-2 border-b border-slate-200'>Qty</th>
                  <th className='text-left font-semibold text-sm p-2 border-b border-slate-200'>Price</th>
                  <th className='text-center font-semibold text-sm p-2 border-b border-slate-200'>Discount</th>
                  <th className='text-left font-semibold text-sm p-2 border-b border-slate-200'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => {
                  const t = it.qty * it.price * (1 - (it.discount || 0) / 100);
                  return (
                    <tr key={idx} className='odd:bg-white even:bg-slate-50/50'>
                      <td className='p-2 border-b border-slate-200 text-sm'>{it.name}</td>
                      <td className='p-2 border-b border-slate-200 text-sm text-center'>{it.qty}</td>
                      <td className='p-2 border-b border-slate-200 text-sm'>{formatINR(it.price)}</td>
                      <td className='p-2 border-b border-slate-200 text-sm text-center'>{it.discount}%</td>
                      <td className='p-2 border-b border-slate-200 text-sm font-medium'>{formatINR(t)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Summary

// Prints a full invoice containing all items in the current bill
const printFullBill = (items) => {
  if (!items || items.length === 0) return;
  const printWindow = window.open('', 'print', 'height=900,width=1100');
  if(!printWindow) return;
  printWindow.document.write("<html><head><title>Invoice - Full Bill</title>");
  printWindow.document.write(`<link rel="stylesheet" href="${printCssUrl}" />`);
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
          const t = it.qty * it.price * (1 - (it.discount || 0) / 100);
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