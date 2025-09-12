import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
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

const initialState: InitialStateType = {
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
      state: InitialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.displayModal = action.payload;
    },
    setPassword: (state: InitialStateType, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setShowPassword: (
      state: InitialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.showPassword = action.payload;
    },
    setPasswordStrength: (
      state: InitialStateType,
      action: PayloadAction<string>
    ) => {
      state.passwordStrength = action.payload;
    },
    setShowPasswordStrength: (
      state: InitialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.showPasswordStrength = action.payload;
    },
    setPasswordStrengthColor: (
      state: InitialStateType,
      action: PayloadAction<string>
    ) => {
      state.passwordStrengthColor = action.payload;
    },
    setConfirmPassword: (
      state: InitialStateType,
      action: PayloadAction<string>
    ) => {
      state.confirmPassword = action.payload;
    },
    setShowConfirmPassword: (
      state: InitialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.showConfirmPassword = action.payload;
    },
    setLoading: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reset: (state: InitialStateType) => {
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
