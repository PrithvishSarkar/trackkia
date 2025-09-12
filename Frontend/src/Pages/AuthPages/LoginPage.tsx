import { Col, Image, Row } from "react-bootstrap";
import AuthMain from "../../Components/AuthComponents/AuthMain.tsx";
import Layout from "../../Components/LayoutComponents/Layout.tsx";
import ForgotPwdModal from "../../Components/AuthComponents/ForgotPasswordModal.tsx";
import ResetPwdModal from "../../Components/AuthComponents/ResetPasswordModal.tsx";

const LoginPage = () => {
  return (
    <Layout>
      {/* Modal for Password Reset starts here */}
      <ForgotPwdModal />
      <ResetPwdModal />
      {/* Modal for Password Reset ends here */}
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
