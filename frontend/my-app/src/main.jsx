top-centre { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </StrictMode>
  </Provider>
);
