import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ResetPasswordSliceInitialState as InitialStateInterface } from "@/interfaces.js";

const initialState: InitialStateInterface = {
  displayModal: false,
  password: "",
  showPassword: false,
  passwordStrength: "",
  showPasswordStrength: false,
  passwordStrengthColor: "",
  confirmPassword: "",
  showConfirmPassword: false,
  loading: false,
};

const resetPwdSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setDisplayModal: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.displayModal = action.payload;
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
    setConfirmPassword: (
      state: InitialStateInterface,
      action: PayloadAction<string>,
    ) => {
      state.confirmPassword = action.payload;
    },
    setShowConfirmPassword: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.showConfirmPassword = action.payload;
    },
    setLoading: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.loading = action.payload;
    },
    reset: (state: InitialStateInterface) => {
      state.password = "";
      state.confirmPassword = "";
    },
  },
});

export const {
  setDisplayModal,
  setPassword,
  setShowPassword,
  setPasswordStrength,
  setShowPasswordStrength,
  setPasswordStrengthColor,
  setConfirmPassword,
  setShowConfirmPassword,
  setLoading,
  reset,
} = resetPwdSlice.actions;

export default resetPwdSlice.reducer;
