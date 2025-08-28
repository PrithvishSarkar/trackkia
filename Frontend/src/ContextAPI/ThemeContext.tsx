import React from "react";

interface CreateContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
const ThemeContext = React.createContext<CreateContextType>({
  theme: "",
  setTheme: () => {},
});
export const useThemeContext = () => React.useContext(ThemeContext);

// Theme Context Wrapper Component.
interface ThemeContextWrapperType {
  children: React.ReactNode;
}
const ThemeContextWrapper: React.FC<ThemeContextWrapperType> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextWrapper;
