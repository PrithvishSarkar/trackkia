import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ForgotPasswordSliceInitialState as InitialStateInterface } from "@/interfaces.js";

const initialState: InitialStateInterface = {
  showModal: false,
  email: "",
  otp: "",
  userId: -1,
  sendOtpBtnLoading: false,
  verifyOtpBtnLoading: false,
};

const forgotPwdSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    setShowModal: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.showModal = action.payload;
    },
    setEmail: (state: InitialStateInterface, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setOtp: (state: InitialStateInterface, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setUserId: (
      state: InitialStateInterface,
      action: PayloadAction<number>,
    ) => {
      state.userId = action.payload;
    },
    setSendOtpBtnLoading: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.sendOtpBtnLoading = action.payload;
    },
    setVerifyOtpBtnLoading: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.verifyOtpBtnLoading = action.payload;
    },
    reset: (state: InitialStateInterface) => {
      state.showModal = false;
      state.email = "";
    },
  },
});

export const {
  setShowModal,
  setEmail,
  setOtp,
  setUserId,
  setSendOtpBtnLoading,
  setVerifyOtpBtnLoading,
  reset,
} = forgotPwdSlice.actions;

export default forgotPwdSlice.reducer;
