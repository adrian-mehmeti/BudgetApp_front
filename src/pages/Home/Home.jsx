import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/Forms/Login';

function Home() {
  return (
    <div className="main">
      <Row>
        <h2 className="ms-5 mt-5">Welcome to Your Budget 30</h2>
      </Row>

      <Row>
        <Col md={7} className="customBorder">
          <p className="ms-5">
            If you dont have an account, you can create one by click the button
            create
          </p>
          <Row className="">
            <Link className="ms-5" to="/register">
              <Button variant="dark">Create an account</Button>
            </Link>
          </Row>
        </Col>
        <Col md={3} className="ms-5">
          <h3 className="text-center">Log In</h3>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
