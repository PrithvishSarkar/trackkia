import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  passwordStrength: string;
  showPasswordStrength: boolean;
  passwordStrengthColor: string;
  loading: boolean;
}

const initialState: InitialStateType = {
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
    setName: (state: InitialStateType, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state: InitialStateType, action: PayloadAction<string>) => {
      state.email = action.payload;
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
    setLoading: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reset: (state: InitialStateType) => {
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
