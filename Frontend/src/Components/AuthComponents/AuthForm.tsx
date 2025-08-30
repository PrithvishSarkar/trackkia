import React from "react";
import styles from "../../Components/cssModules/authForm.module.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { MdAlternateEmail, MdWifiPassword } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setPassword,
  setShowPassword,
} from "../../redux-toolkit/reduxSlices/authFormSlice.js";
import type { RootState, AppDispatch } from "../../redux-toolkit/reduxStore.js";
import { useNavigate } from "react-router";
import handleSubmit from "../../helperFunctions/authFormSubmit.js";
import authFormPwdStrength from "../../helperFunctions/authFormPwdStrength.js";

const AuthForm = ({
  isRoleRegister,
  isThemeDark,
}: {
  isRoleRegister: boolean;
  isThemeDark: boolean;
}) => {
  /*========================
  Redux Toolkit Hooks Starts
  ========================*/
  const dispatch = useDispatch<AppDispatch>();
  const {
    name,
    email,
    password,
    showPassword,
    passwordStrength,
    showPasswordStrength,
    passwordStrengthColor,
  } = useSelector((state: RootState) => state.authForm);
  /*======================
  Redux Toolkit Hooks Ends
  ======================*/

  React.useEffect(() => {
    authFormPwdStrength(password, dispatch);
  }, [password]);

  const navigate = useNavigate(); // Programmatically navigating to another route.

  const formLabelStyle = "fw-bold fst-italic fs-5 text-secondary";

  return (
    <Form
      className="p-3 d-flex flex-column align-items-stretch justify-content-between gap-3"
      onSubmit={(e) =>
        handleSubmit(
          e,
          isRoleRegister,
          name,
          email,
          password,
          dispatch,
          navigate
        )
      }
    >
      {/* Full Name Form Group */}
      {isRoleRegister && (
        <Form.Group controlId="full-name">
          <Form.Label className={formLabelStyle}>Full Name</Form.Label>
          <InputGroup>
            <InputGroup.Text
              className={`${isThemeDark && styles.inputGroupTextDarkStyle}`}
            >
              <CgProfile className="fs-2" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              placeholder="Sanjay Prasad"
              required
              className={`${styles.formInput} text-success ${
                isThemeDark && styles.formInputDarkStyle
              }`}
            />
          </InputGroup>
        </Form.Group>
      )}

      {/* Email Form Group */}
      <Form.Group controlId="email">
        <Form.Label className={formLabelStyle}>Email</Form.Label>
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
            className={`${styles.formInput} text-success ${
              isThemeDark && styles.formInputDarkStyle
            }`}
          />
        </InputGroup>
      </Form.Group>

      {/* Password Form Group */}
      <Form.Group controlId="password">
        <Form.Label className={formLabelStyle}>Password</Form.Label>
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
        {(showPasswordStrength && isRoleRegister) && (
          <small className={`d-block text-end text-${passwordStrengthColor}`}>
            {passwordStrength}
          </small>
        )}
      </Form.Group>

      {/* Register Button */}
      <Button variant="success" className="align-self-start" type="submit">
        <span className="fs-5">{isRoleRegister ? "Register" : "Login"}</span>
        &nbsp;
        <LuLogIn className="fs-2" />
      </Button>
    </Form>
  );
};

export default AuthForm;
