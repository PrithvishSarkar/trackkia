import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import ThemeContextWrapper from "./ContextAPI/ThemeContext.tsx";
import UserNameContextWrapper from "./ContextAPI/UserNameContext.tsx";
import store from "./redux-toolkit/reduxStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeContextWrapper>
          <UserNameContextWrapper>
            <App />
          </UserNameContextWrapper>
        </ThemeContextWrapper>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
