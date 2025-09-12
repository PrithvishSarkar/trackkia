import type { AppDispatch } from "../redux-toolkit/reduxStore.js";
import {
  setOtp,
  setUserId,
  setVerifyOtpBtnLoading,
  setShowModal,
} from "../redux-toolkit/reduxSlices/forgotPasswordSlice.js";
import { setDisplayModal } from "../redux-toolkit/reduxSlices/resetPasswordSlice.js";
import { toast } from "react-toastify";

const handleVerifyOtp = async (
  otp: string,
  userId: number,
  dispatch: AppDispatch
) => {
  dispatch(setVerifyOtpBtnLoading(true));

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const VERIFY_OTP_PATH = import.meta.env.VITE_VERIFY_OTP_PATH;
  const API_CALL_URL = BACKEND_URL + VERIFY_OTP_PATH;

  const response = await (
    await fetch(API_CALL_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, userId }),
    })
  ).json();

  switch (response.status) {
    case "failure":
      toast.error(response.message);
      break;
    case "success":
      toast.success(response.message);
      dispatch(setOtp(""));
      dispatch(setUserId(-1));
      dispatch(setShowModal(false));
      dispatch(setDisplayModal(true));
      break;
    default:
      break;
  }

  dispatch(setVerifyOtpBtnLoading(false));
};

export default handleVerifyOtp;
