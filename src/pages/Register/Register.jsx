import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import RegisterForm from '../../components/Forms/Register';
function Register() {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div className="main">
      <Row className="d-flex justify-content-center">
        <Col md={4}>
          {isRegistered ? (
            <h2 className="mt-5">Please verify your account</h2>
          ) : (
            <RegisterForm setRegistered={setIsRegistered} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Register;
