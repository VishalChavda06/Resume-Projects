# Mini E-Commerce Project with Redux Toolkit

A complete e-commerce application built with React, Redux Toolkit, and live API integration using FakeStore API.

## 🛍️ Features

- ✅ **Homepage** - Browse all products with live API data
- ✅ **Product Page** - Detailed product view with ratings and description
- ✅ **Cart Page** - Shopping cart with quantity management
- ✅ **Wishlist Page** - Save favorite products
- ✅ **Redux Toolkit** - State management with createSlice and createAsyncThunk
- ✅ **Live API Integration** - Using FakeStore API (https://fakestoreapi.com)
- ✅ **Modern UI** - Clean design with Tailwind CSS and React Icons
- ✅ **Responsive Design** - Works on all devices

## 🏗️ Project Structure

```
src/
├── store/
│   ├── store.js          # Redux store configuration
│   ├── productSlice.js   # Products state with API calls
│   ├── cartSlice.js      # Cart functionality
│   └── wishlistSlice.js  # Wishlist functionality
├── components/
│   ├── Header.jsx        # Navigation with counters
│   ├── HomePage.jsx      # Product listing
│   ├── ProductPage.jsx   # Product details
│   ├── CartPage.jsx      # Shopping cart
│   ├── WishlistPage.jsx  # Wishlist
│   └── ProductCard.jsx   # Product card component
└── App.jsx               # Main app with routing
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## 🎯 How to Use

1. **Browse Products**: View all products on the homepage
2. **View Details**: Click "View" on any product card
3. **Add to Cart**: Add products to your shopping cart
4. **Add to Wishlist**: Heart icon to save favorites
5. **Manage Cart**: Update quantities and remove items
6. **Checkout**: Proceed to checkout from cart page

## 🔧 Redux Toolkit Features Used

- **createSlice**: For managing product, cart, and wishlist state
- **createAsyncThunk**: For API calls to FakeStore API
- **configureStore**: For store setup
- **useSelector & useDispatch**: For component integration

## 📡 API Integration

Using **FakeStore API** (https://fakestoreapi.com):
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product

## 🛒 Redux State Structure

```javascript
{
  products: {
    products: [],           // All products
    selectedProduct: null,  // Current product detail
    loading: false,        // Loading state
    error: null           // Error state
  },
  cart: {
    items: [],            // Cart items
    total: 0             // Total price
  },
  wishlist: {
    items: []            // Wishlist items
  }
}
```

## 🎨 UI Features

- **Product Cards**: Clean design with image, title, price
- **Cart Management**: Quantity controls and total calculation
- **Wishlist**: Save and manage favorite products
- **Responsive Grid**: Adapts to different screen sizes
- **Loading States**: Spinner during API calls
- **Error Handling**: User-friendly error messages

## 🛠️ Technologies Used

- **React 19** - Frontend framework
- **Redux Toolkit** - State management
- **React Redux** - React-Redux integration
- **FakeStore API** - Live product data
- **Tailwind CSS** - Styling
- **React Icons** - Beautiful icons
- **Vite** - Build tool

## 📱 Pages

1. **Homepage** (`/`) - Product catalog
2. **Product Page** (`/product/:id`) - Product details
3. **Cart Page** (`/cart`) - Shopping cart
4. **Wishlist Page** (`/wishlist`) - Saved products

Enjoy shopping with Redux Toolkit! 🛍️✨
