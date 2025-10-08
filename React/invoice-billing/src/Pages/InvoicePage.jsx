import React, { useState, useEffect } from 'react'
import ItemForm from '../components/ItemForm'
import Summary from '../components/Summary'
import Button from '../components/ui/Button'
import { Dialog, DialogHeader, DialogFooter } from '../components/ui/Dialog'
import BillCard from '../components/BillCard'
import CreateBillModal from '../components/CreateBillModal'
import ViewBillModal from '../components/ViewBillModal'
import printCssUrl from '../print.css?url'
import { calculateSummary } from '../Utils/Cal'
import * as XLSX from 'xlsx'
import { useToast } from '../contexts/ToastContext'

const InvoicePage = () => {
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  // Catalog items (name + price only)
  const [catalogItems, setCatalogItems] = useState([]);
  // Bills: array of bill arrays (each bill holds its items)
  const [bills, setBills] = useState([]);
  const [currentBillIndex, setCurrentBillIndex] = useState(0);
  const [showCreateBill, setShowCreateBill] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showViewBill, setShowViewBill] = useState(false);
  const [selectedBillIndex, setSelectedBillIndex] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBillDisplayNumber, setSelectedBillDisplayNumber] = useState(0);
  const [printedBills, setPrintedBills] = useState([]);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [showClearBillsModal, setShowClearBillsModal] = useState(false);

  // Add to catalog
  const addItem=(item)=>{
    setCatalogItems(prevItems => [...prevItems, item]);
    showSuccess(`Item "${item.name}" added to catalog successfully!`);
  }


  //edit item logic
  const editItem = (index, updatedItem) => {
    setBills(prev => {
      const all = [...prev];
      const cur = [...all[currentBillIndex]];
      cur[index] = updatedItem;
      all[currentBillIndex] = cur;
      return all;
    });
    showSuccess(`Item "${updatedItem.name}" updated successfully!`);
  };

  //delete item logic
  const deleteItem = (index) => {
    const itemToDelete = bills[currentBillIndex]?.[index];
    setBills(prev => {
      const all = [...prev];
      const cur = all[currentBillIndex].filter((_, i) => i !== index);
      all[currentBillIndex] = cur;
      return all;
    });
    if (itemToDelete) {
      showSuccess(`Item "${itemToDelete.name}" removed from bill!`);
    }
  };


  const addNewBill = () => {
    setBills(prev => {
      // if there is exactly one empty bill, replace it instead of adding another
      if (prev.length === 1 && (prev[0]?.length || 0) === 0) {
        return [[]];
      }
      return [...prev, []];
    });
    setCurrentBillIndex(i => {
      // if starting from 0 with an empty bill, stay at 0
      if (bills.length === 1 && (bills[0]?.length || 0) === 0) return 0;
      return i + 1;
    });
  };

  // Calculate bill total
  const calculateBillTotal = (billItems) => {
    return billItems.reduce((sum, item) => sum + (item.qty * item.price * (1 - (item.discount || 0) / 100)), 0);
  };

  // Handle view bill
  const handleViewBill = (billIndex) => {
    setSelectedBillIndex(billIndex);
    // compute display position among non-empty bills
    const pos = bills
      .map((bill, idx) => ({ bill, idx }))
      .filter(entry => (entry.bill?.length || 0) > 0)
      .findIndex(entry => entry.idx === billIndex);
    setSelectedBillDisplayNumber(pos >= 0 ? pos + 1 : billIndex + 1);
    setShowViewBill(true);
  };

  // Track printed bills
  const trackPrintedBill = (billIndex, billItems) => {
    const billTotal = calculateBillTotal(billItems);
    const printedBill = {
      billNumber: billIndex + 1,
      items: billItems,
      totalAmount: billTotal,
      printedAt: new Date().toISOString(),
      itemCount: billItems.length
    };
    
    setPrintedBills(prev => {
      const updated = [...prev];
      const existingIndex = updated.findIndex(bill => bill.billNumber === printedBill.billNumber);
      
      if (existingIndex !== -1) {
        // Update existing bill
        updated[existingIndex] = { ...printedBill, printCount: (updated[existingIndex].printCount || 1) + 1 };
      } else {
        // Add new bill
        updated.push({ ...printedBill, printCount: 1 });
      }
      
      return updated;
    });
  };

  // Handle print bill
  const handlePrintBill = (billIndex) => {
    const billItems = bills[billIndex] || [];
    if (billItems.length === 0) {
      showWarning('No items in this bill to print!');
      return;
    }
    
    // Track the printed bill
    trackPrintedBill(billIndex, billItems);
    
    // Use the existing print functionality from Summary component
    const printWindow = window.open('', 'print', 'height=900,width=1100');
    if (!printWindow) {
      showError('Unable to open print window. Please check your browser settings.');
      return;
    }
    
    printWindow.document.write("<html><head><title>Invoice Bill</title>");
    printWindow.document.write(`<link rel="stylesheet" href="${printCssUrl}" />`);
    printWindow.document.write("</head><body>");

    const { subtotal } = calculateSummary(billItems);

    printWindow.document.write(`
      <div class="header">
        <div class="title">INVOICE BILL #${billIndex + 1}</div>
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
          ${billItems.map((item, idx) => {
            const total = item.qty * item.price * (1 - (item.discount || 0) / 100);
            return `
              <tr>
                <td class="right">${idx + 1}</td>
                <td>${item.name}</td>
                <td class="right">${item.qty}</td>
                <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(item.price)}</td>
                <td class="right">${item.discount || 0}</td>
                <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(total)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <table class="totals">
        <tr class="final"><td>Total Amount</td><td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(subtotal)}</td></tr>
      </table>
    `);
    
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { try { printWindow.print(); } catch (_) {} }, 250);
    
    showSuccess(`Bill #${billIndex + 1} sent to printer successfully!`);
  };

  // Export printed bills to Excel
  const exportPrintedBillsToExcel = () => {
    if (printedBills.length === 0) {
      showWarning('No printed bills to export! Please print some bills first.');
      return;
    }

    // Prepare data for Excel
    const excelData = printedBills.map(bill => ({
      'Bill Number': bill.billNumber,
      'Printed Date': new Date(bill.printedAt).toLocaleDateString(),
      'Printed Time': new Date(bill.printedAt).toLocaleTimeString(),
      'Item Count': bill.itemCount,
      'Total Amount': bill.totalAmount,
      'Print Count': bill.printCount || 1,
      'Items': bill.items.map(item => `${item.name} (Qty: ${item.qty}, Price: ₹${item.price})`).join('; ')
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 12 }, // Bill Number
      { wch: 12 }, // Printed Date
      { wch: 12 }, // Printed Time
      { wch: 10 }, // Item Count
      { wch: 15 }, // Total Amount
      { wch: 10 }, // Print Count
      { wch: 50 }  // Items
    ];
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Printed Bills');

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `Printed_Bills_${currentDate}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
    showSuccess(`Excel file "${filename}" downloaded successfully!`);
  };

  // Clear printed bills
  const clearPrintedBills = () => {
    if (window.confirm('Are you sure you want to clear all printed bill records?')) {
      setPrintedBills([]);
      showSuccess('Printed bill records cleared successfully!');
    }
  };

  // Clear only bills (keep catalog items)
  const clearAllBills = () => {
    try {
      // Clear only bills and printed bills from localStorage
      localStorage.removeItem('bills');
      localStorage.removeItem('currentBillIndex');
      localStorage.removeItem('printedBills');
    } catch (_) {}
    // Reset bills state but keep catalog
    setBills([[]]);
    setCurrentBillIndex(0);
    setPrintedBills([]);
    setShowClearBillsModal(false);
    showSuccess('All bills cleared. Catalog items preserved.');
  };

  // Clear all application records (catalog, bills, indices, printed bills)
  const clearAllRecords = () => {
    try {
      // Clear localStorage for the app (safer to clear all for this app)
      localStorage.clear();
    } catch (_) {}
    // Reset in-memory state
    setCatalogItems([]);
    setBills([[]]);
    setCurrentBillIndex(0);
    setPrintedBills([]);
    setShowClearAllModal(false);
    showSuccess('All records cleared. You are starting fresh.');
  };

  // Dashboard metrics (ignore empty bills for counts and listings)
  const billEntries = bills
    .map((bill, index) => ({ index, bill }))
    .filter(entry => Array.isArray(entry.bill) && entry.bill.length > 0);
  const totalBills = billEntries.length;
  const totalAmount = bills.reduce((sum, bill) => sum + bill.reduce((s, it) => s + (it.qty * it.price * (1 - (it.discount||0)/100)), 0), 0);

  //local storage - load (only run once on mount)
  useEffect(()=>{
    if (isInitialized) return; // Prevent multiple loads
    
    const savedCatalog = localStorage.getItem('catalogitems');
    const savedBills = localStorage.getItem('bills');
    const savedBillIndex = localStorage.getItem('currentBillIndex');
    const savedPrintedBills = localStorage.getItem('printedBills');
    
    if(savedCatalog){
      try {
        const parsedCatalog = JSON.parse(savedCatalog);
        setCatalogItems(parsedCatalog);
      } catch (error) {
        console.error('Error parsing saved catalog items:', error);
      }
    }
    if(savedBills){
      try {
        const parsedBills = JSON.parse(savedBills);
        if (Array.isArray(parsedBills)) {
          // Ensure we always have at least one bill
          const billsToSet = parsedBills.length > 0 ? parsedBills : [[]];
          setBills(billsToSet);
        }
      } catch (error) {
        console.error('Error parsing saved bills:', error);
        setBills([[]]);
      }
    } else {
      // Initialize with empty bill if no data in localStorage
      setBills([[]]);
    }
    if (savedBillIndex !== null) {
      const idx = Number(savedBillIndex);
      if (!Number.isNaN(idx)) {
        setCurrentBillIndex(idx);
      }
    }
    if(savedPrintedBills){
      try {
        const parsedPrintedBills = JSON.parse(savedPrintedBills);
        if (Array.isArray(parsedPrintedBills)) {
          setPrintedBills(parsedPrintedBills);
        }
      } catch (error) {
        console.error('Error parsing saved printed bills:', error);
        setPrintedBills([]);
      }
    }
    
    setIsInitialized(true);
  },[isInitialized])
  
  useEffect(()=>{
    if (!isInitialized) return; // Don't save during initial load
    localStorage.setItem('catalogitems', JSON.stringify(catalogItems));
  },[catalogItems, isInitialized])

  useEffect(()=>{
    if (!isInitialized) return; // Don't save during initial load
    localStorage.setItem('bills', JSON.stringify(bills));
  },[bills, isInitialized])

  useEffect(()=>{
    if (!isInitialized) return; // Don't save during initial load
    localStorage.setItem('currentBillIndex', String(currentBillIndex));
  },[currentBillIndex, isInitialized])

  useEffect(()=>{
    if (!isInitialized) return; // Don't save during initial load
    localStorage.setItem('printedBills', JSON.stringify(printedBills));
  },[printedBills, isInitialized])

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-7xl mx-auto p-6'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-900'>Invoice Billing</h1>
          <button
            onClick={() => setShowCreateBill(true)}
            className='px-4 sm:px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto'
          >
            <span className='text-lg'>+</span>
            Create New Bill
          </button>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-4 gap-6'>
          {/* Sidebar */}
          <aside className='xl:col-span-1 space-y-6'>
            {/* Navigation */}
            <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-900 mb-4'>Navigation</h3>
              <div className='space-y-2'>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={() => setShowCreateItem(true)}
                  className='w-full text-left px-4 py-3 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors'
                >
                  📦 Create Item
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === 'history' 
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  📋 Invoice History
                </button>
              </div>
            </div>

            {/* Export Management */}
            <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-900 mb-4'>Export Management</h3>
              
              {/* Printed Bills Statistics */}
              <div className='space-y-3 mb-4'>
                <div className='text-center p-3 bg-slate-50 rounded-lg'>
                  <p className='text-sm text-slate-500'>Printed Bills</p>
                  <p className='text-xl font-bold text-slate-900'>{printedBills.length}</p>
                </div>
                <div className='text-center p-3 bg-slate-50 rounded-lg'>
                  <p className='text-sm text-slate-500'>Total Amount</p>
                  <p className='text-lg font-bold text-slate-900'>
                    ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(
                      printedBills.reduce((sum, bill) => sum + bill.totalAmount, 0)
                    )}
                  </p>
                </div>
              </div>
              
              {/* Export Button */}
              <button
                onClick={exportPrintedBillsToExcel}
                disabled={printedBills.length === 0}
                className='w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2'
              >
                <span>📊</span>
                Export Excel File
              </button>
              
              {/* Clear Buttons */}
              <div className='space-y-2 mt-2'>
                <button
                  onClick={clearPrintedBills}
                  className='w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium text-sm transition-colors flex items-center justify-center gap-2'
                >
                  <span>📋</span>
                  Clear Printed History
                </button>
                <button
                  onClick={() => setShowClearBillsModal(true)}
                  className='w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-colors flex items-center justify-center gap-2'
                >
                  <span>🗑️</span>
                  Clear All Bills
                </button>
                <button
                  onClick={() => setShowClearAllModal(true)}
                  className='w-full px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 font-medium text-sm transition-colors flex items-center justify-center gap-2'
                >
                  <span>⚠️</span>
                  Reset Everything
                </button>
              </div>
              
              {printedBills.length > 0 && (
                <div className='mt-3 text-xs text-slate-500 text-center'>
                  Last printed: {new Date(printedBills[printedBills.length - 1]?.printedAt).toLocaleString()}
                </div>
              )}
            </div>

          </aside>

          {/* Main Content */}
          <main className='xl:col-span-3'>
            {activeTab === 'dashboard' && (
              <div className='space-y-6'>
                {/* Summary Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm font-medium text-slate-500'>Total Bills</p>
                        <p className='text-3xl font-bold text-slate-900 mt-1'>{totalBills}</p>
                      </div>
                      <div className='w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center'>
                        <span className='text-2xl'>📄</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm font-medium text-slate-500'>Total Amount</p>
                        <p className='text-3xl font-bold text-slate-900 mt-1'>
                          ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(totalAmount)}
                        </p>
                      </div>
                      <div className='w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center'>
                        <span className='text-2xl'>💰</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm font-medium text-slate-500'>Catalog Items</p>
                        <p className='text-3xl font-bold text-slate-900 mt-1'>{catalogItems.length}</p>
                      </div>
                      <div className='w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center'>
                        <span className='text-2xl'>📦</span>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Bills Grid */}
                <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
                  <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-xl font-semibold text-slate-900'>Recent Bills</h2>
                    <span className='text-sm text-slate-500'>{totalBills} bills total</span>
                  </div>
                  
                  {totalBills > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                      {billEntries.map(({ bill, index }, displayIdx) => (
                        <BillCard
                          key={index}
                          billNumber={displayIdx + 1}
                          totalAmount={calculateBillTotal(bill)}
                          itemCount={bill.length}
                          onView={() => handleViewBill(index)}
                          onPrint={() => handlePrintBill(index)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='text-center py-12'>
                      <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <span className='text-2xl text-slate-400'>📄</span>
                      </div>
                      <h3 className='text-lg font-medium text-slate-900 mb-2'>No bills yet</h3>
                      <p className='text-slate-500 mb-6'>Create your first bill to get started</p>
                      <button
                        onClick={() => setShowCreateBill(true)}
                        className='px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors'
                      >
                        Create First Bill
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
                <h2 className='text-xl font-semibold text-slate-900 mb-6'>Invoice History</h2>
                {totalBills > 0 ? (
                  <div className='space-y-4'>
                    {billEntries.map(({ bill, index }, displayIdx) => (
                      <div key={index} className='border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors'>
                        <div className='flex items-center justify-between'>
                          <div>
                            <h3 className='font-semibold text-slate-900'>Bill #{displayIdx + 1}</h3>
                            <p className='text-sm text-slate-500'>{bill.length} items</p>
                          </div>
                          <div className='flex items-center gap-4'>
                            <div className='text-right'>
                              <p className='font-semibold text-slate-900'>
                                ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(calculateBillTotal(bill))}
                              </p>
                            </div>
                            <div className='flex gap-2'>
                              <button
                                onClick={() => handleViewBill(index)}
                                className='px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors'
                              >
                                View
                              </button>
                              <button
                                onClick={() => handlePrintBill(index)}
                                className='px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors'
                              >
                                Print
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-12'>
                    <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                      <span className='text-2xl text-slate-400'>📋</span>
                    </div>
                    <h3 className='text-lg font-medium text-slate-900 mb-2'>No invoice history</h3>
                    <p className='text-slate-500'>Your completed bills will appear here</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
        {/* Clear Bills Modal */}
        {showClearBillsModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-md p-6'>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>Clear all bills?</h3>
              <p className='text-sm text-slate-600 mb-4'>This will remove all bills and printed history, but keep your catalog items safe. This action cannot be undone.</p>
              <div className='bg-green-50 border border-green-200 text-green-800 text-xs rounded-lg p-3 mb-4'>
                ✅ Your catalog items will be preserved and can be used to create new bills.
              </div>
              <div className='flex flex-col sm:flex-row gap-3 sm:justify-end'>
                <button
                  onClick={() => setShowClearBillsModal(false)}
                  className='px-4 py-2 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 font-semibold'
                >
                  Cancel
                </button>
                <button
                  onClick={clearAllBills}
                  className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold'
                >
                  Yes, clear bills
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clear All Records Modal */}
        {showClearAllModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-md p-6'>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>Reset everything?</h3>
              <p className='text-sm text-slate-600 mb-4'>This will remove ALL data including catalog items, bills, and printed history. This action cannot be undone.</p>
              <div className='bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg p-3 mb-4'>
                ⚠️ This will delete your catalog items permanently. Consider using "Clear All Bills" instead to keep your catalog.
              </div>
              <div className='flex flex-col sm:flex-row gap-3 sm:justify-end'>
                <button
                  onClick={() => setShowClearAllModal(false)}
                  className='px-4 py-2 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 font-semibold'
                >
                  Cancel
                </button>
                <button
                  onClick={clearAllRecords}
                  className='px-4 py-2 rounded-lg bg-red-800 text-white hover:bg-red-900 font-semibold'
                >
                  Yes, reset everything
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Create Bill Modal */}
        <CreateBillModal
          open={showCreateBill}
          onClose={() => setShowCreateBill(false)}
          catalogItems={catalogItems}
          onAddItems={(items) => {
            // If we only have a single empty bill, put items into it; otherwise create new
            setBills(prev => {
              const all = [...prev];
              if (all.length === 1 && (all[0]?.length || 0) === 0) {
                all[0] = items;
                setCurrentBillIndex(0);
                return all;
              }
              all.push(items);
              setCurrentBillIndex(all.length - 1);
              return all;
            });
            setShowCreateBill(false);
            showSuccess(`New bill created with ${items.length} items!`);
          }}
        />

        {/* Create Item Modal */}
        <Dialog open={showCreateItem} onClose={() => setShowCreateItem(false)}>
          <DialogHeader>Create Catalog Item</DialogHeader>
          <ItemForm addItem={(item) => { addItem(item); setShowCreateItem(false); }} />
          <DialogFooter>
            <Button variant='outline' onClick={() => setShowCreateItem(false)}>Cancel</Button>
          </DialogFooter>
        </Dialog>

        {/* View Bill Modal */}
        <ViewBillModal
          open={showViewBill}
          onClose={() => setShowViewBill(false)}
          bill={selectedBillIndex !== null ? bills[selectedBillIndex] : []}
          billNumber={selectedBillDisplayNumber}
          onEditItem={editItem}
          onDeleteItem={deleteItem}
          onPrint={() => selectedBillIndex !== null && handlePrintBill(selectedBillIndex)}
        />
      </div>
    </div>
  )
}

export default InvoicePage