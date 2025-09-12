import AuthForm from "./AuthForm.tsx";
import styles from "../cssModules/authForm.module.css";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux-toolkit/reduxStore.js";
import { setShowModal } from "../../redux-toolkit/reduxSlices/forgotPasswordSlice.js";

const AuthMain = ({ role }: { role: string }) => {
  const { theme } = useThemeContext();
  const isThemeDark: boolean = theme === "dark";
  const isRoleRegister = role === "register";

  const dispatch = useDispatch<AppDispatch>();

  const containerClassName = `d-flex flex-column align-items-stretch 
  justify-content-center gap-3 h-100 overflow-auto`;

  return (
    <div className={containerClassName}>
      <header
        className={`${styles.title} ${
          isThemeDark && styles.titleDarkStyle
        } fw-bold ps-3 m-0 align-self-center`}
      >
        Welcome{" "}
        <span className={`${!isRoleRegister ? "d-inline" : "d-none"}`}>
          Back
        </span>{" "}
        to Trackkia!!
      </header>
      <AuthForm isRoleRegister={isRoleRegister} isThemeDark={isThemeDark} />
      {!isRoleRegister && (
        <small
          role="button"
          className="px-3 text-primary text-decoration-underline"
          onClick={() => dispatch(setShowModal(true))}
        >
          Forgot Password
        </small>
      )}
      {isRoleRegister ? (
        <small
          className={`d-block text-center ${
            isThemeDark && styles.redirectEnquiryDarkStyle
          }`}
        >
          Already have an account? &nbsp; <Link to="/login">Login Here</Link>
        </small>
      ) : (
        <small
          className={`d-block text-center ${
            isThemeDark && styles.redirectEnquiryDarkStyle
          }`}
        >
          Using <b>Trackkia</b> for the first time? &nbsp;
          <Link to="/register">Register Here</Link>
        </small>
      )}
    </div>
  );
};

export default AuthMain;
