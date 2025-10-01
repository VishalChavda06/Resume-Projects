import { createSlice } from '@reduxjs/toolkit';

// Initial state for the counter
const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Increments the counter by 1
    increment: (state) => {
      state.value += 1;
    },
    // Decrements the counter by 1
    decrement: (state) => {
      state.value -= 1;
    },
    // Increments the counter by a specific amount
    addByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Selector for accessing the counter value
export const selectCounterValue = (state) => state.counter.value;

export const { increment, decrement, addByAmount } = counterSlice.actions;
export default counterSlice.reducer; 