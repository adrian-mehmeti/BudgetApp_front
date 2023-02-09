import withLayout from '../../hoc/withLayout';
import DisplayIncomes from '../../components/DisplayData/Incomes';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Incomes() {
  return (
    <Container className="my-container">
      <Row>
        <Col className="col-md-4">
          <h2 className="ms-4 mt-4">Incomes</h2>
        </Col>
      </Row>

      <Row className="row justify-content-center"></Row>

      <DisplayIncomes />
      <Col className="col-md-2">
        <h6>Create a category:</h6>
      </Col>
      <Col className="col-md-1 mb-4">
        <Link to="/incomes/create">
          <Button variant="dark">Create</Button>
        </Link>
      </Col>
    </Container>
  );
}

export default withLayout(Incomes);
