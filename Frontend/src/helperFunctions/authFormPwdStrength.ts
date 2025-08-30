import type { AppDispatch } from "../redux-toolkit/reduxStore.js";
import {
  setPasswordStrength,
  setShowPasswordStrength,
  setPasswordStrengthColor,
} from "../redux-toolkit/reduxSlices/authFormSlice.js";

const authFormPwdStrength = (password: string, dispatch: AppDispatch) => {
  const length: number = password.length;
  if (length === 0) {
    dispatch(setShowPasswordStrength(false));
    dispatch(setPasswordStrength("no password"));
    dispatch(setPasswordStrengthColor("secondary"));
  } else {
    dispatch(setShowPasswordStrength(true));
    if (length < 8) {
      dispatch(setPasswordStrength("weak password"));
      dispatch(setPasswordStrengthColor("danger"));
    } else if (length >= 8 && length <= 12) {
      dispatch(setPasswordStrength("moderately strong password"));
      dispatch(setPasswordStrengthColor("warning"));
    } else {
      dispatch(setPasswordStrength("strong password"));
      dispatch(setPasswordStrengthColor("success"));
    }
  }
};

export default authFormPwdStrength;
