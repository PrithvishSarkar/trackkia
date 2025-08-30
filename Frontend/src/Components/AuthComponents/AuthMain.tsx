import AuthForm from "./AuthForm.tsx";
import styles from "../cssModules/authForm.module.css";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";
import { Link } from "react-router";

const AuthMain = ({ role }: { role: string }) => {
  const { theme } = useThemeContext();
  const isThemeDark: boolean = theme === "dark";
  const isRoleRegister = role === "register";

  return (
    <div className="d-flex flex-column align-items-stretch justify-content-center gap-3 h-100 overflow-auto">
      <header
        className={`${styles.title} ${
          isThemeDark && styles.titleDarkStyle
        } fw-bold ps-3 m-0 align-self-center`}
      >
        Welcome to Trackkia!!
      </header>
      <AuthForm isRoleRegister={isRoleRegister} isThemeDark={isThemeDark} />
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
