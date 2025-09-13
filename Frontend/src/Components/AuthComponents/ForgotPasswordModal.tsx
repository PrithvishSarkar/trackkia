import styles from "../../Components/cssModules/authForm.module.css";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux-toolkit/reduxStore.js";
import {
  setEmail,
  setOtp,
} from "../../redux-toolkit/reduxSlices/forgotPasswordSlice.js";
import handleSendOtp from "../../helperFunctions/sendOtp.js";
import handleResendOtp from "../../helperFunctions/resendOtp.js";
import handleVerifyOtp from "../../helperFunctions/verifyOtp.js";
import handleHideForgotPwdModal from "../../helperFunctions/hideForgotPwdModal.js";

const PwdResetModal = () => {
  const { theme } = useThemeContext();
  const isThemeDark: boolean = theme === "dark";

  const {
    showModal,
    email,
    otp,
    sendOtpBtnLoading,
    verifyOtpBtnLoading,
    userId,
  } = useSelector((state: RootState) => state.forgotPassword);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Modal
      show={showModal}
      onHide={() => handleHideForgotPwdModal(dispatch)}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>OTP Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column align-items-stretch gap-3">
          {/* User Email Input */}
          <Form.Group controlId="email">
            <Form.Label className="fw-bold fst-italic fs-5 text-secondary">
              Email
            </Form.Label>
            <InputGroup>
              <InputGroup.Text
                className={`${isThemeDark && styles.inputGroupTextDarkStyle}`}
              >
                <MdAlternateEmail className="fs-2" />
              </InputGroup.Text>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="something@example.com"
                required
                disabled={userId !== -1}
                maxLength={50}
                className={`${styles.formInput} text-success ${
                  isThemeDark && styles.formInputDarkStyle
                }`}
              />
            </InputGroup>
          </Form.Group>

          <section className="d-flex align-items-center justify-content-between">
            {/* Send OTP Button */}
            <Button
              variant="success"
              onClick={() => handleSendOtp(email, dispatch)}
              disabled={sendOtpBtnLoading}
            >
              Send OTP
            </Button>

            {/* Resend OTP Button */}
            <Button
              variant="success"
              disabled={userId === -1 || sendOtpBtnLoading}
              onClick={() => handleResendOtp(dispatch, email, userId)}
            >
              Resend OTP
            </Button>
          </section>

          {/* Enter OTP Input */}
          <Form.Group controlId="otp">
            <Form.Label className="fw-bold fst-italic fs-5 text-secondary">
              Enter OTP
            </Form.Label>
            <InputGroup>
              <InputGroup.Text
                className={`${isThemeDark && styles.inputGroupTextDarkStyle}`}
              >
                <RiLockPasswordLine className="fs-2" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                maxLength={4}
                disabled={userId === -1}
                value={otp}
                onChange={(e) => dispatch(setOtp(e.target.value))}
                className={`${styles.formInput} text-success ${
                  isThemeDark && styles.formInputDarkStyle
                }`}
              />
            </InputGroup>
          </Form.Group>

          {/* Verify OTP Button */}
          <Button
            variant="success"
            className="align-self-start"
            disabled={otp.length < 4 || verifyOtpBtnLoading}
            onClick={() => handleVerifyOtp(otp, userId, dispatch)}
          >
            Verify OTP
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PwdResetModal;
