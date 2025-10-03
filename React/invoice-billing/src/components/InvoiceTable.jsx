import React from 'react'
import { calculateItemTotal } from '../Utils/Cal'
const InvoiceTable = ({items}) => {
  return (
    <div className='overflow-auto'>
        <table className='w-full border-collapse'>
            <thead>
                <tr className='bg-slate-50'>
                    <th className='text-left font-semibold text-sm text-slate-600 p-2.5 border-b border-slate-200'>Name</th>
                    <th className='text-left font-semibold text-sm text-slate-600 p-2.5 border-b border-slate-200'>Quantity</th>
                    <th className='text-left font-semibold text-sm text-slate-600 p-2.5 border-b border-slate-200'>Price</th>
                    <th className='text-left font-semibold text-sm text-slate-600 p-2.5 border-b border-slate-200'>Discount</th>
                    <th className='text-left font-semibold text-sm text-slate-600 p-2.5 border-b border-slate-200'>Subtotal</th>
                    <th className='text-left font-semibold text-sm text-slate-600 p-2.5 border-b border-slate-200'>Total</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index)=>(
                    <tr key={index} className='hover:bg-slate-50'>
                        <td className='p-2.5 border-b border-slate-200 text-sm'>{item.name}</td>
                        <td className='p-2.5 border-b border-slate-200 text-sm'>{item.qty}</td>
                        <td className='p-2.5 border-b border-slate-200 text-sm'>{item.price}</td>
                        <td className='p-2.5 border-b border-slate-200 text-sm'>{item.discount}</td>
                        <td className='p-2.5 border-b border-slate-200 text-sm'>{calculateItemTotal(item.qty, item.price, item.discount)}</td>
                        <td className='p-2.5 border-b border-slate-200 text-sm'>{calculateItemTotal(item.qty, item.price, item.discount)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default InvoiceTable