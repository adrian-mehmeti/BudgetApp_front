import { Row, Col, Container } from 'react-bootstrap';
import LoginForm from '../../components/Forms/Login';
function Login() {
  return (
    <Container>
      <h2 className="text-center mt-5">Login</h2>
      <Row className="d-flex justify-content-center">
        <Col md={4}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
