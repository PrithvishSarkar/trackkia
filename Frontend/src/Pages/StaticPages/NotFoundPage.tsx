import styles from "../../Components/cssModules/notFound.module.css";
import { Col, Image, Row } from "react-bootstrap";
import Layout from "../../Components/LayoutComponents/Layout.tsx";
import { Link } from "react-router";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";

const NotFoundPage = () => {
  const { theme } = useThemeContext();
  const isThemeDark: boolean = theme === "dark";

  return (
    <Layout>
      <Row className="h-100 overflow-auto">
        <Col className={styles.col} xs={12} md={6}>
          <Image
            src="/not-found-image-transparent.png"
            alt="not-found-image"
            style={{ maxWidth: "90%" }}
          />
        </Col>
        <Col className={styles.col} xs={12} md={6}>
          <p
            role="description"
            className={`${styles.description} ${
              isThemeDark && styles.descriptionDarkStyle
            }`}
          >
            Seems you're lost <br /> in the woods...
          </p>
          <Link
            to="/"
            className="text-decoration-none fs-4 fw-semibold px-3 py-1 border-0 rounded-pill bg-primary text-light"
          >
            Go Home
          </Link>
        </Col>
      </Row>
    </Layout>
  );
};

export default NotFoundPage;
