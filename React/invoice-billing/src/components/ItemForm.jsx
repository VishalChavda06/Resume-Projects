import React from 'react'
import { useState } from 'react';

const ItemForm = ({addItem}) => {

    const [name , setName] = useState('');
    const [price , setPrice] = useState('');
    const [quantity , setQuantity] = useState('');
    const [discount , setDiscount] = useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        const newItem ={
            name,
            qty:Number(quantity),
            price:Number(price),
            discount:Number(discount)
        }
        addItem(newItem);
        
            // Reset form fields after successful submission
        setName('');
        setPrice('');
        setQuantity('');
        setDiscount('');
    }


  return (
    <>
    <form onSubmit={handleSubmit} className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <label className='space-y-1.5 text-sm'>
            <span>Item Name</span>
            <input type="text" placeholder='Item Name' className='w-full h-9 px-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' value={name} onChange={(e)=>setName(e.target.value)} />
          </label>
          <label className='space-y-1.5 text-sm'>
            <span>Item Price</span>
            <input type="number" placeholder='Item Price' className='w-full h-9 px-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' value={price} onChange={(e)=>setPrice(e.target.value)} />
          </label>
          <label className='space-y-1.5 text-sm'>
            <span>Quantity</span>
            <input type="number" placeholder='Item Quantity' className='w-full h-9 px-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
          </label>
          <label className='space-y-1.5 text-sm'>
            <span>Discount (%)</span>
            <input type="number" placeholder='Item Discount' className='w-full h-9 px-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' value={discount} onChange={(e)=>setDiscount(e.target.value)} />
          </label>
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='px-3.5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'>Add Item</button>
        </div>
    </form>
    </>
  )
}

export default ItemForm