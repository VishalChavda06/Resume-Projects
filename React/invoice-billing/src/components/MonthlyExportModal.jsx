/**
 * Monthly Export Modal Component
 * Provides interface for exporting monthly reports and data
 */

import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogFooter } from './ui/Dialog';
import exportService from '../Utils/ExportService.jsx';

const MonthlyExportModal = ({ open, onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFormat, setSelectedFormat] = useState('xlsx');
  const [exportType, setExportType] = useState('bills');
  const [availableMonths, setAvailableMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMonths, setIsLoadingMonths] = useState(true);

  // Load available months on mount
  useEffect(() => {
    const loadAvailableMonths = async () => {
      try {
        setIsLoadingMonths(true);
        const months = await exportService.getAvailableMonths();
        setAvailableMonths(months);
        
        // Set to most recent month if available
        if (months.length > 0) {
          setSelectedMonth(months[0].month);
          setSelectedYear(months[0].year);
        }
      } catch (error) {
        console.error('Failed to load available months:', error);
      } finally {
        setIsLoadingMonths(false);
      }
    };

    if (open) {
      loadAvailableMonths();
    }
  }, [open]);

  const handleExport = async () => {
    try {
      setIsLoading(true);
      let blob;
      let filename;

      switch (exportType) {
        case 'bills':
          blob = await exportService.exportMonthlyBills(selectedMonth, selectedYear, selectedFormat);
          filename = `Bills_${exportService.getMonthName(selectedMonth)}_${selectedYear}.${selectedFormat}`;
          break;
        case 'printed':
          blob = await exportService.exportMonthlyPrintedBills(selectedMonth, selectedYear, selectedFormat);
          filename = `Printed_Bills_${exportService.getMonthName(selectedMonth)}_${selectedYear}.${selectedFormat}`;
          break;
        case 'report':
          blob = await exportService.exportMonthlyReport(selectedMonth, selectedYear, selectedFormat);
          filename = `Monthly_Report_${exportService.getMonthName(selectedMonth)}_${selectedYear}.${selectedFormat}`;
          break;
        case 'all':
          blob = await exportService.exportAllData(selectedFormat);
          filename = `Complete_Backup_${new Date().toISOString().split('T')[0]}.${selectedFormat}`;
          break;
        default:
          throw new Error('Invalid export type');
      }

      exportService.downloadFile(blob, filename);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>Export Data</DialogHeader>
      
      <div className="space-y-6">
        {/* Export Type Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Export Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setExportType('bills')}
              className={`p-3 rounded-lg border-2 text-left transition-colors ${
                exportType === 'bills'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="font-medium">📋 Monthly Bills</div>
              <div className="text-sm text-slate-500">Export all bills for selected month</div>
            </button>
            
            <button
              onClick={() => setExportType('printed')}
              className={`p-3 rounded-lg border-2 text-left transition-colors ${
                exportType === 'printed'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="font-medium">🖨️ Printed Bills</div>
              <div className="text-sm text-slate-500">Export printed bills for selected month</div>
            </button>
            
            <button
              onClick={() => setExportType('report')}
              className={`p-3 rounded-lg border-2 text-left transition-colors ${
                exportType === 'report'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="font-medium">📊 Monthly Report</div>
              <div className="text-sm text-slate-500">Comprehensive monthly summary</div>
            </button>
            
            <button
              onClick={() => setExportType('all')}
              className={`p-3 rounded-lg border-2 text-left transition-colors ${
                exportType === 'all'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="font-medium">💾 Complete Backup</div>
              <div className="text-sm text-slate-500">Export all data (ignores month/year)</div>
            </button>
          </div>
        </div>

        {/* Month and Year Selection (hidden for complete backup) */}
        {exportType !== 'all' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoadingMonths}
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoadingMonths}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Available Months Info */}
        {exportType !== 'all' && availableMonths.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-sm font-medium text-slate-700 mb-2">Available Data:</div>
            <div className="text-xs text-slate-600">
              {availableMonths.slice(0, 5).map(month => (
                <span key={`${month.year}-${month.month}`} className="inline-block mr-3">
                  {exportService.getMonthName(month.month)} {month.year} ({month.billCount} bills)
                </span>
              ))}
              {availableMonths.length > 5 && <span>... and {availableMonths.length - 5} more</span>}
            </div>
          </div>
        )}

        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Export Format
          </label>
          <div className="flex gap-3">
            {['xlsx', 'csv', 'json'].map(format => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                  selectedFormat === format
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-slate-300 text-slate-700 hover:border-slate-400'
                }`}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Export Preview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="text-sm font-medium text-blue-800 mb-1">Export Preview:</div>
          <div className="text-xs text-blue-700">
            {exportType === 'all' ? (
              <>Complete backup of all data in {selectedFormat.toUpperCase()} format</>
            ) : (
              <>
                {exportType === 'bills' && 'Monthly bills'}
                {exportType === 'printed' && 'Printed bills'}
                {exportType === 'report' && 'Monthly report'}
                {' '}for {exportService.getMonthName(selectedMonth)} {selectedYear} in {selectedFormat.toUpperCase()} format
              </>
            )}
          </div>
        </div>
      </div>

      <DialogFooter>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 font-medium"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={handleExport}
          disabled={isLoading || isLoadingMonths}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
          {isLoading ? 'Exporting...' : 'Export'}
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default MonthlyExportModal;
