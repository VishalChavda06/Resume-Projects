/**
 * Export Service for Monthly Reports and Data Export
 * Leverages IndexedDB's querying capabilities for efficient data export
 */

import * as XLSX from 'xlsx';
import indexedDBService from '../services/IndexedDBService';

class ExportService {
  constructor() {
    this.supportedFormats = ['xlsx', 'csv', 'json'];
  }

  /**
   * Export bills for a specific month
   * @param {number} month - Month (1-12)
   * @param {number} year - Year
   * @param {string} format - Export format ('xlsx', 'csv', 'json')
   * @returns {Promise<Blob>} Exported file blob
   */
  async exportMonthlyBills(month, year, format = 'xlsx') {
    try {
      const bills = await indexedDBService.getBillsByMonth(month, year);
      
      if (bills.length === 0) {
        throw new Error(`No bills found for ${this.getMonthName(month)} ${year}`);
      }

      // Prepare data for export
      const exportData = bills.map(bill => ({
        'Bill Number': bill.billNumber,
        'Created Date': new Date(bill.createdAt).toLocaleDateString('en-IN'),
        'Created Time': new Date(bill.createdAt).toLocaleTimeString('en-IN'),
        'Total Amount': bill.totalAmount,
        'Item Count': bill.items?.length || 0,
        'Items': bill.items?.map(item => 
          `${item.name} (Qty: ${item.qty}, Price: ₹${item.price}, Discount: ${item.discount || 0}%)`
        ).join('; ') || '',
        'Item Details': this.formatItemDetails(bill.items || [])
      }));

      return this.createFile(exportData, `Bills_${this.getMonthName(month)}_${year}`, format);
    } catch (error) {
      console.error('Monthly bills export failed:', error);
      throw error;
    }
  }

  /**
   * Export printed bills for a specific month
   * @param {number} month - Month (1-12)
   * @param {number} year - Year
   * @param {string} format - Export format ('xlsx', 'csv', 'json')
   * @returns {Promise<Blob>} Exported file blob
   */
  async exportMonthlyPrintedBills(month, year, format = 'xlsx') {
    try {
      const printedBills = await indexedDBService.getPrintedBills();
      
      // Filter by month and year
      const monthlyPrintedBills = printedBills.filter(bill => {
        const billDate = new Date(bill.printedAt);
        return billDate.getMonth() + 1 === month && billDate.getFullYear() === year;
      });

      if (monthlyPrintedBills.length === 0) {
        throw new Error(`No printed bills found for ${this.getMonthName(month)} ${year}`);
      }

      // Prepare data for export
      const exportData = monthlyPrintedBills.map(bill => ({
        'Bill Number': bill.billNumber,
        'Printed Date': new Date(bill.printedAt).toLocaleDateString('en-IN'),
        'Printed Time': new Date(bill.printedAt).toLocaleTimeString('en-IN'),
        'Print Count': bill.printCount || 1,
        'Total Amount': bill.totalAmount,
        'Item Count': bill.itemCount,
        'Items': bill.items?.map(item => 
          `${item.name} (Qty: ${item.qty}, Price: ₹${item.price})`
        ).join('; ') || ''
      }));

      return this.createFile(exportData, `Printed_Bills_${this.getMonthName(month)}_${year}`, format);
    } catch (error) {
      console.error('Monthly printed bills export failed:', error);
      throw error;
    }
  }

  /**
   * Export comprehensive monthly report
   * @param {number} month - Month (1-12)
   * @param {number} year - Year
   * @param {string} format - Export format ('xlsx', 'csv', 'json')
   * @returns {Promise<Blob>} Exported file blob
   */
  async exportMonthlyReport(month, year, format = 'xlsx') {
    try {
      const [bills, printedBills, catalogItems] = await Promise.all([
        indexedDBService.getBillsByMonth(month, year),
        indexedDBService.getPrintedBills(),
        indexedDBService.getCatalogItems()
      ]);

      // Filter printed bills by month
      const monthlyPrintedBills = printedBills.filter(bill => {
        const billDate = new Date(bill.printedAt);
        return billDate.getMonth() + 1 === month && billDate.getFullYear() === year;
      });

      // Calculate summary statistics
      const totalBills = bills.length;
      const totalPrintedBills = monthlyPrintedBills.length;
      const totalAmount = bills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0);
      const totalPrintedAmount = monthlyPrintedBills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0);
      const totalItems = bills.reduce((sum, bill) => sum + (bill.items?.length || 0), 0);

      // Create summary sheet
      const summaryData = [
        ['Monthly Report Summary', ''],
        ['Month', this.getMonthName(month)],
        ['Year', year],
        ['Total Bills Created', totalBills],
        ['Total Bills Printed', totalPrintedBills],
        ['Total Amount (All Bills)', `₹${this.formatCurrency(totalAmount)}`],
        ['Total Amount (Printed Bills)', `₹${this.formatCurrency(totalPrintedAmount)}`],
        ['Total Items Sold', totalItems],
        ['Average Bill Amount', `₹${this.formatCurrency(totalBills > 0 ? totalAmount / totalBills : 0)}`],
        ['Print Rate', `${totalBills > 0 ? ((totalPrintedBills / totalBills) * 100).toFixed(1) : 0}%`],
        ['', ''],
        ['Report Generated', new Date().toLocaleString('en-IN')]
      ];

      // Prepare bills data
      const billsData = bills.map(bill => ({
        'Bill Number': bill.billNumber,
        'Created Date': new Date(bill.createdAt).toLocaleDateString('en-IN'),
        'Created Time': new Date(bill.createdAt).toLocaleTimeString('en-IN'),
        'Total Amount': bill.totalAmount,
        'Item Count': bill.items?.length || 0,
        'Items': bill.items?.map(item => 
          `${item.name} (Qty: ${item.qty}, Price: ₹${item.price})`
        ).join('; ') || ''
      }));

      // Prepare printed bills data
      const printedData = monthlyPrintedBills.map(bill => ({
        'Bill Number': bill.billNumber,
        'Printed Date': new Date(bill.printedAt).toLocaleDateString('en-IN'),
        'Printed Time': new Date(bill.printedAt).toLocaleTimeString('en-IN'),
        'Print Count': bill.printCount || 1,
        'Total Amount': bill.totalAmount,
        'Item Count': bill.itemCount
      }));

      // Prepare catalog data
      const catalogData = catalogItems.map(item => ({
        'Item Name': item.name,
        'Price': item.price,
        'Created Date': item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN') : 'Unknown'
      }));

      if (format === 'xlsx') {
        return this.createMultiSheetExcel({
          'Summary': summaryData,
          'Bills': billsData,
          'Printed Bills': printedData,
          'Catalog Items': catalogData
        }, `Monthly_Report_${this.getMonthName(month)}_${year}`);
      } else {
        // For other formats, combine all data
        const combinedData = [
          ...summaryData.map(row => ({ 'Field': row[0], 'Value': row[1] })),
          { 'Field': '', 'Value': '' },
          { 'Field': 'BILLS DATA', 'Value': '' },
          ...billsData,
          { 'Field': '', 'Value': '' },
          { 'Field': 'PRINTED BILLS DATA', 'Value': '' },
          ...printedData,
          { 'Field': '', 'Value': '' },
          { 'Field': 'CATALOG ITEMS', 'Value': '' },
          ...catalogData
        ];

        return this.createFile(combinedData, `Monthly_Report_${this.getMonthName(month)}_${year}`, format);
      }
    } catch (error) {
      console.error('Monthly report export failed:', error);
      throw error;
    }
  }

  /**
   * Export all data (complete backup)
   * @param {string} format - Export format ('xlsx', 'csv', 'json')
   * @returns {Promise<Blob>} Exported file blob
   */
  async exportAllData(format = 'xlsx') {
    try {
      const data = await indexedDBService.exportData();
      
      if (format === 'json') {
        const jsonString = JSON.stringify(data, null, 2);
        return new Blob([jsonString], { type: 'application/json' });
      }

      // Prepare data for Excel/CSV
      const exportData = {
        'Catalog Items': data.catalogItems.map(item => ({
          'ID': item.id,
          'Name': item.name,
          'Price': item.price,
          'Created At': item.createdAt ? new Date(item.createdAt).toLocaleString('en-IN') : 'Unknown'
        })),
        'Bills': data.bills.map(bill => ({
          'ID': bill.id,
          'Bill Number': bill.billNumber,
          'Total Amount': bill.totalAmount,
          'Item Count': bill.items?.length || 0,
          'Created At': new Date(bill.createdAt).toLocaleString('en-IN'),
          'Items': bill.items?.map(item => 
            `${item.name} (Qty: ${item.qty}, Price: ₹${item.price})`
          ).join('; ') || ''
        })),
        'Printed Bills': data.printedBills.map(bill => ({
          'ID': bill.id,
          'Bill Number': bill.billNumber,
          'Printed At': new Date(bill.printedAt).toLocaleString('en-IN'),
          'Print Count': bill.printCount || 1,
          'Total Amount': bill.totalAmount,
          'Item Count': bill.itemCount
        }))
      };

      if (format === 'xlsx') {
        return this.createMultiSheetExcel(exportData, `Complete_Backup_${new Date().toISOString().split('T')[0]}`);
      } else {
        // For CSV, combine all data
        const combinedData = [
          ...exportData['Catalog Items'].map(item => ({ 'Type': 'Catalog Item', ...item })),
          ...exportData['Bills'].map(bill => ({ 'Type': 'Bill', ...bill })),
          ...exportData['Printed Bills'].map(bill => ({ 'Type': 'Printed Bill', ...bill }))
        ];

        return this.createFile(combinedData, `Complete_Backup_${new Date().toISOString().split('T')[0]}`, format);
      }
    } catch (error) {
      console.error('Complete data export failed:', error);
      throw error;
    }
  }

  /**
   * Create file from data
   * @param {Array} data - Data to export
   * @param {string} filename - Base filename
   * @param {string} format - File format
   * @returns {Blob} File blob
   */
  createFile(data, filename, format) {
    if (format === 'json') {
      const jsonString = JSON.stringify(data, null, 2);
      return new Blob([jsonString], { type: 'application/json' });
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    const fileExtension = format === 'csv' ? 'csv' : 'xlsx';
    const mimeType = format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    
    const excelBuffer = XLSX.write(workbook, { bookType: format, type: 'array' });
    return new Blob([excelBuffer], { type: mimeType });
  }

  /**
   * Create multi-sheet Excel file
   * @param {Object} sheets - Object with sheet names as keys and data as values
   * @param {string} filename - Base filename
   * @returns {Blob} Excel file blob
   */
  createMultiSheetExcel(sheets, filename) {
    const workbook = XLSX.utils.book_new();

    Object.entries(sheets).forEach(([sheetName, data]) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  /**
   * Format item details for export
   * @param {Array} items - Bill items
   * @returns {string} Formatted item details
   */
  formatItemDetails(items) {
    return items.map((item, index) => 
      `${index + 1}. ${item.name} - Qty: ${item.qty}, Price: ₹${item.price}, Discount: ${item.discount || 0}%, Total: ₹${item.qty * item.price * (1 - (item.discount || 0) / 100)}`
    ).join('\n');
  }

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);
  }

  /**
   * Get month name
   * @param {number} month - Month number (1-12)
   * @returns {string} Month name
   */
  getMonthName(month) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || 'Unknown';
  }

  /**
   * Download file
   * @param {Blob} blob - File blob
   * @param {string} filename - Filename
   */
  downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Get available months for export
   * @returns {Promise<Array>} Array of {month, year, billCount} objects
   */
  async getAvailableMonths() {
    try {
      const bills = await indexedDBService.getBills();
      const monthMap = new Map();

      bills.forEach(bill => {
        const date = new Date(bill.createdAt);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const key = `${year}-${month}`;

        if (!monthMap.has(key)) {
          monthMap.set(key, { month, year, billCount: 0 });
        }
        monthMap.get(key).billCount++;
      });

      return Array.from(monthMap.values()).sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
    } catch (error) {
      console.error('Failed to get available months:', error);
      return [];
    }
  }
}

// Create singleton instance
const exportService = new ExportService();

export default exportService;
