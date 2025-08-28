// import React from 'react';
import styles from "../cssModules/layout.module.css";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";
import { Container, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { MdDarkMode } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
// import { Link } from "react-router";

const NavbarComponent = () => {
  const { theme, setTheme } = useThemeContext();
  return (
    <Navbar
      expand="lg"
      fixed="top"
      collapseOnSelect={true}
    >
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
        <Navbar.Offcanvas
          id="navbar-offcanvas"
          placement="end"
          aria-labelledby="offcanvasNavbarLabel"
          className={`${theme === "dark" && styles.navbarOffcanvasDarkStyle}`}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Page Navigation
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>{/* Vital Links Here */}</Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <div style={{ fontSize: "1.5rem" }}>
          <Navbar.Toggle
            aria-controls="navbar-offcanvas"
            className={`bg-transparent border-0 ${
              theme === "dark" && styles.navbarToggleBtnDarkStyle
            }`}
          >
            <FaBarsStaggered />
          </Navbar.Toggle>{" "}
          {theme === "light" ? (
            <MdLightMode role="button" onClick={() => setTheme("dark")} />
          ) : (
            <MdDarkMode
              role="button"
              className={`${theme === "dark" && styles.navbarThemeBtnDarkMode}`}
              onClick={() => setTheme("light")}
            />
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
