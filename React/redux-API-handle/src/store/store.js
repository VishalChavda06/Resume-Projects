import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import wishlistSlice from './wishlistSlice';

export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
}); 