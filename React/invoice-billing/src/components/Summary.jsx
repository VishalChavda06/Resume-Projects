import React from 'react'
import { calculateItemTotal } from '../Utils/Cal'

const Summary = ({items}) => {
  return (
    <div className='space-y-4'>
     {items.map((ele,index)=>{
        const total = calculateItemTotal(ele.qty, ele.price, ele.discount);
        const tax = total * 0.18;
        const subTotal = total + tax;
        return (
            <div key={index} id={`item-${index}`} className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
                <h2 className='text-lg font-semibold mb-3'>Item {index + 1}</h2>
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
                  <button className='px-3.5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700' onClick={()=> printSingleBill(index, items)}>Print Bill</button>
                </div>
            </div>
        )

     })}
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