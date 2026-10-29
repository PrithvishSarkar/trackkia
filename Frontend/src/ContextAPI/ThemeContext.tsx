import React from "react";
import type { CreateThemeContext } from "@/interfaces.js";

/* ===== Creating and Exporting Context API ===== */
const ThemeContext = React.createContext<CreateThemeContext>({
  theme: "dark",
  setTheme: () => {},
});
export const useThemeContext = () => React.useContext(ThemeContext);

/* ===== Wrapping Context API Provider within a Functional Component ===== */
interface ThemeContextWrapperProp {
  children: React.ReactNode;
}
const ThemeContextWrapper = ({ children }: ThemeContextWrapperProp) => {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextWrapper;
