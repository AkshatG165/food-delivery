import { CartItem } from '@/model/CartItem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type stateType = {
  cart: CartItem[];
};

const initialState: stateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      if (state.cart.some((item) => item.id === action.payload.id)) {
        state.cart.forEach((item) => {
          if (item.id === action.payload.id) item.quantity += 1;
        });
      } else state.cart.push(action.payload);
    },
    removeItem(state, action) {
      state.cart.forEach((item) => {
        if (item.id === action.payload.id) item.quantity -= 1;
      });
      state.cart = state.cart.filter((item) => item.quantity > 0);
    },
  },
});

export default cartSlice;
