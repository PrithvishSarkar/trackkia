import { toast } from "react-toastify";
import { setSendOtpBtnLoading } from "../redux-toolkit/reduxSlices/forgotPasswordSlice.js";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";

const handleResendOtp = async (
  dispatch: AppDispatch,
  email: string,
  userId: number
) => {
  dispatch(setSendOtpBtnLoading(true));

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const RESEND_OTP_PATH = import.meta.env.VITE_RESEND_OTP_PATH;
  const API_CALL_URL = BACKEND_URL + RESEND_OTP_PATH;

  const response = await (await fetch(API_CALL_URL, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, userId }),
  })).json();

  switch (response.status) {
    case "failure":
      toast.error(response.message);
      break;
    case "success":
      toast.success(response.message);
      break;
    default: break;
  }

  dispatch(setSendOtpBtnLoading(false));
};

export default handleResendOtp;