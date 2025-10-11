// Print utility functions for invoice bills

export const printCSS = `
  body { 
    font-family: Arial, sans-serif; 
    margin: 20px; 
    color: #333; 
    background: white;
  }
  .header { 
    text-align: center; 
    margin-bottom: 30px; 
    border-bottom: 2px solid #3b82f6; 
    padding-bottom: 15px; 
  }
  .title { 
    font-size: 24px; 
    font-weight: bold; 
    color: #1e40af; 
    margin-bottom: 5px; 
  }
  table { 
    width: 100%; 
    border-collapse: collapse; 
    margin-bottom: 20px; 
  }
  th { 
    background-color: #f8fafc; 
    color: #374151; 
    padding: 12px 8px; 
    text-align: left; 
    border: 1px solid #e5e7eb; 
    font-weight: 600; 
  }
  td { 
    padding: 10px 8px; 
    border: 1px solid #e5e7eb; 
  }
  .right { 
    text-align: right; 
  }
  .totals { 
    width: 300px; 
    margin-left: auto; 
    margin-top: 20px; 
  }
  .totals td { 
    padding: 8px 12px; 
    border: 1px solid #e5e7eb; 
  }
  .final { 
    background-color: #1e40af; 
    color: white; 
    font-weight: bold; 
  }
  .final td { 
    border: 1px solid #1e40af; 
  }
  @media print {
    body { margin: 0; }
    .header { page-break-after: avoid; }
    table { page-break-inside: avoid; }
  }
`;

export const generatePrintHTML = (billData) => {
  const { billItems, currentBill, billIndex } = billData;
  
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

  return `
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
  `;
};

export const printBill = (billData, onSuccess, onError, onComplete) => {
  const { billItems, currentBill, billIndex } = billData;
  
  if (billItems.length === 0) {
    onError('No items in this bill to print!');
    return;
  }
  
  // Create print window with better compatibility
  const printWindow = window.open('', '_blank', 'height=900,width=1100,scrollbars=yes,resizable=yes');
  if (!printWindow) {
    onError('Unable to open print window. Please allow popups for this site and try again.');
    return;
  }
  
  printWindow.document.write("<html><head><title>Invoice Bill</title>");
  printWindow.document.write(`<style>${printCSS}</style>`);
  printWindow.document.write("</head><body>");
  printWindow.document.write(generatePrintHTML(billData));
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  
  // Focus and print after a short delay
  printWindow.focus();
  setTimeout(() => {
    try {
      printWindow.print();
      onSuccess(`Bill #${billIndex + 1} sent to printer successfully!`);
    } catch (error) {
      console.error('Print error:', error);
      onError('Failed to print. Please try again or use Ctrl+P to print manually.');
    }
    
    // Call completion callback
    if (onComplete) {
      onComplete();
    }
  }, 200);
};
