import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notificationsReducer from "./notificationsSlice";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    chat: chatReducer,
  },
});

export default store;
