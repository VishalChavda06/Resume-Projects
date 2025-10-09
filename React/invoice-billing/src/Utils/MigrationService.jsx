/**
 * Migration Service for localStorage to IndexedDB
 * Handles seamless migration of existing data
 */

import indexedDBService from '../services/IndexedDBService';

class MigrationService {
  constructor() {
    this.migrationKey = 'migration_completed_v1';
  }

  /**
   * Check if migration is needed
   * @returns {Promise<boolean>} True if migration is needed
   */
  async isMigrationNeeded() {
    try {
      // Check if IndexedDB has any data
      await indexedDBService.init();
      const stats = await indexedDBService.getStats();
      
      // If IndexedDB has data, migration not needed
      if (stats.bills > 0 || stats.catalogItems > 0) {
        return false;
      }

      // Check if localStorage has data
      const hasLocalStorageData = 
        localStorage.getItem('catalogitems') ||
        localStorage.getItem('bills') ||
        localStorage.getItem('printedBills');

      return !!hasLocalStorageData;
    } catch (error) {
      console.error('Error checking migration status:', error);
      return false;
    }
  }

  /**
   * Perform migration from localStorage to IndexedDB
   * @returns {Promise<Object>} Migration result
   */
  async migrateFromLocalStorage() {
    try {
      console.log('Starting migration from localStorage to IndexedDB...');
      
      // Initialize IndexedDB
      await indexedDBService.init();

      const migrationResult = {
        catalogItems: 0,
        bills: 0,
        printedBills: 0,
        errors: []
      };

      // Migrate catalog items
      try {
        const catalogData = localStorage.getItem('catalogitems');
        if (catalogData) {
          const catalogItems = JSON.parse(catalogData);
          if (Array.isArray(catalogItems)) {
            for (const item of catalogItems) {
              await indexedDBService.addCatalogItem(item);
              migrationResult.catalogItems++;
            }
          }
        }
      } catch (error) {
        migrationResult.errors.push(`Catalog items migration failed: ${error.message}`);
      }

      // Migrate bills
      try {
        const billsData = localStorage.getItem('bills');
        if (billsData) {
          const bills = JSON.parse(billsData);
          if (Array.isArray(bills)) {
            // Filter out empty bills and migrate only non-empty ones
            const nonEmptyBills = bills.filter(bill => Array.isArray(bill) && bill.length > 0);
            
            for (let i = 0; i < nonEmptyBills.length; i++) {
              const bill = nonEmptyBills[i];
              await indexedDBService.addBill({
                billNumber: i + 1,
                items: bill,
                createdAt: new Date().toISOString()
              });
              migrationResult.bills++;
            }
          }
        }
      } catch (error) {
        migrationResult.errors.push(`Bills migration failed: ${error.message}`);
      }

      // Migrate printed bills
      try {
        const printedBillsData = localStorage.getItem('printedBills');
        if (printedBillsData) {
          const printedBills = JSON.parse(printedBillsData);
          if (Array.isArray(printedBills)) {
            for (const printedBill of printedBills) {
              await indexedDBService.addPrintedBill(printedBill);
              migrationResult.printedBills++;
            }
          }
        }
      } catch (error) {
        migrationResult.errors.push(`Printed bills migration failed: ${error.message}`);
      }

      // Migrate current bill index
      try {
        const currentBillIndex = localStorage.getItem('currentBillIndex');
        if (currentBillIndex !== null) {
          await indexedDBService.setSetting('currentBillIndex', parseInt(currentBillIndex));
        }
      } catch (error) {
        migrationResult.errors.push(`Current bill index migration failed: ${error.message}`);
      }

      // Mark migration as completed
      await indexedDBService.setSetting(this.migrationKey, true);

      console.log('Migration completed:', migrationResult);
      return migrationResult;

    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  /**
   * Backup localStorage data before migration
   * @returns {Object} Backup data
   */
  backupLocalStorageData() {
    const backup = {
      catalogitems: localStorage.getItem('catalogitems'),
      bills: localStorage.getItem('bills'),
      printedBills: localStorage.getItem('printedBills'),
      currentBillIndex: localStorage.getItem('currentBillIndex'),
      backupDate: new Date().toISOString()
    };

    // Store backup in localStorage with timestamp
    const backupKey = `backup_${Date.now()}`;
    localStorage.setItem(backupKey, JSON.stringify(backup));
    
    console.log(`LocalStorage backup created: ${backupKey}`);
    return backup;
  }

  /**
   * Restore from backup if needed
   * @param {string} backupKey - Backup key
   * @returns {boolean} Success status
   */
  restoreFromBackup(backupKey) {
    try {
      const backupData = localStorage.getItem(backupKey);
      if (!backupData) {
        console.error('Backup not found:', backupKey);
        return false;
      }

      const backup = JSON.parse(backupData);
      
      // Restore data to localStorage
      if (backup.catalogitems) localStorage.setItem('catalogitems', backup.catalogitems);
      if (backup.bills) localStorage.setItem('bills', backup.bills);
      if (backup.printedBills) localStorage.setItem('printedBills', backup.printedBills);
      if (backup.currentBillIndex) localStorage.setItem('currentBillIndex', backup.currentBillIndex);

      console.log('Data restored from backup:', backupKey);
      return true;
    } catch (error) {
      console.error('Restore failed:', error);
      return false;
    }
  }

  /**
   * Clean up localStorage after successful migration
   * @returns {void}
   */
  cleanupLocalStorage() {
    try {
      // Remove only our app's data, keep other localStorage data
      const keysToRemove = ['catalogitems', 'bills', 'printedBills', 'currentBillIndex'];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });

      console.log('LocalStorage cleaned up after migration');
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  }

  /**
   * Get migration status
   * @returns {Promise<Object>} Migration status
   */
  async getMigrationStatus() {
    try {
      await indexedDBService.init();
      const isCompleted = await indexedDBService.getSetting(this.migrationKey);
      const isNeeded = await this.isMigrationNeeded();
      const stats = await indexedDBService.getStats();

      return {
        isCompleted: !!isCompleted,
        isNeeded,
        stats,
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting migration status:', error);
      return {
        isCompleted: false,
        isNeeded: false,
        stats: null,
        error: error.message
      };
    }
  }

  /**
   * Reset migration status (for testing)
   * @returns {Promise<void>}
   */
  async resetMigrationStatus() {
    try {
      await indexedDBService.init();
      await indexedDBService.setSetting(this.migrationKey, false);
      console.log('Migration status reset');
    } catch (error) {
      console.error('Failed to reset migration status:', error);
    }
  }
}

// Create singleton instance
const migrationService = new MigrationService();

export default migrationService;
