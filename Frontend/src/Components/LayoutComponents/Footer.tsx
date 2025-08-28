import { FaHeart } from "react-icons/fa";
import styles from "../cssModules/layout.module.css";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";

const Footer = () => {
  const { theme } = useThemeContext();
  return (
    <footer className="w-100 position-fixed bottom-0 text-center fst-italic opacity-75 py-1">
      <small className={`${theme === "dark" && styles.footerTextDarkStyle}`}>
        Made with <FaHeart color="red" /> by Prithvish Sarkar
      </small>
    </footer>
  );
};

export default Footer;
