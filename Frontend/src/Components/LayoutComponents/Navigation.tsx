import type { ReactElement } from "react";
import styles from "../cssModules/layout.module.css";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";
import { Container, Image, Navbar, Offcanvas } from "react-bootstrap";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { useUserNameContext } from "../../ContextAPI/UserNameContext.tsx";
import { Link, useLocation, useNavigate } from "react-router";
import { IoMdAddCircle } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import logoutUser from "../../helperFunctions/logoutUser.js";
import nameToInitials from "../../helperFunctions/nameToInitials.js";

const NavbarComponent = () => {
  const { theme, setTheme } = useThemeContext();

  const { userName, setUserName } = useUserNameContext();
  const isAuthenticated: boolean = userName !== "";

  const { pathname }: { pathname: string } = useLocation();

  const navigate = useNavigate();

  const initials: string = !isAuthenticated ? "" : nameToInitials(userName);

  return (
    <Navbar expand="lg" fixed="top" collapseOnSelect={true}>
      <Container fluid>
        <Navbar.Brand
          href="/"
          className="d-flex gap-1 align-items-center justify-content-between"
        >
          <Image src="/favicon-32x32.png" alt="logo" />{" "}
          <span
            className={`fw-bold ${
              theme === "light"
                ? "text-primary"
                : styles.navbarBrandTextDarkStyle
            }`}
            style={{ fontSize: "1.5rem" }}
          >
            Trakkia
          </span>
        </Navbar.Brand>
        {isAuthenticated && (
          <Navbar.Offcanvas
            id="navbar-offcanvas"
            placement="end"
            aria-labelledby="offcanvasNavbarLabel"
            className={`${theme === "dark" && styles.navbarOffcanvasDarkStyle}`}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <span className="p-2 bg-danger text-light fw-bold rounded-pill">
                  {initials}
                </span>{" "}
                <span>{userName.split(" ")[0]}</span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              className={`d-flex flex-column flex-lg-row 
                justify-content-lg-evenly gap-3 fs-5`}
            >
              {[
                {
                  text: "Add Task",
                  to: "/add-tasks",
                  icon: <IoMdAddCircle />,
                },
                {
                  text: "All Tasks",
                  to: "/all-tasks",
                  icon: <FaClipboardCheck />,
                },
                {
                  text: "Analytics",
                  to: "/analytics",
                  icon: <FaChartPie />,
                },
              ].map(
                (
                  linkData: { text: string; to: string; icon: ReactElement },
                  index: number
                ) => (
                  <Link
                    to={linkData.to}
                    key={index}
                    className={`text-decoration-none flex-lg-grow-1 
                    text-secondary fw-bold ${
                      linkData.to === pathname &&
                      "border-bottom border-2 border-success text-success"
                    } d-flex align-items-center justify-content-center gap-1`}
                  >
                    {linkData.text} {linkData.icon}
                  </Link>
                )
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        )}
        <div
          style={{ fontSize: "1.5rem" }}
          className="d-flex align-items-center justify-content-center"
        >
          <Navbar.Toggle
            aria-controls="navbar-offcanvas"
            className={`bg-transparent border-0 ${
              theme === "dark" && styles.navbarToggleBtnDarkStyle
            }`}
          >
            <FaBarsStaggered />
          </Navbar.Toggle>
          <span
            className={`d-none d-lg-inline px-1 me-2 bg-danger text-light 
              fw-bold rounded-pill`}
          >
            {initials}
          </span>
          {theme === "light" ? (
            <MdLightMode role="button" onClick={() => setTheme("dark")} />
          ) : (
            <MdDarkMode
              role="button"
              className={`${theme === "dark" && styles.navbarThemeBtnDarkMode}`}
              onClick={() => setTheme("light")}
            />
          )}
          {isAuthenticated && (
            <MdLogout
              role="button"
              className="ms-2 text-danger"
              onClick={() => logoutUser(navigate, setUserName)}
            />
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
