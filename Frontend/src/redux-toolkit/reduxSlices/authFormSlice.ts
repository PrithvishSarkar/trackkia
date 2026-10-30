import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthFormSliceInitialState as InitialStateInterface } from "@/interfaces.js";

const initialState: InitialStateInterface = {
  name: "",
  email: "",
  password: "",
  showPassword: false,
  passwordStrength: "",
  showPasswordStrength: false,
  passwordStrengthColor: "",
  loading: false,
};

const authFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    setName: (state: InitialStateInterface, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state: InitialStateInterface, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (
      state: InitialStateInterface,
      action: PayloadAction<string>,
    ) => {
      state.password = action.payload;
    },
    setShowPassword: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.showPassword = action.payload;
    },
    setPasswordStrength: (
      state: InitialStateInterface,
      action: PayloadAction<string>,
    ) => {
      state.passwordStrength = action.payload;
    },
    setShowPasswordStrength: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.showPasswordStrength = action.payload;
    },
    setPasswordStrengthColor: (
      state: InitialStateInterface,
      action: PayloadAction<string>,
    ) => {
      state.passwordStrengthColor = action.payload;
    },
    setLoading: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.loading = action.payload;
    },
    reset: (state: InitialStateInterface) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.showPassword = false;
      state.passwordStrength = "";
      state.showPasswordStrength = false;
      state.passwordStrengthColor = "";
      state.loading = false;
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setShowPassword,
  setPasswordStrength,
  setShowPasswordStrength,
  setPasswordStrengthColor,
  setLoading,
  reset,
} = authFormSlice.actions;

export default authFormSlice.reducer;
