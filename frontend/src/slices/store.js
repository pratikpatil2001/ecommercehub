import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './cartSlice'; // Match this name!
import authReducer from './authSlice';
const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    auth: authReducer,
  },
  devTools: true,
});

export default store;