/**
 * Data Structure Test Utility
 * Helps verify that the IndexedDB data structure is working correctly
 */

import indexedDBService from '../services/IndexedDBService';

class DataStructureTest {
  constructor() {
    this.testResults = [];
  }

  /**
   * Test the data structure and fix any issues
   * @returns {Promise<Object>} Test results
   */
  async testAndFixDataStructure() {
    console.log('🔍 Testing data structure...');
    
    try {
      await indexedDBService.init();
      
      // Test 1: Check if we have any bills
      const bills = await indexedDBService.getBills();
      console.log(`📊 Found ${bills.length} bills in database`);
      
      if (bills.length === 0) {
        console.log('⚠️ No bills found, creating a test bill...');
        await this.createTestBill();
        return { success: true, message: 'Created test bill' };
      }
      
      // Test 2: Check bill structure
      const structureIssues = [];
      bills.forEach((bill, index) => {
        if (!bill.items || !Array.isArray(bill.items)) {
          structureIssues.push(`Bill ${index}: Missing or invalid items array`);
        }
        if (typeof bill.totalAmount !== 'number') {
          structureIssues.push(`Bill ${index}: Missing or invalid totalAmount`);
        }
        if (!bill.billNumber) {
          structureIssues.push(`Bill ${index}: Missing billNumber`);
        }
      });
      
      if (structureIssues.length > 0) {
        console.log('❌ Data structure issues found:', structureIssues);
        return { success: false, issues: structureIssues };
      }
      
      console.log('✅ All bills have correct structure');
      
      // Test 3: Test calculateBillTotal function
      const testBill = bills[0];
      if (testBill && testBill.items) {
        const total = this.calculateBillTotal(testBill.items);
        console.log(`🧮 Test calculation: ${total}`);
        
        if (total !== testBill.totalAmount) {
          console.log('⚠️ Total amount mismatch, updating...');
          await indexedDBService.updateBill(testBill.id, {
            ...testBill,
            totalAmount: total
          });
        }
      }
      
      return { success: true, message: 'Data structure is correct' };
      
    } catch (error) {
      console.error('❌ Data structure test failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a test bill with proper structure
   * @returns {Promise<void>}
   */
  async createTestBill() {
    const testBill = {
      billNumber: 1,
      items: [
        {
          name: 'Test Item 1',
          price: 100,
          qty: 2,
          discount: 10
        },
        {
          name: 'Test Item 2',
          price: 50,
          qty: 1,
          discount: 0
        }
      ],
      createdAt: new Date().toISOString()
    };
    
    // Calculate total amount
    testBill.totalAmount = this.calculateBillTotal(testBill.items);
    
    await indexedDBService.addBill(testBill);
    console.log('✅ Test bill created successfully');
  }

  /**
   * Calculate bill total (same logic as in InvoicePage)
   * @param {Array} billItems - Array of bill items
   * @returns {number} Total amount
   */
  calculateBillTotal(billItems) {
    if (!Array.isArray(billItems)) {
      return 0;
    }
    return billItems.reduce((sum, item) => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.price) || 0;
      const discount = parseFloat(item.discount) || 0;
      return sum + (qty * price * (1 - discount / 100));
    }, 0);
  }

  /**
   * Fix any data structure issues
   * @returns {Promise<Object>} Fix results
   */
  async fixDataStructure() {
    console.log('🔧 Fixing data structure issues...');
    
    try {
      const bills = await indexedDBService.getBills();
      let fixedCount = 0;
      
      for (const bill of bills) {
        let needsUpdate = false;
        const updatedBill = { ...bill };
        
        // Fix missing items array
        if (!updatedBill.items || !Array.isArray(updatedBill.items)) {
          updatedBill.items = [];
          needsUpdate = true;
        }
        
        // Fix missing totalAmount
        if (typeof updatedBill.totalAmount !== 'number') {
          updatedBill.totalAmount = this.calculateBillTotal(updatedBill.items);
          needsUpdate = true;
        }
        
        // Fix missing billNumber
        if (!updatedBill.billNumber) {
          updatedBill.billNumber = bills.indexOf(bill) + 1;
          needsUpdate = true;
        }
        
        if (needsUpdate) {
          await indexedDBService.updateBill(bill.id, updatedBill);
          fixedCount++;
        }
      }
      
      console.log(`✅ Fixed ${fixedCount} bills`);
      return { success: true, fixedCount };
      
    } catch (error) {
      console.error('❌ Failed to fix data structure:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Run complete data structure validation
   * @returns {Promise<Object>} Validation results
   */
  async validateDataStructure() {
    console.log('🔍 Running complete data structure validation...');
    
    const results = {
      bills: { count: 0, issues: [] },
      catalogItems: { count: 0, issues: [] },
      printedBills: { count: 0, issues: [] },
      overall: { success: true, message: '' }
    };
    
    try {
      // Validate bills
      const bills = await indexedDBService.getBills();
      results.bills.count = bills.length;
      
      bills.forEach((bill, index) => {
        if (!bill.items || !Array.isArray(bill.items)) {
          results.bills.issues.push(`Bill ${index}: Invalid items structure`);
        }
        if (typeof bill.totalAmount !== 'number') {
          results.bills.issues.push(`Bill ${index}: Invalid totalAmount`);
        }
        if (!bill.billNumber) {
          results.bills.issues.push(`Bill ${index}: Missing billNumber`);
        }
      });
      
      // Validate catalog items
      const catalogItems = await indexedDBService.getCatalogItems();
      results.catalogItems.count = catalogItems.length;
      
      catalogItems.forEach((item, index) => {
        if (!item.name || typeof item.name !== 'string') {
          results.catalogItems.issues.push(`Item ${index}: Invalid name`);
        }
        if (typeof item.price !== 'number') {
          results.catalogItems.issues.push(`Item ${index}: Invalid price`);
        }
      });
      
      // Validate printed bills
      const printedBills = await indexedDBService.getPrintedBills();
      results.printedBills.count = printedBills.length;
      
      printedBills.forEach((bill, index) => {
        if (!bill.billNumber) {
          results.printedBills.issues.push(`Printed bill ${index}: Missing billNumber`);
        }
        if (!bill.printedAt) {
          results.printedBills.issues.push(`Printed bill ${index}: Missing printedAt`);
        }
      });
      
      // Check overall success
      const totalIssues = results.bills.issues.length + results.catalogItems.issues.length + results.printedBills.issues.length;
      results.overall.success = totalIssues === 0;
      results.overall.message = totalIssues === 0 ? 'All data structures are valid' : `Found ${totalIssues} issues`;
      
      console.log('📊 Validation results:', results);
      return results;
      
    } catch (error) {
      console.error('❌ Validation failed:', error);
      results.overall.success = false;
      results.overall.message = `Validation failed: ${error.message}`;
      return results;
    }
  }
}

// Create singleton instance
const dataStructureTest = new DataStructureTest();

export default dataStructureTest;
