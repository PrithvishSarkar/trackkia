import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  passwordStrength: string;
  showPasswordStrength: boolean;
  passwordStrengthColor: string;
}

const initialState: initialStateType = {
  name: "",
  email: "",
  password: "",
  showPassword: false,
  passwordStrength: "",
  showPasswordStrength: false,
  passwordStrengthColor: "",
};

const authFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    setName: (state: initialStateType, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state: initialStateType, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state: initialStateType, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setShowPassword: (
      state: initialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.showPassword = action.payload;
    },
    setPasswordStrength: (
      state: initialStateType,
      action: PayloadAction<string>
    ) => {
      state.passwordStrength = action.payload;
    },
    setShowPasswordStrength: (
      state: initialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.showPasswordStrength = action.payload;
    },
    setPasswordStrengthColor: (
      state: initialStateType,
      action: PayloadAction<string>
    ) => {
      state.passwordStrengthColor = action.payload;
    },
    reset: (state: initialStateType) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.showPassword = false;
      state.passwordStrength = "";
      state.showPasswordStrength = false;
      state.passwordStrengthColor = "";
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
  reset,
} = authFormSlice.actions;

export default authFormSlice.reducer;
