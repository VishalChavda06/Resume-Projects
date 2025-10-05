# 💼 Invoice Billing System - Complete Documentation

A modern, responsive invoice billing system built with React and Vite, featuring real-time calculations, print functionality, and Excel export capabilities.

![React](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.14-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-teal) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Overview

This is a comprehensive invoice billing system designed for small to medium businesses. It allows users to create, manage, and track invoices with advanced features like automatic calculations, printing, and Excel export functionality.

## ✨ Current Features

### 📋 Core Functionality
- **Item Management**: Add, view, and manage billing items
- **Real-time Calculations**: Automatic total, tax, and discount calculations
- **Print System**: Print individual bills with professional formatting
- **Excel Export**: Export printed records to Excel format
- **Local Storage**: Persistent data storage across sessions
- **Responsive Design**: Works on desktop and mobile devices

### 🧮 Calculation Features
- **Quantity × Price**: Basic item total calculation
- **Discount Support**: Percentage-based discount calculation
- **Tax Calculation**: 18% GST tax calculation
- **Subtotal & Grand Total**: Comprehensive total calculations

### 🖨️ Print & Export Features
- **Individual Bill Printing**: Print single item bills
- **Professional Formatting**: Clean, business-ready print layout
- **Excel Export**: Export printed records to Excel (.xlsx)
- **Printed Items Tracking**: Only printed items are exported to Excel
- **Unique Invoice Numbers**: Auto-generated invoice numbers

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd invoice-billing
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173/` (or the port shown in terminal)

## 📖 How to Use

### Adding Items
1. Fill in the **Item Form** with:
   - Item Name
   - Item Price
   - Quantity
   - Discount (%)
2. Click **"Add Item"** button
3. Item appears in the **Items Table**

### Printing Bills
1. View items in the **Summary** section
2. Click **"Print Bill"** for any item
3. A new window opens with formatted bill
4. Use browser's print function (Ctrl+P)

### Excel Export
1. Print some bills first (only printed items are exported)
2. Click **"📊 Export to Excel"** button
3. Excel file downloads automatically
4. File contains all printed records with timestamps

## 🏗️ Project Structure

```
invoice-billing/
├── src/
│   ├── components/
│   │   ├── InvoiceTable.jsx      # Items display table
│   │   ├── ItemForm.jsx          # Add item form
│   │   └── Summary.jsx           # Summary & print/export
│   ├── Pages/
│   │   └── InvoicePage.jsx       # Main invoice page
│   ├── Utils/
│   │   └── Cal.jsx              # Calculation utilities
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Application entry point
├── package.json                  # Project dependencies
└── README.md                    # This file
```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📊 Excel Export Details

### Export Features
- **Printed Items Only**: Only items that have been printed are exported
- **Comprehensive Data**: Includes all item details, calculations, and timestamps
- **Professional Format**: Well-formatted Excel sheet with proper column widths
- **Unique Identifiers**: Each exported item has a unique invoice number
- **Date Stamping**: Includes print date and time for each item

### Excel File Structure
| Column | Description |
|--------|-------------|
| Invoice # | Unique invoice identifier |
| Printed Date | Date when item was printed |
| Printed Time | Time when item was printed |
| Item Name | Name of the item |
| Quantity | Item quantity |
| Price | Unit price |
| Discount (%) | Discount percentage |
| Total | Calculated total (after discount) |
| Tax (18%) | 18% GST tax amount |
| Subtotal | Final amount including tax |

## 🎨 Customization

### Styling
The project uses **TailwindCSS** for styling. You can customize:
- Colors in `src/index.css`
- Component styles in individual `.jsx` files
- Print styles in `Summary.jsx`

### Calculations
Modify tax rate or calculation logic in `src/Utils/Cal.jsx`:
```javascript
// Change tax rate from 18% to your preferred rate
const tax = subtotal * 0.18; // Change 0.18 to your tax rate
```

## 🔧 Technical Details

### Dependencies
- **React 19.1.1**: Frontend framework
- **Vite 7.1.14**: Build tool and dev server
- **TailwindCSS 4.1.14**: CSS framework
- **XLSX 0.18.5**: Excel file generation
- **jsPDF 3.0.3**: PDF generation (available)
- **html2canvas 1.4.1**: HTML to canvas conversion (available)

### Browser Compatibility
- ✅ Chrome (latest version)
- ✅ Firefox (latest version)
- ✅ Safari (latest version)
- ✅ Edge (latest version)
- ✅ Mobile browsers

## 🚀 Future Feature Roadmap

### Priority 1: Essential Business Features
- [ ] **Invoice Management System**
  - Auto-generate unique invoice numbers
  - Invoice status tracking (Draft, Sent, Paid, Overdue)
  - Custom invoice dates and due dates

- [ ] **Customer Management**
  - Customer database with contact details
  - Customer selection dropdown
  - Customer invoice history
  - Customer search functionality

- [ ] **Payment Tracking**
  - Payment status management
  - Multiple payment methods
  - Payment history tracking
  - Outstanding amount calculations

### Priority 2: Advanced Features
- [ ] **Dashboard & Analytics**
  - Revenue dashboard with charts
  - Top customers analysis
  - Popular items tracking
  - Payment trend analysis

- [ ] **Search & Filter System**
  - Invoice search by number, customer, date
  - Date range filtering
  - Status-based filtering
  - Advanced multi-criteria search

- [ ] **Communication Features**
  - Email invoice sending
  - SMS payment reminders
  - WhatsApp integration
  - Customizable email templates

### Priority 3: Professional Features
- [ ] **Company Branding**
  - Company logo upload
  - Company details management
  - Custom themes and colors
  - Professional invoice templates

- [ ] **Reporting System**
  - Sales reports (daily, weekly, monthly)
  - Tax reports for GST filing
  - Customer-wise sales analysis
  - Inventory reports

- [ ] **Security & Backup**
  - User authentication system
  - Automatic cloud backup
  - Data export in multiple formats
  - Complete audit trail

### Priority 4: Advanced Business Features
- [ ] **Inventory Management**
  - Stock quantity tracking
  - Low stock alerts
  - Product categorization
  - Barcode scanning support

- [ ] **Payment Integration**
  - Payment gateway integration
  - UPI payment support
  - Payment link generation
  - Recurring payment setup

- [ ] **Mobile App Features**
  - Enhanced mobile responsiveness
  - Offline mode capability
  - Camera integration for receipts
  - Push notifications

### Priority 5: Automation & Efficiency
- [ ] **Automation Features**
  - Automatic payment reminders
  - Recurring invoice generation
  - Smart item suggestions
  - Auto-numbering system

- [ ] **Integration Features**
  - Accounting software integration
  - Bank statement import
  - CRM system integration
  - API access for third-party apps

## 🎯 Quick Wins (Easy to Implement)

### Immediate Improvements
- [ ] **Edit/Delete Items**: Allow editing and deleting items from table
- [ ] **Bulk Actions**: Select multiple items for bulk operations
- [ ] **Print All Bills**: Print all items in one document
- [ ] **Grand Total Display**: Show grand total in summary section
- [ ] **Item Categories**: Add category field to items
- [ ] **Form Validation**: Better input validation and error messages
- [ ] **Keyboard Shortcuts**: Quick keyboard shortcuts for common actions
- [ ] **Dark Mode**: Toggle between light and dark themes

## 🐛 Troubleshooting

### Common Issues

**Problem**: App not starting
- **Solution**: Ensure Node.js is installed and run `npm install`

**Problem**: Excel export not working
- **Solution**: Make sure to print some bills first, then try exporting

**Problem**: Print window not opening
- **Solution**: Check if pop-ups are blocked in your browser

**Problem**: Data not saving
- **Solution**: Check browser's local storage settings

### Getting Help
1. Check browser console for errors (F12)
2. Restart development server (`npm run dev`)
3. Clear browser cache and reload
4. Verify all dependencies are installed (`npm install`)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Submit a pull request**

## 🎯 Conclusion

This Invoice Billing System provides a solid foundation for managing business invoices with room for extensive customization and feature additions. The modular architecture makes it easy to add new features and integrate with other systems.

**Ready to streamline your billing process? Start using the system today!** 🚀

---

**Need help or have questions? Feel free to reach out!** 💬