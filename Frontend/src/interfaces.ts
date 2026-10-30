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

// Register and Login Form Component
export interface AuthFormProp {
  isRoleRegister: boolean;
  isThemeDark: boolean;
}

// Add and Edit Task Form Component
export interface AddEditTaskFormProp {
  isThemeDark: boolean;
  use: "add" | "edit";
}

// Add and Edit Form Component (or Task Card) Task's Priority and Status
export type TaskPriority = "Low Priority" | "Medium Priority" | "High Priority";
export type TaskStatus = "Pending" | "In Progress" | "Completed";

// Task Card Component
export interface TaskCardProp {
  id: number;
  title: string;
  description: string;
  priority: string | TaskPriority;
  status: TaskStatus;
  startingDate: string;
  deadline: string;
  preview: boolean;
}

// 