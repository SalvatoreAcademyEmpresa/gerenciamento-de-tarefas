import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./test/reportWebVitals";
import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
