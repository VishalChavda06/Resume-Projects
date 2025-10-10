import React, { useState, useEffect } from 'react'
import ItemForm from '../components/ItemForm'
import Summary from '../components/Summary'
import Button from '../components/ui/Button'
import { Dialog, DialogHeader, DialogFooter } from '../components/ui/Dialog'
import BillCard from '../components/BillCard'
import CreateBillModal from '../components/CreateBillModal'
import ViewBillModal from '../components/ViewBillModal'
import MonthlyExportModal from '../components/MonthlyExportModal'
import printCssUrl from '../print.css?url'
import { calculateSummary } from '../Utils/Cal'
import * as XLSX from 'xlsx'
import { useToast } from '../contexts/ToastContext'
import useIndexedDB from '../hooks/useIndexedDB'

const InvoicePage = () => {
  const { showSuccess, showError, showInfo, showWarning } = useToast();
  
  // IndexedDB hook
  const {
    isInitialized,
    isLoading,
    error,
    migrationStatus,
    performMigration,
    getCatalogItems,
    addCatalogItem,
    updateCatalogItem,
    deleteCatalogItem,
    getBills,
    addBill,
    updateBill,
    deleteBill,
    clearAllBills,
    getPrintedBills,
    addPrintedBill,
    clearPrintedBills,
    getSetting,
    setSetting,
    getStats,
    exportData,
    clearAllData
  } = useIndexedDB();

  // Local state
  const [catalogItems, setCatalogItems] = useState([]);
  const [bills, setBills] = useState([]);
  const [currentBillIndex, setCurrentBillIndex] = useState(0);
  const [showCreateBill, setShowCreateBill] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showViewBill, setShowViewBill] = useState(false);
  const [selectedBillIndex, setSelectedBillIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBillDisplayNumber, setSelectedBillDisplayNumber] = useState(0);
  const [printedBills, setPrintedBills] = useState([]);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [showClearBillsModal, setShowClearBillsModal] = useState(false);
  const [showMigrationModal, setShowMigrationModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Data loading functions
  const loadCatalogItems = async () => {
    try {
      const items = await getCatalogItems();
      setCatalogItems(items);
    } catch (error) {
      console.error('Failed to load catalog items:', error);
      showError('Failed to load catalog items');
    }
  };

  const loadBills = async () => {
    try {
      const billsData = await getBills();
      // Ensure we always have at least one empty bill for the UI
      if (billsData.length === 0) {
        setBills([{ id: null, billNumber: 1, items: [], totalAmount: 0, createdAt: new Date().toISOString() }]);
      } else {
        setBills(billsData);
      }
    } catch (error) {
      console.error('Failed to load bills:', error);
      showError('Failed to load bills');
    }
  };

  const loadPrintedBills = async () => {
    try {
      const printedData = await getPrintedBills();
      setPrintedBills(printedData);
    } catch (error) {
      console.error('Failed to load printed bills:', error);
      showError('Failed to load printed bills');
    }
  };

  // Recalculate printed bills totals to fix GST issues
  const recalculatePrintedBills = async () => {
    try {
      const printed = await getPrintedBills();
      let needsUpdate = false;
      
      for (const printedBill of printed) {
        // Check if this printed bill has GST but totalAmount doesn't include it
        if (printedBill.includeGST && printedBill.subtotal && printedBill.gstAmount) {
          const correctTotal = printedBill.subtotal + printedBill.gstAmount;
          if (Math.abs(printedBill.totalAmount - correctTotal) > 0.01) {
            // Update the printed bill with correct total
            await addPrintedBill({
              ...printedBill,
              totalAmount: correctTotal
            });
            needsUpdate = true;
          }
        }
      }
      
      if (needsUpdate) {
        await loadPrintedBills();
        showSuccess('Printed bills totals updated successfully!');
      }
    } catch (error) {
      console.error('Failed to recalculate printed bills:', error);
    }
  };

  const loadCurrentBillIndex = async () => {
    try {
      const index = await getSetting('currentBillIndex');
      if (index !== null) {
        setCurrentBillIndex(index);
      }
    } catch (error) {
      console.error('Failed to load current bill index:', error);
    }
  };

  // Add to catalog
  const addItem = async (item) => {
    try {
      await addCatalogItem(item);
      await loadCatalogItems();
      showSuccess(`Item "${item.name}" added to catalog successfully!`);
    } catch (error) {
      showError(`Failed to add item: ${error.message}`);
    }
  }


  //edit item logic
  const editItem = async (index, updatedItem) => {
    try {
      const currentBill = bills[currentBillIndex];
      if (currentBill && currentBill.id) {
        const updatedItems = [...currentBill.items];
        updatedItems[index] = updatedItem;
        await updateBill(currentBill.id, { ...currentBill, items: updatedItems });
        await loadBills();
        showSuccess(`Item "${updatedItem.name}" updated successfully!`);
      }
    } catch (error) {
      showError(`Failed to update item: ${error.message}`);
    }
  };

  //delete item logic
  const deleteItem = async (index) => {
    try {
      const currentBill = bills[currentBillIndex];
      if (currentBill && currentBill.id) {
        const itemToDelete = currentBill.items[index];
        const updatedItems = currentBill.items.filter((_, i) => i !== index);
        await updateBill(currentBill.id, { ...currentBill, items: updatedItems });
        await loadBills();
        if (itemToDelete) {
          showSuccess(`Item "${itemToDelete.name}" removed from bill!`);
        }
      }
    } catch (error) {
      showError(`Failed to delete item: ${error.message}`);
    }
  };


  const addNewBill = async () => {
    try {
      // Check if we have an empty bill to reuse
      const hasEmptyBill = bills.length === 1 && (bills[0]?.items?.length || 0) === 0;
      
      if (!hasEmptyBill) {
        // Create new empty bill
        await addBill({
          billNumber: bills.length + 1,
          items: [],
          createdAt: new Date().toISOString()
        });
        await loadBills();
        // Fetch updated bills to get the correct new index
        const updatedBills = await getBills();
        const newIdx = Math.max(0, updatedBills.length - 1);
        setCurrentBillIndex(newIdx);
        await setSetting('currentBillIndex', newIdx);
      } else {
        // Reuse existing empty bill
        setCurrentBillIndex(0);
        await setSetting('currentBillIndex', 0);
      }
    } catch (error) {
      showError(`Failed to create new bill: ${error.message}`);
    }
  };

  // Calculate bill total
  const calculateBillTotal = (billItems, bill = null) => {
    // If bill has GST, calculate as subtotal + gstAmount
    if (bill && bill.includeGST && typeof bill.subtotal === 'number' && typeof bill.gstAmount === 'number') {
      return bill.subtotal + bill.gstAmount;
    }
    
    // If bill has pre-calculated totalAmount and no GST, use it
    if (bill && typeof bill.totalAmount === 'number' && !bill.includeGST) {
      return bill.totalAmount;
    }
    
    // Fallback to calculating from items
    if (!Array.isArray(billItems)) {
      return 0;
    }
    return billItems.reduce((sum, item) => sum + (item.qty * item.price * (1 - (item.discount || 0) / 100)), 0);
  };

  // Handle view bill
  const handleViewBill = (billIndex) => {
    setSelectedBillIndex(billIndex);
    // compute display position among non-empty bills
    const pos = bills
      .map((bill, idx) => ({ bill, idx }))
      .filter(entry => (entry.bill?.items?.length || 0) > 0)
      .findIndex(entry => entry.idx === billIndex);
    setSelectedBillDisplayNumber(pos >= 0 ? pos + 1 : billIndex + 1);
    setShowViewBill(true);
  };

  // Track printed bills
  const trackPrintedBill = async (billIndex, billItems) => {
    try {
      const currentBill = bills[billIndex];
      // Use the correct total amount from the bill (includes GST if applicable)
      const billTotal = calculateBillTotal(billItems, currentBill);
      
      const printedBill = {
        billNumber: billIndex + 1,
        items: billItems,
        totalAmount: billTotal,
        includeGST: currentBill?.includeGST || false,
        gstRate: currentBill?.gstRate || 0,
        subtotal: currentBill?.subtotal || 0,
        gstAmount: currentBill?.gstAmount || 0,
        printedAt: new Date().toISOString(),
        itemCount: billItems.length,
        printCount: 1
      };
      
      await addPrintedBill(printedBill);
      await loadPrintedBills();
    } catch (error) {
      console.error('Failed to track printed bill:', error);
      showError('Failed to track printed bill');
    }
  };

  // Handle print bill
  const handlePrintBill = async (billIndex) => {
    const currentBill = bills[billIndex];
    const billItems = currentBill?.items || [];
    if (billItems.length === 0) {
      showWarning('No items in this bill to print!');
      return;
    }
    
    // Track the printed bill
    await trackPrintedBill(billIndex, billItems);
    
    // Use the existing print functionality from Summary component
    const printWindow = window.open('', 'print', 'height=900,width=1100');
    if (!printWindow) {
      showError('Unable to open print window. Please check your browser settings.');
      return;
    }
    
    printWindow.document.write("<html><head><title>Invoice Bill</title>");
    printWindow.document.write(`<link rel="stylesheet" href="${printCssUrl}" />`);
    printWindow.document.write("</head><body>");

    // Calculate totals
    const subtotal = billItems.reduce((sum, item) => {
      return sum + (item.qty * item.price * (1 - (item.discount || 0) / 100));
    }, 0);
    
    const includeGST = currentBill?.includeGST || false;
    const gstRate = currentBill?.gstRate || 18;
    const gstAmount = includeGST ? subtotal * (gstRate / 100) : 0;
    const totalAmount = subtotal + gstAmount;

    // Build table headers based on GST inclusion
    const tableHeaders = includeGST 
      ? `<th>#</th><th>Name</th><th>Quantity</th><th>Price</th><th>Discount (%)</th><th>Subtotal</th><th>GST (${gstRate}%)</th><th>Total</th>`
      : `<th>#</th><th>Name</th><th>Quantity</th><th>Price</th><th>Discount (%)</th><th>Total</th>`;

    printWindow.document.write(`
      <div class="header">
        <div class="title">INVOICE BILL #${billIndex + 1}</div>
        <div style="color:#6b7280; font-size:12px;">${new Date().toLocaleString()}</div>
      </div>
      <table>
        <thead>
          <tr>
            ${tableHeaders}
          </tr>
        </thead>
        <tbody>
          ${billItems.map((item, idx) => {
            const itemSubtotal = item.qty * item.price * (1 - (item.discount || 0) / 100);
            const itemGST = includeGST ? itemSubtotal * (gstRate / 100) : 0;
            const itemTotal = itemSubtotal + itemGST;
            
            if (includeGST) {
              return `
                <tr>
                  <td class="right">${idx + 1}</td>
                  <td>${item.name}</td>
                  <td class="right">${item.qty}</td>
                  <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(item.price)}</td>
                  <td class="right">${item.discount || 0}</td>
                  <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(itemSubtotal)}</td>
                  <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(itemGST)}</td>
                  <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(itemTotal)}</td>
                </tr>
              `;
            } else {
              return `
                <tr>
                  <td class="right">${idx + 1}</td>
                  <td>${item.name}</td>
                  <td class="right">${item.qty}</td>
                  <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(item.price)}</td>
                  <td class="right">${item.discount || 0}</td>
                  <td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(itemSubtotal)}</td>
                </tr>
              `;
            }
          }).join('')}
        </tbody>
      </table>
      <table class="totals">
        <tr><td>Subtotal</td><td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(subtotal)}</td></tr>
        ${includeGST ? `<tr><td>GST (${gstRate}%)</td><td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(gstAmount)}</td></tr>` : ''}
        <tr class="final"><td>Total Amount</td><td class="right">${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(totalAmount)}</td></tr>
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
  const clearPrintedBillsHandler = async () => {
    if (window.confirm('Are you sure you want to clear all printed bill records?')) {
      try {
        await clearPrintedBills();
        await loadPrintedBills();
        showSuccess('Printed bill records cleared successfully!');
      } catch (error) {
        showError(`Failed to clear printed bills: ${error.message}`);
      }
    }
  };

  // Clear only bills (keep catalog items)
  const clearAllBillsHandler = async () => {
    try {
      await clearAllBills();
      await clearPrintedBills();
      await loadBills();
      await loadPrintedBills();
      setCurrentBillIndex(0);
      await setSetting('currentBillIndex', 0);
      setShowClearBillsModal(false);
      showSuccess('All bills cleared. Catalog items preserved.');
    } catch (error) {
      showError(`Failed to clear bills: ${error.message}`);
    }
  };

  // Clear all application records (catalog, bills, indices, printed bills)
  const clearAllRecordsHandler = async () => {
    try {
      await clearAllData();
      await loadCatalogItems();
      await loadBills();
      await loadPrintedBills();
      setCurrentBillIndex(0);
      await setSetting('currentBillIndex', 0);
      setShowClearAllModal(false);
      showSuccess('All records cleared. You are starting fresh.');
    } catch (error) {
      showError(`Failed to clear all data: ${error.message}`);
    }
  };

  // Dashboard metrics (ignore empty bills for counts and listings)
  const billEntries = (Array.isArray(bills) ? bills : [])
    .map((bill, index) => ({ index, bill }))
    .filter(entry => (entry.bill?.items?.length || 0) > 0);
  const totalBills = billEntries.length;
  const totalAmount = bills.reduce((sum, bill) => {
    // For bills with GST, use subtotal + gstAmount
    if (bill.includeGST && typeof bill.subtotal === 'number' && typeof bill.gstAmount === 'number') {
      return sum + (bill.subtotal + bill.gstAmount);
    }
    // For bills without GST, use totalAmount or calculate from items
    if (typeof bill.totalAmount === 'number') {
      return sum + bill.totalAmount;
    }
    // Fallback: calculate from items
    if (bill.items && Array.isArray(bill.items)) {
      const itemTotal = bill.items.reduce((itemSum, item) => {
        return itemSum + (item.qty * item.price * (1 - (item.discount || 0) / 100));
      }, 0);
      return sum + itemTotal;
    }
    return sum;
  }, 0);

  // Load data from IndexedDB when initialized
  useEffect(() => {
    if (!isInitialized) return;
    
    const loadAllData = async () => {
      try {
        await Promise.all([
          loadCatalogItems(),
          loadBills(),
          loadPrintedBills(),
          loadCurrentBillIndex()
        ]);
        // Recalculate printed bills to fix any GST calculation issues
        await recalculatePrintedBills();
      } catch (error) {
        console.error('Failed to load data:', error);
        showError('Failed to load data from database');
      }
    };

    loadAllData();
  }, [isInitialized]);

  // Show migration modal if needed
  useEffect(() => {
    if (isInitialized && migrationStatus?.isNeeded && !migrationStatus?.isCompleted) {
      setShowMigrationModal(true);
    }
  }, [isInitialized, migrationStatus]);

  // Debug function for browser console
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.debugInvoiceBilling = {
        getBills: () => getBills(),
        getCatalogItems: () => getCatalogItems(),
        getPrintedBills: () => getPrintedBills(),
        getStats: () => getStats(),
        clearAllData: () => clearAllData(),
        loadAllData: async () => {
          await loadCatalogItems();
          await loadBills();
          await loadPrintedBills();
          console.log('All data loaded');
        },
        testDataStructure: async () => {
          try {
            const bills = await getBills();
            const catalogItems = await getCatalogItems();
            const printedBills = await getPrintedBills();
            console.log('Data structure test:', {
              bills: bills.length,
              catalogItems: catalogItems.length,
              printedBills: printedBills.length,
              billsStructure: bills.map(bill => ({
                hasItems: Array.isArray(bill.items),
                hasTotalAmount: typeof bill.totalAmount === 'number',
                hasBillNumber: !!bill.billNumber
              }))
            });
            return { success: true, message: 'Data structure validated' };
          } catch (error) {
            console.error('Data structure test failed:', error);
            return { success: false, error: error.message };
          }
        }
      };
    }
  }, [isInitialized]);

  // Show loading state
  if (isLoading) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
          <p className='text-slate-600'>Initializing database...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto p-6'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-xl font-semibold text-slate-900 mb-2'>Database Error</h2>
          <p className='text-slate-600 mb-4'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                      printedBills.reduce((sum, bill) => {
                        // For printed bills, use the stored totalAmount (which should be correct)
                        return sum + (bill.totalAmount || 0);
                      }, 0)
                    )}
                  </p>
                </div>
              </div>
              
              {/* Export Buttons */}
              <div className='space-y-2'>
                <button
                  onClick={() => setShowExportModal(true)}
                  className='w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2'
                >
                  <span>📊</span>
                  Monthly Export
                </button>
                <button
                  onClick={exportPrintedBillsToExcel}
                  disabled={printedBills.length === 0}
                  className='w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2'
                >
                  <span>📋</span>
                  Quick Export
                </button>
              </div>
              
              {/* Clear Buttons */}
              <div className='space-y-2 mt-2'>
                <button
                  onClick={clearPrintedBillsHandler}
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
                          totalAmount={calculateBillTotal(bill.items || [], bill)}
                          itemCount={bill.items?.length || 0}
                          onView={() => handleViewBill(index)}
                          onPrint={() => handlePrintBill(index)}
                          includeGST={bill.includeGST || false}
                          gstRate={bill.gstRate || 0}
                          subtotal={bill.subtotal || 0}
                          gstAmount={bill.gstAmount || 0}
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
                            <p className='text-sm text-slate-500'>{bill.items?.length || 0} items</p>
                          </div>
                          <div className='flex items-center gap-4'>
                            <div className='text-right'>
                              <p className='font-semibold text-slate-900'>
                                ₹ {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(calculateBillTotal(bill.items || [], bill))}
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
                  onClick={clearAllBillsHandler}
                  className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold'
                >
                  Yes, clear bills
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Migration Modal */}
        {showMigrationModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-md p-6'>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>Database Migration Required</h3>
              <p className='text-sm text-slate-600 mb-4'>We found existing data in localStorage that needs to be migrated to the new IndexedDB system for better performance and storage capacity.</p>
              <div className='bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-lg p-3 mb-4'>
                💡 This is a one-time process. Your data will be safely migrated and backed up.
              </div>
              <div className='flex flex-col sm:flex-row gap-3 sm:justify-end'>
                <button
                  onClick={() => setShowMigrationModal(false)}
                  className='px-4 py-2 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 font-semibold'
                >
                  Skip for now
                </button>
                <button
                  onClick={async () => {
                    try {
                      await performMigration();
                      setShowMigrationModal(false);
                      showSuccess('Migration completed successfully!');
                    } catch (error) {
                      showError(`Migration failed: ${error.message}`);
                    }
                  }}
                  className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold'
                >
                  Start Migration
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
                  onClick={clearAllRecordsHandler}
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
          onAddItems={async (items, includeGST = false, gstRate = 18) => {
            try {
              // Calculate totals with GST
              const subtotal = items.reduce((sum, item) => {
                const itemTotal = item.qty * item.price * (1 - (item.discount || 0) / 100);
                return sum + itemTotal;
              }, 0);
              
              const gstAmount = includeGST ? subtotal * (gstRate / 100) : 0;
              const totalAmount = subtotal + gstAmount;
              
              // Always create a bill record in DB, then set index from DB
              await addBill({
                billNumber: (bills[bills.length - 1]?.billNumber || bills.length) + 1,
                items,
                includeGST,
                gstRate,
                subtotal,
                gstAmount,
                totalAmount,
                createdAt: new Date().toISOString()
              });
              await loadBills();
              const updatedBills = await getBills();
              const newIdx = Math.max(0, updatedBills.length - 1);
              setCurrentBillIndex(newIdx);
              await setSetting('currentBillIndex', newIdx);
              
              setShowCreateBill(false);
              showSuccess(`New bill created with ${items.length} items!`);
            } catch (error) {
              showError(`Failed to create bill: ${error.message}`);
            }
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
          bill={selectedBillIndex !== null ? bills[selectedBillIndex] : null}
          billNumber={selectedBillDisplayNumber}
          onEditItem={editItem}
          onDeleteItem={deleteItem}
          onPrint={() => selectedBillIndex !== null && handlePrintBill(selectedBillIndex)}
          onUpdateGST={async (includeGST, gstRate) => {
            if (selectedBillIndex !== null) {
              try {
                const currentBill = bills[selectedBillIndex];
                const subtotal = currentBill.items.reduce((sum, item) => {
                  const itemTotal = item.qty * item.price * (1 - (item.discount || 0) / 100);
                  return sum + itemTotal;
                }, 0);
                const gstAmount = includeGST ? subtotal * (gstRate / 100) : 0;
                const totalAmount = subtotal + gstAmount;
                
                await updateBill(currentBill.id, {
                  ...currentBill,
                  includeGST,
                  gstRate,
                  subtotal,
                  gstAmount,
                  totalAmount
                });
                await loadBills();
                showSuccess('GST settings updated successfully!');
              } catch (error) {
                showError(`Failed to update GST: ${error.message}`);
              }
            }
          }}
        />

        {/* Monthly Export Modal */}
        <MonthlyExportModal
          open={showExportModal}
          onClose={() => setShowExportModal(false)}
        />
      </div>
    </div>
  )
}

export default InvoicePage