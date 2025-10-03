# Invoice Billing Application / બિલિંગ એપ્લિકેશન

A simple and efficient invoice billing system built with React and Vite. This application allows you to create, manage, and track invoice items with automatic calculations and data persistence.

React અને Vite સાથે બનાવેલ એક સરળ અને કાર્યક્ષમ બિલિંગ સિસ્ટમ. આ એપ્લિકેશન તમને ઇન્વૉઇસ આઇટમ્સ બનાવવા, મેનેજ કરવા અને ટ્રેક કરવાની મંજૂરી આપે છે.

## Features / વિશેષતાઓ

- ✅ **Add Invoice Items** / **ઇન્વૉઇસ આઇટમ્સ ઉમેરો**
- ✅ **Automatic Calculations** / **સ્વચાલિત ગણતરીઓ**
- ✅ **Data Persistence** / **ડેટા સતતતા**
- ✅ **Form Validation** / **ફોર્મ વેલિડેશન**
- ✅ **Responsive Design** / **રિસ્પોન્સિવ ડિઝાઇન**

## Prerequisites / પૂર્વશરતો

Before you start, make sure you have the following installed on your system:

તમે શરૂ કરો તે પહેલાં, ખાતરી કરો કે તમારી સિસ્ટમ પર નીચેની ઇન્સ્ટોલેશન છે:

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager

## Installation Steps / ઇન્સ્ટોલેશન સ્ટેપ્સ

### Step 1: Clone the Repository / રિપોઝિટરી ક્લોન કરો

```bash
git clone <your-repository-url>
cd invoice-billing
```

### Step 2: Install Dependencies / ડિપેન્ડન્સિસ ઇન્સ્ટોલ કરો

```bash
npm install
```

### Step 3: Start Development Server / ડેવલપમેન્ટ સર્વર શરૂ કરો

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

એપ્લિકેશન `http://localhost:5173` પર ઉપલબ્ધ હશે (અથવા બીજો પોર્ટ જો 5173 વ્યસ્ત હોય).

## How to Use / કેવી રીતે વાપરવું

### Step 1: Open the Application / એપ્લિકેશન ખોલો

1. Open your web browser / તમારું વેબ બ્રાઉઝર ખોલો
2. Navigate to `http://localhost:5173` / `http://localhost:5173` પર જાઓ
3. You will see the Invoice Billing interface / તમને ઇન્વૉઇસ બિલિંગ ઇન્ટરફેસ દેખાશે

### Step 2: Add Invoice Items / ઇન્વૉઇસ આઇટમ્સ ઉમેરો

1. **Fill in the form fields** / **ફોર્મ ફીલ્ડ્સ ભરો:**
   - **Item Name** / **આઇટમ નામ**: Enter the product/service name / ઉત્પાદન/સેવાનું નામ દાખલ કરો
   - **Item Price** / **આઇટમ કિંમત**: Enter the unit price / એકમ કિંમત દાખલ કરો
   - **Item Quantity** / **આઇટમ માત્રા**: Enter the quantity / માત્રા દાખલ કરો
   - **Item Discount** / **આઇટમ છૂટ**: Enter discount percentage / છૂટ ટકાવારી દાખલ કરો

2. **Click "Add Item" button** / **"Add Item" બટન ક્લિક કરો**

3. **The item will be added to the table** / **આઇટમ ટેબલમાં ઉમેરાશે**

### Step 3: View Invoice Table / ઇન્વૉઇસ ટેબલ જુઓ

The invoice table shows:
ઇન્વૉઇસ ટેબલ બતાવે છે:

- **Name** / **નામ**: Item name / આઇટમ નામ
- **Quantity** / **માત્રા**: Number of items / આઇટમ્સની સંખ્યા
- **Price** / **કિંમત**: Unit price / એકમ કિંમત
- **Discount** / **છૂટ**: Discount percentage / છૂટ ટકાવારી
- **Subtotal** / **ઉપ-કુલ**: Calculated subtotal / ગણતરી કરેલ ઉપ-કુલ
- **Total** / **કુલ**: Final total / અંતિમ કુલ

### Step 4: View Summary / સારાંશ જુઓ

The summary section displays:
સારાંશ વિભાગ બતાવે છે:

- **Item details** / **આઇટમ વિગતો**: Individual item information / વ્યક્તિગત આઇટમ માહિતી
- **Calculations** / **ગણતરીઓ**: 
  - Total amount / કુલ રકમ
  - Tax (18%) / ટેક્સ (18%)
  - Subtotal / ઉપ-કુલ

### Step 5: Data Persistence / ડેટા સતતતા

- **Automatic saving** / **સ્વચાલિત સેવિંગ**: All data is automatically saved to browser's localStorage / બધો ડેટા બ્રાઉઝરના localStorageમાં સ્વચાલિત રીતે સેવ થાય છે
- **Page reload** / **પેજ રિલોડ**: Data persists even after refreshing the page / પેજ રિફ્રેશ કર્યા પછી પણ ડેટા રહે છે
- **Form reset** / **ફોર્મ રિસેટ**: Form fields clear automatically after adding an item / આઇટમ ઉમેર્યા પછી ફોર્મ ફીલ્ડ્સ સ્વચાલિત રીતે સાફ થાય છે

## Project Structure / પ્રોજેક્ટ સ્ટ્રક્ચર

```
src/
├── components/
│   ├── InvoiceTable.jsx      # Invoice table component / ઇન્વૉઇસ ટેબલ કમ્પોનન્ટ
│   ├── ItemForm.jsx          # Form component / ફોર્મ કમ્પોનન્ટ
│   └── Summary.jsx           # Summary component / સારાંશ કમ્પોનન્ટ
├── Pages/
│   └── InvoicePage.jsx       # Main page component / મુખ્ય પેજ કમ્પોનન્ટ
├── Utils/
│   └── Cal.jsx               # Calculation utilities / ગણતરી યુટિલિટીઝ
├── App.jsx                   # Main app component / મુખ્ય એપ કમ્પોનન્ટ
└── main.jsx                  # Entry point / એન્ટ્રી પોઇન્ટ
```

## Key Components / મુખ્ય કમ્પોનન્ટ્સ

### 1. InvoicePage.jsx
- **Main container** / **મુખ્ય કન્ટેનર**
- **State management** / **સ્ટેટ મેનેજમેન્ટ**
- **localStorage integration** / **localStorage એકીકરણ**

### 2. ItemForm.jsx
- **Form input fields** / **ફોર્મ ઇનપુટ ફીલ્ડ્સ**
- **Form validation** / **ફોર્મ વેલિડેશન**
- **Auto-reset after submission** / **સબમિશન પછી ઓટો-રિસેટ**

### 3. InvoiceTable.jsx
- **Data display** / **ડેટા ડિસ્પ્લે**
- **Table formatting** / **ટેબલ ફોર્મેટિંગ**
- **Real-time calculations** / **રિયલ-ટાઇમ ગણતરીઓ**

### 4. Summary.jsx
- **Item-wise summary** / **આઇટમ-વાઇઝ સારાંશ**
- **Tax calculations** / **ટેક્સ ગણતરીઓ**
- **Final totals** / **અંતિમ કુલ**

## Calculation Logic / ગણતરી લોજિક

### Formula / સૂત્ર:
```
Subtotal = (Quantity × Price) - ((Quantity × Price) × Discount / 100)
Tax = Subtotal × 0.18 (18%)
Total = Subtotal + Tax
```

### Example / ઉદાહરણ:
- Quantity: 2
- Price: 100
- Discount: 10%
- Calculation: (2 × 100) - ((2 × 100) × 10 / 100) = 200 - 20 = 180
- Tax: 180 × 0.18 = 32.4
- Total: 180 + 32.4 = 212.4

## Available Scripts / ઉપલબ્ધ સ્ક્રિપ્ટ્સ

```bash
# Development server / ડેવલપમેન્ટ સર્વર
npm run dev

# Build for production / પ્રોડક્શન માટે બિલ્ડ
npm run build

# Preview production build / પ્રોડક્શન બિલ્ડ પૂર્વાવલોકન
npm run preview

# Lint code / કોડ લિન્ટ
npm run lint
```

## Browser Compatibility / બ્રાઉઝર સુસંગતતા

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting / સમસ્યા નિવારણ

### Common Issues / સામાન્ય સમસ્યાઓ:

1. **Data not persisting** / **ડેટા સતત નથી રહેતો**
   - Check if localStorage is enabled in your browser / તમારા બ્રાઉઝરમાં localStorage સક્ષમ છે કે નહીં તપાસો
   - Clear browser cache and try again / બ્રાઉઝર કેશ સાફ કરો અને ફરીથી પ્રયાસ કરો

2. **Form not submitting** / **ફોર્મ સબમિટ નથી થતો**
   - Make sure all required fields are filled / ખાતરી કરો કે બધા જરૂરી ફીલ્ડ્સ ભરેલા છે
   - Check browser console for errors / ભૂલો માટે બ્રાઉઝર કન્સોલ તપાસો

3. **Calculations incorrect** / **ગણતરીઓ ખોટી**
   - Verify input values are numbers / ઇનપુટ વેલ્યુઝ નંબર છે કે નહીં તપાસો
   - Check discount percentage is between 0-100 / છૂટ ટકાવારી 0-100 વચ્ચે છે કે નહીં તપાસો

## Future Enhancements / ભવિષ્યના વિકાસ

- [ ] **Print functionality** / **પ્રિન્ટ ફંક્શનલિટી**
- [ ] **PDF export** / **PDF એક્સપોર્ટ**
- [ ] **Invoice templates** / **ઇન્વૉઇસ ટેમ્પ્લેટ્સ**
- [ ] **Customer management** / **કસ્ટમર મેનેજમેન્ટ**
- [ ] **Multiple currencies** / **બહુવિધ ચલણ**
- [ ] **Invoice numbering** / **ઇન્વૉઇસ નંબરિંગ**

## Contributing / યોગદાન

1. Fork the repository / રિપોઝિટરી ફોર્ક કરો
2. Create a feature branch / ફીચર બ્રાન્ચ બનાવો
3. Commit your changes / તમારા ફેરફારો કમિટ કરો
4. Push to the branch / બ્રાન્ચ પર પુશ કરો
5. Create a Pull Request / પુલ રિક્વેસ્ટ બનાવો

## License / લાઇસન્સ

This project is open source and available under the [MIT License](LICENSE).

આ પ્રોજેક્ટ ઓપન સોર્સ છે અને [MIT License](LICENSE) હેઠળ ઉપલબ્ધ છે.

## Support / સહાય

If you have any questions or need help, please:
જો તમારા કોઈ પ્રશ્નો હોય અથવા મદદની જરૂર હોય, તો કૃપા કરીને:

- Create an issue in the repository / રિપોઝિટરીમાં ઇશ્યુ બનાવો
- Contact the development team / ડેવલપમેન્ટ ટીમનો સંપર્ક કરો

---

**Happy Invoicing!** / **ખુશ બિલિંગ!** 🧾✨