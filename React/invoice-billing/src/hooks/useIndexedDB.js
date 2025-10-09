/**
 * Custom React Hook for IndexedDB Operations
 * Provides a clean interface for managing data with IndexedDB
 */

import { useState, useEffect, useCallback } from 'react';
import indexedDBService from '../services/IndexedDBService';
import migrationService from '../Utils/MigrationService.jsx';

export const useIndexedDB = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [migrationStatus, setMigrationStatus] = useState(null);

  // Initialize IndexedDB and check for migration
  useEffect(() => {
    const initializeDB = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Initialize IndexedDB
        await indexedDBService.init();
        setIsInitialized(true);

        // Check migration status
        const status = await migrationService.getMigrationStatus();
        setMigrationStatus(status);

        // Perform migration if needed
        if (status.isNeeded && !status.isCompleted) {
          console.log('Migration needed, starting migration...');
          await performMigration();
        }

      } catch (err) {
        console.error('Failed to initialize IndexedDB:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDB();
  }, []);

  // Perform migration
  const performMigration = async () => {
    try {
      // Create backup before migration
      migrationService.backupLocalStorageData();
      
      // Perform migration
      const result = await migrationService.migrateFromLocalStorage();
      
      console.log('Migration completed:', result);
      
      // Clean up localStorage after successful migration
      if (result.errors.length === 0) {
        migrationService.cleanupLocalStorage();
      }
      
      return result;
    } catch (err) {
      console.error('Migration failed:', err);
      setError(`Migration failed: ${err.message}`);
      throw err;
    }
  };

  // Catalog Items operations
  const getCatalogItems = useCallback(async () => {
    if (!isInitialized) return [];
    try {
      return await indexedDBService.getCatalogItems();
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [isInitialized]);

  const addCatalogItem = useCallback(async (item) => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.addCatalogItem(item);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  const updateCatalogItem = useCallback(async (id, item) => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.updateCatalogItem(id, item);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  const deleteCatalogItem = useCallback(async (id) => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.deleteCatalogItem(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  // Bills operations
  const getBills = useCallback(async () => {
    if (!isInitialized) return [];
    try {
      return await indexedDBService.getBills();
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [isInitialized]);

  const getBillsByMonth = useCallback(async (month, year) => {
    if (!isInitialized) return [];
    try {
      return await indexedDBService.getBillsByMonth(month, year);
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [isInitialized]);

  const addBill = useCallback(async (bill) => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.addBill(bill);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  const updateBill = useCallback(async (id, bill) => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.updateBill(id, bill);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  const deleteBill = useCallback(async (id) => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.deleteBill(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  const clearAllBills = useCallback(async () => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.clearAllBills();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  // Printed Bills operations
  const getPrintedBills = useCallback(async () => {
    if (!isInitialized) return [];
    try {
      return await indexedDBService.getPrintedBills();
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [isInitialized]);

  const addPrintedBill = useCallback(async (printedBill) => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.addPrintedBill(printedBill);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  const clearPrintedBills = useCallback(async () => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.clearPrintedBills();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  // Settings operations
  const getSetting = useCallback(async (key) => {
    if (!isInitialized) return null;
    try {
      return await indexedDBService.getSetting(key);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [isInitialized]);

  const setSetting = useCallback(async (key, value) => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.setSetting(key, value);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  // Utility operations
  const getStats = useCallback(async () => {
    if (!isInitialized) return null;
    try {
      return await indexedDBService.getStats();
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [isInitialized]);

  const exportData = useCallback(async () => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.exportData();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  const clearAllData = useCallback(async () => {
    if (!isInitialized) throw new Error('Database not initialized');
    try {
      return await indexedDBService.clearAllData();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isInitialized]);

  return {
    // State
    isInitialized,
    isLoading,
    error,
    migrationStatus,
    
    // Actions
    performMigration,
    
    // Catalog Items
    getCatalogItems,
    addCatalogItem,
    updateCatalogItem,
    deleteCatalogItem,
    
    // Bills
    getBills,
    getBillsByMonth,
    addBill,
    updateBill,
    deleteBill,
    clearAllBills,
    
    // Printed Bills
    getPrintedBills,
    addPrintedBill,
    clearPrintedBills,
    
    // Settings
    getSetting,
    setSetting,
    
    // Utilities
    getStats,
    exportData,
    clearAllData
  };
};

export default useIndexedDB;
