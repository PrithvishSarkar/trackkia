import styles from "../../Components/cssModules/landing.module.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import Layout from "../../Components/LayoutComponents/Layout.tsx";
import { Link } from "react-router";
import { MdOutlineLogin } from "react-icons/md";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";
import { useUserNameContext } from "../../ContextAPI/UserNameContext.tsx";

const LandingPage = () => {
  const { theme } = useThemeContext();
  const isThemeDark: boolean = theme === "dark";

  const { userName } = useUserNameContext();
  const isAuthenticated: boolean = userName !== "";
  
  return (
    <Layout>
      <Row className="h-100 overflow-auto">
        <Col xs lg={6}>
          <Container
            fluid
            style={{ userSelect: "none" }}
            className={`h-100 overflow-auto d-flex flex-column justify-content-center 
              align-items-start gap-5`}
          >
            <p
              className="border border-secondary rounded-pill px-3 text-secondary"
              style={{ fontSize: "0.875rem" }}
            >
              Get started now and experience stress-free organization
            </p>
            <p
              role="title"
              className={`fw-bold ps-3 ${styles.title} ${
                isThemeDark && styles.titleDarkStyle
              }`}
              style={{ fontSize: "3rem", lineHeight: "1.2" }}
            >
              Start Organizing
              <br />
              Your Life Today
            </p>
            <p
              role="description"
              className={`${styles.description} ${
                isThemeDark && styles.descriptionDarkStyle
              }`}
              style={{ maxWidth: "90%", fontSize: "1.25rem", lineHeight: "1" }}
            >
              Take control of your tasks and boost your productivity with our
              intuitive Task Manager
            </p>
            {!isAuthenticated && (
              <div>
                <Link
                  to="/login"
                  className={`${styles.linkStyle} bg-primary text-light`}
                >
                  Login <MdOutlineLogin />
                </Link>
                <Link
                  to="/register"
                  className={`${styles.linkStyle} text-primary`}
                >
                  Register <MdOutlineLogin />
                </Link>
              </div>
            )}
          </Container>
        </Col>
        <Col lg={6} className={styles.imageContainer}>
          <Image
            src="/landing-page-image-transparent.jpg"
            alt="landing-page-image"
            style={{ maxWidth: "100%" }}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default LandingPage;
