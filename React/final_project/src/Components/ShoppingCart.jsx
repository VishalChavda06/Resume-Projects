import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/ShoppingCart.css';

const ShoppingCart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart, isOpen, closeCart } = useCart();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (agreedToTerms) {
      // Implement checkout logic here
      console.log('Proceeding to checkout...');
    } else {
      alert('Please agree to the Terms & Conditions');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="shopping-cart-overlay" onClick={closeCart}>
      <div className="shopping-cart" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="close-button" onClick={closeCart}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="free-shipping-banner">
          <div className="shipping-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <span>Congratulations! You've got free shipping!</span>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button className="continue-shopping-btn" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.id}-${item.selectedColor}-${index}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-size">Size C</p>
                  <div className="item-actions">
                    <div className="quantity-selector">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="item-price">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Icons */}
        <div className="action-icons">
          <div className="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Note</span>
          </div>
          <div className="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span>Shipping</span>
          </div>
          <div className="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>Coupon</span>
          </div>
        </div>

        {/* Subtotal and Checkout */}
        {items.length > 0 && (
          <div className="checkout-section">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span className="subtotal-amount">${getCartTotal().toFixed(2)}</span>
            </div>
            
            <div className="terms-checkbox">
              <label>
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span>I agree with Terms & Conditions</span>
              </label>
            </div>

            <div className="checkout-buttons">
              <button className="view-cart-btn" onClick={closeCart}>
                View Cart
              </button>
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={!agreedToTerms}
              >
                Check Out
              </button>
            </div>

            <button className="continue-shopping-link" onClick={closeCart}>
              Or continue shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;

