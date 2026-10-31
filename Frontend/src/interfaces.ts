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
export type TaskPriority =
  | "--SELECT--"
  | "Low Priority"
  | "Medium Priority"
  | "High Priority";
export type TaskStatus = "Pending" | "In Progress" | "Completed";

// Task Card Component
export interface TaskCardProp {
  id: number;
  title: string;
  description: string;
  priority: Exclude<TaskPriority, "--SELECT--">;
  status: TaskStatus;
  startingDate: string;
  deadline: string;
  preview: boolean;
}

/* ===== React Redux and Toolkit Interfaces ===== */
// Authentication Form Slice
export interface AuthFormSliceInitialState {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  passwordStrength: string;
  showPasswordStrength: boolean;
  passwordStrengthColor: string;
  loading: boolean;
}

// Edit Task Modal Display Slice
export interface EditTaskModalDisplaySliceInitialState {
  showEditModal: boolean;
  taskId: number;
}

// Task Add or Edit Form Slice
export interface TaskAddOrEditFormSliceInitialState extends Pick<
  TaskCardProp,
  "title" | "description" | "deadline"
> {
  priority: TaskPriority;
  loading: boolean;
}

// Fetch All Tasks Slice
export interface TaskDetail extends Omit<TaskCardProp, "preview"> {}
export interface GetAllTasksSliceInitialState {
  totalTasks: number;
  totalPages: number;
  pageNumber: number;
  taskList: TaskDetail[];
}

// Fetch Task Analytics Slice
export interface StatusAnalytics {
  name: TaskStatus;
  value: number;
}
export interface PriorityAnalytics {
  name: Exclude<TaskPriority, "--SELECT--">;
  value: number;
}
export interface GetTaskAnalyticsSliceInitialState {
  statusAnalytics: StatusAnalytics[];
  priorityAnalytics: PriorityAnalytics[];
  totalTasks: number;
}

// Forgot Password Slice
export interface ForgotPasswordSliceInitialState {
  showModal: boolean;
  email: string;
  otp: string;
  userId: number;
  sendOtpBtnLoading: boolean;
  verifyOtpBtnLoading: boolean;
}

// Reset Password Slice
export interface ResetPasswordSliceInitialState {
  displayModal: boolean;
  password: string;
  showPassword: boolean;
  passwordStrength: string;
  showPasswordStrength: boolean;
  passwordStrengthColor: string;
  confirmPassword: string;
  showConfirmPassword: boolean;
  loading: boolean;
}
