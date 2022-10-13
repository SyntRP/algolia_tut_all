import React from "react";
import ReactDOM from "react-dom/client";
import "instantsearch.css/themes/satellite.css";
import "@algolia/autocomplete-theme-classic";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
