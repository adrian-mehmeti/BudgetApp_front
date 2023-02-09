import withLayout from '../../hoc/withLayout';
import { Container, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import DisplayInOut from '../../components/DisplayData/MainPage';
import { useState } from 'react';

function Mainpage() {
  const [currentBalance, setCurrentBalance] = useState(0);
  return (
    <Container className="my_container">
      <Row className="">
        <Col className="col-md-4">
          <h2 className="ms-4 mt-4">Home</h2>
        </Col>
      </Row>
      <Row className="row justify-content-end mt-5 mb-5 row">
        <Col className="col-md-3">
          <h5>Current balance of {format(new Date(), 'dd-MM-yyyy')}</h5>
        </Col>
        <Col className="col-md-1">
          <h5>{currentBalance} €</h5>
        </Col>
        <DisplayInOut setBalance={setCurrentBalance} />
      </Row>
    </Container>
  );
}

export default withLayout(Mainpage);
