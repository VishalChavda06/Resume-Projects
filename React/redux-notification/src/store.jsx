import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice.jsx';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store; 