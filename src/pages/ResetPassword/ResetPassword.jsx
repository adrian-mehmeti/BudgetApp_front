import { Container, Row, Col } from 'react-bootstrap';
import ResetPasswordForm from '../../components/Forms/ResetPassword';

function ResetPassword() {
  return (
    <Container>
      <h2 className="text-center mt-5">ResetPassword</h2>
      <Row className="d-flex justify-content-center">
        <Col md={4}>
          <ResetPasswordForm />
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
