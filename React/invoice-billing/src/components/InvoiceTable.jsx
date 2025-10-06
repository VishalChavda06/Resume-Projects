import React from 'react'
import { calculateItemTotal } from '../Utils/Cal'
// Display helpers
const round = (n) => Math.round(parseFloat(n) || 0);
const inr = (n) => `₹ ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(round(n))}`;
const InvoiceTable = ({items}) => {
  return (
    <div className='overflow-auto'>
        <table className='w-full border-collapse rounded-xl overflow-hidden'>
            <thead>
                <tr className='bg-slate-50 text-slate-600'>
                    <th className='text-left font-semibold text-sm p-3 border-b border-slate-200'>Name</th>
                    <th className='text-left font-semibold text-sm p-3 border-b border-slate-200'>Quantity</th>
                    <th className='text-left font-semibold text-sm p-3 border-b border-slate-200'>Price</th>
                    <th className='text-left font-semibold text-sm p-3 border-b border-slate-200'>Discount</th>
                    <th className='text-left font-semibold text-sm p-3 border-b border-slate-200'>Amount</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index)=>{
                    const subtotal = calculateItemTotal(item.qty, item.price, item.discount);
                    const total = subtotal; // GST removed
                    return (
                    <tr key={index} className='odd:bg-white even:bg-slate-50/50 hover:bg-slate-50'>
                        <td className='p-3 border-b border-slate-200 text-sm'>{item.name}</td>
                        <td className='p-3 border-b border-slate-200 text-sm'>{round(item.qty)}</td>
                        <td className='p-3 border-b border-slate-200 text-sm'>{inr(item.price)}</td>
                        <td className='p-3 border-b border-slate-200 text-sm'>{round(item.discount)}%</td>
                        <td className='p-3 border-b border-slate-200 text-sm'>{inr(total)}</td>
                    </tr>
                )})}
            </tbody>
        </table>
    </div>
  )
}

export default InvoiceTable