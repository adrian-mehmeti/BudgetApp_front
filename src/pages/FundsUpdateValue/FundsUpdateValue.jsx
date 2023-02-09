import UpdateValueFunds from '../../components/UpdateValueFunds';
import withLayout from '../../hoc/withLayout';
import { Container, Row, Col } from 'react-bootstrap';
function FundsUpdateValue() {
  return (
    <Container className="my-container">
      <Row>
        <Col className="col-md-4">
          <h2 className="ms-4 mt-4 mb-5">Update value for funds</h2>
        </Col>
      </Row>
      <UpdateValueFunds />
    </Container>
  );
}
export default withLayout(FundsUpdateValue);
