import type { AppDispatch } from "../redux-toolkit/reduxStore";
import {
  setShowPasswordStrength,
  setPasswordStrength,
  setPasswordStrengthColor,
} from "../redux-toolkit/reduxSlices/resetPasswordSlice.js";

const resetPasswordStrength = (dispatch: AppDispatch, passwordLength: number) => {
  if (passwordLength === 0) {
    dispatch(setShowPasswordStrength(false));
    dispatch(setPasswordStrength("no password"));
    dispatch(setPasswordStrengthColor("secondary"));
  } else {
    dispatch(setShowPasswordStrength(true));
    if (passwordLength < 8) {
      dispatch(setPasswordStrength("weak password"));
      dispatch(setPasswordStrengthColor("danger"));
    } else if (passwordLength >= 8 && passwordLength <= 12) {
      dispatch(setPasswordStrength("moderately strong password"));
      dispatch(setPasswordStrengthColor("warning"));
    } else {
      dispatch(setPasswordStrength("strong password"));
      dispatch(setPasswordStrengthColor("success"));
    }
  }
};

export default resetPasswordStrength;
