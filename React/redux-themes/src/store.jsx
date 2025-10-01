import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice.jsx';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store; 