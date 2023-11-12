import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import MyProvider from "./context/provider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </MyProvider>
);
