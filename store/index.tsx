import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';

const store = configureStore({
  reducer: cartSlice.reducer,
});

export const { addItem, removeItem } = cartSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
