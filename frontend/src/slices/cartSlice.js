import { createSlice } from '@reduxjs/toolkit';

// Try to get existing cart data from localStorage so the cart doesn't 
// empty out when you refresh the page.
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if the item is already in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If it exists, replace it with the new version (updates quantity)
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If it's new, add it to the array
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate Prices
      const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      state.itemsPrice = itemsPrice.toFixed(2);
      
      // Calculate Shipping (Free over $100, else $10)
      state.shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
      
      // Calculate Tax (15%)
      state.taxPrice = (0.15 * itemsPrice).toFixed(2);
      
      // Total Price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Save the entire cart state to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // We will add removeFromCart here later!
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;