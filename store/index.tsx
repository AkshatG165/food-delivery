import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';
import notificationSlice from './notification-slice';

const store = configureStore({
  reducer: { cart: cartSlice.reducer, notification: notificationSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
