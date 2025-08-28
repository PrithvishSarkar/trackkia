import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import ThemeContextWrapper from "./ContextAPI/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextWrapper>
        <App />
      </ThemeContextWrapper>
    </BrowserRouter>
  </StrictMode>
);
