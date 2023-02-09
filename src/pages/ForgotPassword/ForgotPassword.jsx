import ForgotPasswordForm from '../../components/Forms/ForgotPassword';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
function ForgotPassword() {
  const [sendEmail, setSendEmail] = useState(false);
  return (
    <Container>
      {sendEmail ? (
        <Row className="d-flex justify-content-center mt-5">
          <h4 className=" mt-5">Please check email ...</h4>
        </Row>
      ) : (
        <>
          <h2 className="text-center mt-5">Forgot Password</h2>
          <Row className="d-flex justify-content-center mt-5">
            <Col md={4}>
              <ForgotPasswordForm setSend={setSendEmail} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default ForgotPassword;
