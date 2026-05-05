import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import { IconContext } from "@phosphor-icons/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <IconContext.Provider value={{ size: 20, weight: "regular" }}>
        <App />
      </IconContext.Provider>
    </BrowserRouter>
  </StrictMode>
);
