import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage if available
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [] };
  }
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: loadState(),
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      // Save to localStorage
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      // Save to localStorage
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
      // Save to localStorage
      localStorage.setItem('cartState', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
