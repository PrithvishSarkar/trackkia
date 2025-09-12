import {
  setShowModal,
  setUserId,
  setEmail,
  setOtp,
} from "../redux-toolkit/reduxSlices/forgotPasswordSlice.js";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";

const handleHideForgotPwdModal = (dispatch: AppDispatch) => {
  dispatch(setEmail(""));
  dispatch(setOtp(""));
  dispatch(setUserId(-1));
  dispatch(setShowModal(false));
};

export default handleHideForgotPwdModal;