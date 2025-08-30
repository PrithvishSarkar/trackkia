import { Col, Image, Row } from "react-bootstrap";
import AuthMain from "../../Components/AuthComponents/AuthMain.js";
import Layout from "../../Components/LayoutComponents/Layout.js";

const LoginPage = () => {
  return (
    <Layout>
      <Row className="h-100 overflow-auto">
        <Col xs={12} md={6}>
          <AuthMain role="login" />
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-none d-md-flex flex-column justify-content-center align-items-stretch"
        >
          <Image src="/auth-page-image.jpg" alt="auth-page-image" />
        </Col>
      </Row>
    </Layout>
  );
};

export default LoginPage;
