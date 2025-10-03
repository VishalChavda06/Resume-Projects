import React from 'react'
import InvoiceTable from '../components/InvoiceTable'
import ItemForm from '../components/ItemForm'
import Summary from '../components/Summary'
import { useState, useEffect } from 'react';
const InvoicePage = () => {

  //add item logic 
  const [items, setItems] = useState([]);
  const addItem=(item)=>{
    setItems([...items, item]);
  }

  //local storage
  useEffect(()=>{
    const savedItems = localStorage.getItem('items');
    if(savedItems){
      try {
        const parsedItems = JSON.parse(savedItems);
        setItems(parsedItems);
      } catch (error) {
        console.error('Error parsing saved items:', error);
      }
    }
  },[])
  
  useEffect(()=>{
    if(items.length > 0){
      localStorage.setItem('items', JSON.stringify(items));
    }
  },[items])
  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>Invoice Billing</h1>
      <div className='grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 items-start'>
        <div className='space-y-5'>
          <div className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
            <h2 className='text-lg font-semibold mb-3'>Items</h2>
            <InvoiceTable items={items} />
          </div>
          <div className='bg-white border border-slate-200 rounded-xl p-4 shadow-sm'>
            <h2 className='text-lg font-semibold mb-3'>Add Item</h2>
            <ItemForm addItem={addItem} />
          </div>
        </div>
        <div className='lg:sticky lg:top-6'>
          <Summary items={items} />
        </div>
      </div>
    </div>
  )
}

export default InvoicePage