import { toast } from "react-toastify";
import {
  setUserId,
  setSendOtpBtnLoading,
} from "../redux-toolkit/reduxSlices/forgotPasswordSlice.js";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";

const handleSendOtp = async (email: string, dispatch: AppDispatch) => {
  dispatch(setSendOtpBtnLoading(true));

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const SEND_OTP_PATH = import.meta.env.VITE_SEND_OTP_PATH;
  const API_CALL_URL = BACKEND_URL + SEND_OTP_PATH;

  const response = await (
    await fetch(API_CALL_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "text/plain" },
      body: email,
    })
  ).json();

  switch (response.status) {
    case "failure":
      toast.error(response.message);
      response.userId && dispatch(setUserId(response.userId));
      break;
    case "success":
      toast.success(response.message);
      dispatch(setUserId(response.userId));
      break;
    default:
      break;
  }

  dispatch(setSendOtpBtnLoading(false));
};

export default handleSendOtp;
