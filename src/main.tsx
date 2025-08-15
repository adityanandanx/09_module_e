import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter, Link, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Link to={"/09_module_e"}>Go to app</Link>
          </div>
        }
      />
      <Route path="/09_module_e" element={<App />} />
    </Routes>
  </BrowserRouter>
);
