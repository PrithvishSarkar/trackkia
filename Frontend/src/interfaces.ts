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

export interface AuthFormProp {
  isRoleRegister: boolean;
  isThemeDark: boolean;
}

export interface AddEditTaskFormProp {
  isThemeDark: boolean;
  use: "add" | "edit";
}

export type TaskPriority = "Low Priority" | "Medium Priority" | "High Priority";
export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface TaskCardProp {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  startingDate: string;
  deadline: string;
  preview: boolean;
}