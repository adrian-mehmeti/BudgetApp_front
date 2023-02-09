import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import withLayout from '../../hoc/withLayout';
import DisplayOutcomes from '../../components/DisplayData/Outcomes';

function Outcomes() {
  return (
    <Container className="my-container">
      <Row>
        <Col className="col-md-4">
          <h2 className="ms-4 mt-4">Outcomes</h2>
        </Col>
      </Row>

      <Row className="row justify-content-center"></Row>

      <DisplayOutcomes />
      <Col className="col-md-2">
        <h6>Create Outcomes:</h6>
      </Col>
      <Col className="col-md-1 mb-4">
        <Link to="/outcomes/create">
          <Button variant="dark">Create</Button>
        </Link>
      </Col>
    </Container>
  );
}

export default withLayout(Outcomes);
