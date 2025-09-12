import styles from "../../Components/cssModules/authForm.module.css";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { MdWifiPassword } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux-toolkit/reduxStore.js";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";
import {
  setPassword,
  setShowPassword,
  setConfirmPassword,
  setShowConfirmPassword,
} from "../../redux-toolkit/reduxSlices/resetPasswordSlice.js";
import React from "react";
import resetPasswordStrength from "../../helperFunctions/resetPwdStrength.js";
import handleHideResetPwdModal from "../../helperFunctions/hideResetPwdModal.js";
import handleResetPwdSubmit from "../../helperFunctions/resetPwdSubmit.js";

const ResetPasswordModal = () => {
  const { theme } = useThemeContext();
  const isThemeDark = theme === "dark";

  const dispatch = useDispatch<AppDispatch>();

  const {
    displayModal,
    password,
    showPassword,
    passwordStrength,
    showPasswordStrength,
    passwordStrengthColor,
    confirmPassword,
    showConfirmPassword,
    loading,
  } = useSelector((state: RootState) => state.resetPassword);
  const { email } = useSelector((state: RootState) => state.forgotPassword);

  React.useEffect(() => {
    resetPasswordStrength(dispatch, password.length);
  }, [password]);

  return (
    <Modal
      centered
      show={displayModal}
      onHide={() => handleHideResetPwdModal(dispatch)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex flex-column align-items-stretch gap-3"
          onSubmit={(e: React.FormEvent) =>
            handleResetPwdSubmit(e, email, password, confirmPassword, dispatch)
          }
        >
          {/* Password Input Form Group */}
          <Form.Group controlId="password">
            <Form.Label className="fw-bold fst-italic fs-5 text-secondary">
              Password
            </Form.Label>
            <InputGroup>
              <InputGroup.Text
                className={`${isThemeDark && styles.inputGroupTextDarkStyle}`}
              >
                <MdWifiPassword className="fs-2" />
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                required
                maxLength={30}
                className={`${styles.formInput} text-success ${
                  isThemeDark && styles.formInputDarkStyle
                }`}
              />
              <InputGroup.Text
                role="button"
                className={`${isThemeDark && styles.inputGroupTextDarkStyle}`}
              >
                {showPassword ? (
                  <FaRegEye
                    className="fs-2"
                    onClick={() => dispatch(setShowPassword(false))}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="fs-2"
                    onClick={() => dispatch(setShowPassword(true))}
                  />
                )}
              </InputGroup.Text>
            </InputGroup>
            {showPasswordStrength && (
              <small
                className={`d-block text-end text-${passwordStrengthColor}`}
              >
                {passwordStrength}
              </small>
            )}
          </Form.Group>

          {/* Confirm Password Input Form Group */}
          <Form.Group controlId="confirm-password">
            <Form.Label className="fw-bold fst-italic fs-5 text-secondary">
              Confirm Password
            </Form.Label>
            <InputGroup>
              <InputGroup.Text
                className={`${isThemeDark && styles.inputGroupTextDarkStyle}`}
              >
                <MdWifiPassword className="fs-2" />
              </InputGroup.Text>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                required
                maxLength={30}
                className={`${styles.formInput} text-success ${
                  isThemeDark && styles.formInputDarkStyle
                }`}
              />
              <InputGroup.Text
                role="button"
                className={`${isThemeDark && styles.inputGroupTextDarkStyle}`}
              >
                {showConfirmPassword ? (
                  <FaRegEye
                    className="fs-2"
                    onClick={() => dispatch(setShowConfirmPassword(false))}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="fs-2"
                    onClick={() => dispatch(setShowConfirmPassword(true))}
                  />
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          {/* Reset Password Button */}
          <Button
            type="submit"
            variant="success"
            className="align-self-start"
            disabled={
              password.length === 0 ||
              confirmPassword.length === 0 ||
              password != confirmPassword ||
              loading
            }
          >
            Reset Password
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPasswordModal;
