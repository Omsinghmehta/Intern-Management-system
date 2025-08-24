import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { items: [] },
  reducers: {
    addNotification: (state, action) => {
      // action.payload: { roomId, sender, message, time }
      state.items.push({ id: Date.now(), ...action.payload });
    },
    clearNotifications: (state) => {
      state.items = [];
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter(n => n.id !== action.payload);
    },
  },
});

export const { addNotification, clearNotifications, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
