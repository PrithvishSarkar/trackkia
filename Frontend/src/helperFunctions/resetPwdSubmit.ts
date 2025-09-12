import { toast } from "react-toastify";
import {
  setLoading,
  setPassword,
  setConfirmPassword,
  setDisplayModal,
} from "../redux-toolkit/reduxSlices/resetPasswordSlice.js";
import { setEmail } from "../redux-toolkit/reduxSlices/forgotPasswordSlice.js";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";
import type React from "react";

const handleResetPwdSubmit = async (
  e: React.FormEvent,
  email: string,
  password: string,
  confirmPassword: string,
  dispatch: AppDispatch
) => {
  e.preventDefault();

  dispatch(setLoading(true));

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const RESET_PWD_PATH = import.meta.env.VITE_RESET_PWD_PATH;
  const API_CALL_URL = BACKEND_URL + RESET_PWD_PATH;

  const response = await (
    await fetch(API_CALL_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmPassword }),
    })
  ).json();

  switch (response.status) {
    case "failure":
      toast.error(response.message);
      break;
    case "success":
      toast.success(response.message);
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setConfirmPassword(""));
      dispatch(setDisplayModal(false));
      break;
    default:
      break;
  }

  dispatch(setLoading(false));
};

export default handleResetPwdSubmit;
