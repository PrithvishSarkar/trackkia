import type React from "react";

// Theme Context API
export interface CreateThemeContext {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

// Username Context API
export interface CreateUserNameContext {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}