import {
  setDisplayModal,
  setPassword,
  setConfirmPassword,
} from "../redux-toolkit/reduxSlices/resetPasswordSlice.js";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";

const handleHideResetPwdModal = (dispatch: AppDispatch) => {
  dispatch(setDisplayModal(false));
  dispatch(setPassword(""));
  dispatch(setConfirmPassword(""));
};

export default handleHideResetPwdModal;
