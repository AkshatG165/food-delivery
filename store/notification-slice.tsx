import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type actionPayload = { type: string; message: string };
type notificationType = { notification: actionPayload };

const initialState: notificationType = {
  notification: { type: '', message: '' },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<actionPayload>) {
      state.notification = {
        type: action.payload.type,
        message: action.payload.message,
      };
    },
    hideNotification(state) {
      state.notification = initialState.notification;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice;
