/**
 * IndexedDB Service for Invoice Billing System
 * Handles all database operations with proper error handling and migration support
 */

class IndexedDBService {
  constructor() {
    this.dbName = 'InvoiceBillingDB';
    this.version = 1;
    this.db = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the IndexedDB connection
   * @returns {Promise<boolean>} Success status
   */
  async init() {
    if (this.isInitialized) return true;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('IndexedDB failed to open:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.isInitialized = true;
        console.log('IndexedDB initialized successfully');
        resolve(true);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('catalogItems')) {
          const catalogStore = db.createObjectStore('catalogItems', { keyPath: 'id', autoIncrement: true });
          catalogStore.createIndex('name', 'name', { unique: false });
        }

        if (!db.objectStoreNames.contains('bills')) {
          const billsStore = db.createObjectStore('bills', { keyPath: 'id', autoIncrement: true });
          billsStore.createIndex('billNumber', 'billNumber', { unique: true });
          billsStore.createIndex('createdAt', 'createdAt', { unique: false });
          billsStore.createIndex('totalAmount', 'totalAmount', { unique: false });
          billsStore.createIndex('monthYear', 'monthYear', { unique: false });
        }

        if (!db.objectStoreNames.contains('printedBills')) {
          const printedStore = db.createObjectStore('printedBills', { keyPath: 'id', autoIncrement: true });
          printedStore.createIndex('billNumber', 'billNumber', { unique: false });
          printedStore.createIndex('printedAt', 'printedAt', { unique: false });
          printedStore.createIndex('monthYear', 'monthYear', { unique: false });
        }

        if (!db.objectStoreNames.contains('appSettings')) {
          db.createObjectStore('appSettings', { keyPath: 'key' });
        }

        console.log('IndexedDB schema created successfully');
      };
    });
  }

  /**
   * Generic transaction wrapper with error handling
   * @param {string[]} storeNames - Array of store names
   * @param {string} mode - Transaction mode ('readonly' or 'readwrite')
   * @param {Function} operation - Function to execute within transaction
   * @returns {Promise<any>} Operation result
   */
  async withTransaction(storeNames, mode, operation) {
    if (!this.isInitialized) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeNames, mode);
      
      transaction.onerror = () => {
        console.error('Transaction failed:', transaction.error);
        reject(transaction.error);
      };

      transaction.oncomplete = () => {
        resolve();
      };

      try {
        const result = operation(transaction);
        if (result && typeof result.then === 'function') {
          result.then(resolve).catch(reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // ==================== CATALOG ITEMS ====================

  /**
   * Get all catalog items
   * @returns {Promise<Array>} Array of catalog items
   */
  async getCatalogItems() {
    return this.withTransaction(['catalogItems'], 'readonly', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('catalogItems');
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Add a new catalog item
   * @param {Object} item - Catalog item object
   * @returns {Promise<number>} Generated ID
   */
  async addCatalogItem(item) {
    return this.withTransaction(['catalogItems'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('catalogItems');
        const request = store.add({
          ...item,
          createdAt: new Date().toISOString()
        });
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Update a catalog item
   * @param {number} id - Item ID
   * @param {Object} item - Updated item object
   * @returns {Promise<void>}
   */
  async updateCatalogItem(id, item) {
    return this.withTransaction(['catalogItems'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('catalogItems');
        const request = store.put({
          ...item,
          id,
          updatedAt: new Date().toISOString()
        });
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Delete a catalog item
   * @param {number} id - Item ID
   * @returns {Promise<void>}
   */
  async deleteCatalogItem(id) {
    return this.withTransaction(['catalogItems'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('catalogItems');
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }

  // ==================== BILLS ====================

  /**
   * Get all bills
   * @returns {Promise<Array>} Array of bills
   */
  async getBills() {
    return this.withTransaction(['bills'], 'readonly', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('bills');
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Get bills by month and year
   * @param {number} month - Month (1-12)
   * @param {number} year - Year
   * @returns {Promise<Array>} Array of bills for the month
   */
  async getBillsByMonth(month, year) {
    return this.withTransaction(['bills'], 'readonly', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('bills');
        const index = store.index('monthYear');
        const monthYear = `${year}-${month.toString().padStart(2, '0')}`;
        const request = index.getAll(monthYear);
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Add a new bill
   * @param {Object} bill - Bill object
   * @returns {Promise<number>} Generated ID
   */
  async addBill(bill) {
    const now = new Date();
    const monthYear = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    
    return this.withTransaction(['bills'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('bills');
        const request = store.add({
          ...bill,
          createdAt: now.toISOString(),
          monthYear,
          // Use the totalAmount from the bill if it exists, otherwise calculate it
          totalAmount: bill.totalAmount || this.calculateBillTotal(bill.items || [])
        });
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Update an existing bill
   * @param {number} id - Bill ID
   * @param {Object} bill - Updated bill object
   * @returns {Promise<void>}
   */
  async updateBill(id, bill) {
    return this.withTransaction(['bills'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('bills');
        const request = store.put({
          ...bill,
          id,
          updatedAt: new Date().toISOString(),
          // Use the totalAmount from the bill if it exists, otherwise calculate it
          totalAmount: bill.totalAmount || this.calculateBillTotal(bill.items || [])
        });
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Delete a bill
   * @param {number} id - Bill ID
   * @returns {Promise<void>}
   */
  async deleteBill(id) {
    return this.withTransaction(['bills'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('bills');
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Clear all bills
   * @returns {Promise<void>}
   */
  async clearAllBills() {
    return this.withTransaction(['bills'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('bills');
        const request = store.clear();
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }

  // ==================== PRINTED BILLS ====================

  /**
   * Get all printed bills
   * @returns {Promise<Array>} Array of printed bills
   */
  async getPrintedBills() {
    return this.withTransaction(['printedBills'], 'readonly', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('printedBills');
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Add a printed bill record
   * @param {Object} printedBill - Printed bill object
   * @returns {Promise<number>} Generated ID
   */
  async addPrintedBill(printedBill) {
    const now = new Date();
    const monthYear = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    
    return this.withTransaction(['printedBills'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('printedBills');
        const request = store.add({
          ...printedBill,
          printedAt: now.toISOString(),
          monthYear
        });
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Clear all printed bills
   * @returns {Promise<void>}
   */
  async clearPrintedBills() {
    return this.withTransaction(['printedBills'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('printedBills');
        const request = store.clear();
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }

  // ==================== APP SETTINGS ====================

  /**
   * Get app setting
   * @param {string} key - Setting key
   * @returns {Promise<any>} Setting value
   */
  async getSetting(key) {
    return this.withTransaction(['appSettings'], 'readonly', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('appSettings');
        const request = store.get(key);
        
        request.onsuccess = () => resolve(request.result?.value);
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Set app setting
   * @param {string} key - Setting key
   * @param {any} value - Setting value
   * @returns {Promise<void>}
   */
  async setSetting(key, value) {
    return this.withTransaction(['appSettings'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('appSettings');
        const request = store.put({ key, value });
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Calculate total amount for a bill
   * @param {Array} items - Bill items
   * @returns {number} Total amount
   */
  calculateBillTotal(items) {
    return items.reduce((sum, item) => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.price) || 0;
      const discount = parseFloat(item.discount) || 0;
      return sum + (qty * price * (1 - discount / 100));
    }, 0);
  }

  /**
   * Get database statistics
   * @returns {Promise<Object>} Database stats
   */
  async getStats() {
    const [catalogItems, bills, printedBills] = await Promise.all([
      this.getCatalogItems(),
      this.getBills(),
      this.getPrintedBills()
    ]);

    const totalAmount = bills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0);

    return {
      catalogItems: catalogItems.length,
      bills: bills.length,
      printedBills: printedBills.length,
      totalAmount,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Export data for backup
   * @returns {Promise<Object>} Complete data export
   */
  async exportData() {
    const [catalogItems, bills, printedBills, settings] = await Promise.all([
      this.getCatalogItems(),
      this.getBills(),
      this.getPrintedBills(),
      this.getAllSettings()
    ]);

    return {
      catalogItems,
      bills,
      printedBills,
      settings,
      exportDate: new Date().toISOString(),
      version: this.version
    };
  }

  /**
   * Get all settings
   * @returns {Promise<Object>} All settings
   */
  async getAllSettings() {
    return this.withTransaction(['appSettings'], 'readonly', (transaction) => {
      return new Promise((resolve, reject) => {
        const store = transaction.objectStore('appSettings');
        const request = store.getAll();
        
        request.onsuccess = () => {
          const settings = {};
          request.result.forEach(item => {
            settings[item.key] = item.value;
          });
          resolve(settings);
        };
        request.onerror = () => reject(request.error);
      });
    });
  }

  /**
   * Clear all data (reset database)
   * @returns {Promise<void>}
   */
  async clearAllData() {
    return this.withTransaction(['catalogItems', 'bills', 'printedBills', 'appSettings'], 'readwrite', (transaction) => {
      return new Promise((resolve, reject) => {
        const stores = ['catalogItems', 'bills', 'printedBills', 'appSettings'];
        let completed = 0;
        let hasError = false;

        stores.forEach(storeName => {
          const store = transaction.objectStore(storeName);
          const request = store.clear();
          
          request.onsuccess = () => {
            completed++;
            if (completed === stores.length && !hasError) {
              resolve();
            }
          };
          
          request.onerror = () => {
            hasError = true;
            reject(request.error);
          };
        });
      });
    });
  }
}

// Create singleton instance
const indexedDBService = new IndexedDBService();

export default indexedDBService;
