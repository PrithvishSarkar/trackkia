import { Row, Col, Image } from "react-bootstrap";
import Layout from "../../Components/LayoutComponents/Layout.tsx";
import AuthMain from "../../Components/AuthComponents/AuthMain.tsx";

const RegisterPage = () => {
  return (
    <Layout>
      <Row className="h-100 overflow-auto">
        <Col xs={12} md={6}>
          <AuthMain role="register" />
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

export default RegisterPage;
