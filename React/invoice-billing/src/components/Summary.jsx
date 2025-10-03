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
                  <button className='px-3.5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700' onClick={()=> printSingleBill(index)}>Print Bill</button>
                </div>
            </div>
        )

     })}
    </div>
  )
}
export default Summary

// Opens a minimal new window and prints only the selected item's HTML
const printSingleBill=(index)=>{
    const elem = document.getElementById(`item-${index}`);
    if(!elem) return;
    const content = elem.innerHTML;
    const printWindow = window.open('', 'print', 'height=700,width=900');
    if(!printWindow) return;
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write('<style>body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:24px;} h1,h2{margin:0 0 12px;} p{margin:4px 0;} hr{margin:16px 0;border:none;border-top:1px solid #e2e8f0;} .summary-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 16px;}</style>');
    printWindow.document.write("</head><body onload='window.print()'>");
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
}