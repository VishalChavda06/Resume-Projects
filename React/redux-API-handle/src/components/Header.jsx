import React from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaHeart, FaHome } from 'react-icons/fa';

const Header = ({ currentPage, onPageChange }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-800">Mini Shop</h1>
            <nav className="flex space-x-6">
              <button
                onClick={() => onPageChange('home')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  currentPage === 'home'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaHome />
                <span>Home</span>
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onPageChange('wishlist')}
              className="relative flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <FaHeart />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => onPageChange('cart')}
              className="relative flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <FaShoppingCart />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 