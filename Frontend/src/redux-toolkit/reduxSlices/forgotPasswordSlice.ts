import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  showModal: boolean;
  email: string;
  otp: string;
  userId: number;
  sendOtpBtnLoading: boolean;
  verifyOtpBtnLoading: boolean;
}

const initialState: InitialStateType = {
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
    setShowModal: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setEmail: (state: InitialStateType, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setOtp: (state: InitialStateType, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setUserId: (state: InitialStateType, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setSendOtpBtnLoading: (
      state: InitialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.sendOtpBtnLoading = action.payload;
    },
    setVerifyOtpBtnLoading: (
      state: InitialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.verifyOtpBtnLoading = action.payload;
    },
    reset: (state: InitialStateType) => {
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
