import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './cartSlice'; // Match this name!

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
  devTools: true,
});

export default store;