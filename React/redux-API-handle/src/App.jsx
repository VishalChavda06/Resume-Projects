
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedProductId(null);
  };

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedProductId(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onViewProduct={handleViewProduct} />;
      case 'product':
        return <ProductPage onBack={handleBackToHome} productId={selectedProductId} />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage onViewProduct={handleViewProduct} />;
      default:
        return <HomePage onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
