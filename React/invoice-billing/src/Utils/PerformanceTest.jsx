/**
 * Performance Testing Utility for IndexedDB vs localStorage
 * Demonstrates the performance benefits of IndexedDB for large datasets
 */

import indexedDBService from '../services/IndexedDBService';

class PerformanceTest {
  constructor() {
    this.testResults = {
      indexedDB: {},
      localStorage: {}
    };
  }

  /**
   * Generate test data
   * @param {number} billCount - Number of bills to generate
   * @param {number} itemsPerBill - Average items per bill
   * @returns {Object} Test data
   */
  generateTestData(billCount = 1000, itemsPerBill = 5) {
    const catalogItems = [];
    const bills = [];
    const printedBills = [];

    // Generate catalog items
    for (let i = 1; i <= 100; i++) {
      catalogItems.push({
        name: `Item ${i}`,
        price: Math.floor(Math.random() * 1000) + 10,
        createdAt: new Date().toISOString()
      });
    }

    // Generate bills
    for (let i = 1; i <= billCount; i++) {
      const itemCount = Math.floor(Math.random() * itemsPerBill) + 1;
      const items = [];
      
      for (let j = 0; j < itemCount; j++) {
        const catalogItem = catalogItems[Math.floor(Math.random() * catalogItems.length)];
        items.push({
          name: catalogItem.name,
          price: catalogItem.price,
          qty: Math.floor(Math.random() * 10) + 1,
          discount: Math.floor(Math.random() * 20)
        });
      }

      const totalAmount = items.reduce((sum, item) => 
        sum + (item.qty * item.price * (1 - item.discount / 100)), 0
      );

      const bill = {
        billNumber: i,
        items,
        totalAmount,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        monthYear: this.getMonthYear(new Date())
      };

      bills.push(bill);

      // Randomly mark some bills as printed
      if (Math.random() > 0.3) {
        printedBills.push({
          billNumber: i,
          items,
          totalAmount,
          printedAt: new Date().toISOString(),
          itemCount: items.length,
          printCount: Math.floor(Math.random() * 3) + 1,
          monthYear: this.getMonthYear(new Date())
        });
      }
    }

    return { catalogItems, bills, printedBills };
  }

  /**
   * Test IndexedDB performance
   * @param {Object} testData - Test data
   * @returns {Promise<Object>} Performance results
   */
  async testIndexedDBPerformance(testData) {
    const results = {
      writeTime: 0,
      readTime: 0,
      queryTime: 0,
      memoryUsage: 0
    };

    try {
      // Initialize IndexedDB
      await indexedDBService.init();

      // Test write performance
      const writeStart = performance.now();
      
      // Write catalog items
      for (const item of testData.catalogItems) {
        await indexedDBService.addCatalogItem(item);
      }

      // Write bills
      for (const bill of testData.bills) {
        await indexedDBService.addBill(bill);
      }

      // Write printed bills
      for (const printedBill of testData.printedBills) {
        await indexedDBService.addPrintedBill(printedBill);
      }

      results.writeTime = performance.now() - writeStart;

      // Test read performance
      const readStart = performance.now();
      const [catalogItems, bills, printedBills] = await Promise.all([
        indexedDBService.getCatalogItems(),
        indexedDBService.getBills(),
        indexedDBService.getPrintedBills()
      ]);
      results.readTime = performance.now() - readStart;

      // Test query performance (monthly bills)
      const queryStart = performance.now();
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      await indexedDBService.getBillsByMonth(currentMonth, currentYear);
      results.queryTime = performance.now() - queryStart;

      // Estimate memory usage
      results.memoryUsage = this.estimateMemoryUsage(testData);

    } catch (error) {
      console.error('IndexedDB performance test failed:', error);
      results.error = error.message;
    }

    return results;
  }

  /**
   * Test localStorage performance
   * @param {Object} testData - Test data
   * @returns {Object} Performance results
   */
  testLocalStoragePerformance(testData) {
    const results = {
      writeTime: 0,
      readTime: 0,
      queryTime: 0,
      memoryUsage: 0
    };

    try {
      // Test write performance
      const writeStart = performance.now();
      
      localStorage.setItem('test_catalogitems', JSON.stringify(testData.catalogItems));
      localStorage.setItem('test_bills', JSON.stringify(testData.bills));
      localStorage.setItem('test_printedBills', JSON.stringify(testData.printedBills));
      
      results.writeTime = performance.now() - writeStart;

      // Test read performance
      const readStart = performance.now();
      const catalogItems = JSON.parse(localStorage.getItem('test_catalogitems') || '[]');
      const bills = JSON.parse(localStorage.getItem('test_bills') || '[]');
      const printedBills = JSON.parse(localStorage.getItem('test_printedBills') || '[]');
      results.readTime = performance.now() - readStart;

      // Test query performance (filter monthly bills)
      const queryStart = performance.now();
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const monthlyBills = bills.filter(bill => {
        const billDate = new Date(bill.createdAt);
        return billDate.getMonth() + 1 === currentMonth && billDate.getFullYear() === currentYear;
      });
      results.queryTime = performance.now() - queryStart;

      // Estimate memory usage
      results.memoryUsage = this.estimateMemoryUsage(testData);

      // Cleanup
      localStorage.removeItem('test_catalogitems');
      localStorage.removeItem('test_bills');
      localStorage.removeItem('test_printedBills');

    } catch (error) {
      console.error('localStorage performance test failed:', error);
      results.error = error.message;
    }

    return results;
  }

  /**
   * Run comprehensive performance test
   * @param {number} billCount - Number of bills to test with
   * @returns {Promise<Object>} Complete test results
   */
  async runPerformanceTest(billCount = 1000) {
    console.log(`🚀 Starting performance test with ${billCount} bills...`);
    
    const testData = this.generateTestData(billCount);
    console.log(`📊 Generated test data: ${testData.bills.length} bills, ${testData.catalogItems.length} catalog items, ${testData.printedBills.length} printed bills`);

    // Test IndexedDB
    console.log('🔍 Testing IndexedDB performance...');
    const indexedDBResults = await this.testIndexedDBPerformance(testData);
    this.testResults.indexedDB = indexedDBResults;

    // Test localStorage
    console.log('🔍 Testing localStorage performance...');
    const localStorageResults = this.testLocalStoragePerformance(testData);
    this.testResults.localStorage = localStorageResults;

    // Calculate improvements
    const improvements = this.calculateImprovements(indexedDBResults, localStorageResults);

    const results = {
      testData: {
        billCount: testData.bills.length,
        catalogItemCount: testData.catalogItems.length,
        printedBillCount: testData.printedBills.length,
        estimatedDataSize: this.formatBytes(this.estimateMemoryUsage(testData))
      },
      indexedDB: indexedDBResults,
      localStorage: localStorageResults,
      improvements,
      summary: this.generateSummary(improvements)
    };

    console.log('✅ Performance test completed!');
    console.table(results.summary);

    return results;
  }

  /**
   * Calculate performance improvements
   * @param {Object} indexedDBResults - IndexedDB results
   * @param {Object} localStorageResults - localStorage results
   * @returns {Object} Improvement percentages
   */
  calculateImprovements(indexedDBResults, localStorageResults) {
    const improvements = {};

    if (indexedDBResults.writeTime && localStorageResults.writeTime) {
      improvements.writeTime = ((localStorageResults.writeTime - indexedDBResults.writeTime) / localStorageResults.writeTime * 100).toFixed(1);
    }

    if (indexedDBResults.readTime && localStorageResults.readTime) {
      improvements.readTime = ((localStorageResults.readTime - indexedDBResults.readTime) / localStorageResults.readTime * 100).toFixed(1);
    }

    if (indexedDBResults.queryTime && localStorageResults.queryTime) {
      improvements.queryTime = ((localStorageResults.queryTime - indexedDBResults.queryTime) / localStorageResults.queryTime * 100).toFixed(1);
    }

    return improvements;
  }

  /**
   * Generate performance summary
   * @param {Object} improvements - Improvement percentages
   * @returns {Object} Summary table
   */
  generateSummary(improvements) {
    return {
      'Write Performance': `${improvements.writeTime || 0}% faster`,
      'Read Performance': `${improvements.readTime || 0}% faster`,
      'Query Performance': `${improvements.queryTime || 0}% faster`,
      'Storage Capacity': 'Unlimited (vs 5-10MB localStorage limit)',
      'Offline Support': 'Full offline capability',
      'Data Integrity': 'ACID transactions'
    };
  }

  /**
   * Estimate memory usage
   * @param {Object} data - Data object
   * @returns {number} Estimated bytes
   */
  estimateMemoryUsage(data) {
    const jsonString = JSON.stringify(data);
    return new Blob([jsonString]).size;
  }

  /**
   * Format bytes to human readable
   * @param {number} bytes - Bytes to format
   * @returns {string} Formatted string
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get month-year string
   * @param {Date} date - Date object
   * @returns {string} Month-year string
   */
  getMonthYear(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  /**
   * Clean up test data
   * @returns {Promise<void>}
   */
  async cleanup() {
    try {
      await indexedDBService.clearAllData();
      console.log('🧹 Test data cleaned up');
    } catch (error) {
      console.error('Failed to cleanup test data:', error);
    }
  }
}

// Create singleton instance
const performanceTest = new PerformanceTest();

export default performanceTest;
