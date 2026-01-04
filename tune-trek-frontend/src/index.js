import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ GLOBAL STYLES (GRADIENT THEME)
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
