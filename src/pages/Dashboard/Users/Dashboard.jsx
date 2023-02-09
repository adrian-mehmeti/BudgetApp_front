import withLayout from '../../../hoc/withLayout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DisplayUser from '../../../components/DashboardUser/DisplayUser';
function Dashboard() {
  return (
    <Container className="my-container">
      <Row>
        <Col className="col-md-4">
          <h2 className="ms-4 mt-4 mb-5">Dashboard User</h2>
        </Col>
      </Row>

      <DisplayUser />

      <Row className="row justify-content-start">
        <Col className="col-md-3">
          <Link to="/user/create">
            <Button variant="dark" className="mb-5 mt-3">
              Create
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default withLayout(Dashboard);
