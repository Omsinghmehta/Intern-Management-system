import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeChatRoomId: null, // which chat screen is open right now
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChatRoomId = action.payload; // e.g. "internId-managerId"
    },
    clearActiveChat: (state) => {
      state.activeChatRoomId = null;
    },
  },
});

export const { setActiveChat, clearActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
