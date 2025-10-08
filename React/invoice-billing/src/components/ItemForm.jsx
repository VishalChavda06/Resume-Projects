import React from 'react'
import { useState } from 'react';

const ItemForm = ({addItem}) => {

    const [name , setName] = useState('');
    const [price , setPrice] = useState('');
    // Catalog mode: only name and price
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        // Validate name
        if (!name.trim()) {
            newErrors.name = 'Item name is required';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Item name must be at least 2 characters';
        }
        
        // Validate price
        if (!price || price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }
        
        // No quantity/discount at catalog creation time
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit =(e)=>{
        e.preventDefault();
        
        // Clear previous errors
        setErrors({});
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        const newItem = { name: name.trim(), price: Number(price) };
        
        addItem(newItem);
        
        // Reset form fields after successful submission
        setName('');
        setPrice('');
        // qty/discount not used here
        setErrors({});
    }


  return (
    <>
    <form onSubmit={handleSubmit} className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <label className='space-y-1.5 text-sm'>
            <span>Item Name *</span>
            <input 
              type="text" 
              placeholder='Item Name' 
              className={`w-full h-9 px-2.5 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              value={name} 
              onChange={(e)=>setName(e.target.value)} 
            />
            {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
          </label>
          <label className='space-y-1.5 text-sm'>
            <span>Item Price *</span>
            <input 
              type="number" 
              placeholder='Item Price' 
              min="0"
              step="0.01"
              className={`w-full h-9 px-2.5 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.price 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              value={price} 
              onChange={(e)=>setPrice(e.target.value)} 
            />
            {errors.price && <p className='text-red-500 text-xs'>{errors.price}</p>}
          </label>
          {/* Quantity and Discount are chosen when adding to bill */}
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='px-3.5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'>Add Item</button>
        </div>
    </form>
    </>
  )
}

export default ItemForm