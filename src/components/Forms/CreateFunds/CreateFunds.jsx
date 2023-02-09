import { Button, Form, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api, { endpoints } from '../../../lib/api';
import MessageErrors from '../../ErrorHandlers';

function CreateFunds() {
  const token = useSelector(state => state.auth.value);
  const [nameOfFunds, setNameOfFunds] = useState('');
  const [maxValueToEarn, setMaxValueToEarn] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [persentMonthly, setPersentMonthly] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = [];
    setErrorMessages(errors);
    if (!nameOfFunds) {
      errors.push('Please fill the name of funds input');
    }
    if (!maxValueToEarn) {
      errors.push('Please fill the value for funds input');
    }
    if (!currentValue) {
      errors.push('Please fill the current value for funds');
    }
    if (!persentMonthly) {
      errors.push('Please fill the persent monthly for funds');
    }
    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const response = await api.call(
      endpoints.createFunds,
      { nameOfFunds, maxValueToEarn, currentValue, persentMonthly },
      token
    );

    if (!response.confirm) {
      setErrorMessages([response.results]);
      return;
    }

    navigate('/funds');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
      <Container className="col-lg-6">
        <Form.Group className="mt-4">
          <Form.Label>Name of funds</Form.Label>
          <Form.Control
            type="text"
            value={nameOfFunds}
            onChange={e => {
              setNameOfFunds(e.target.value);
            }}
            placeholder="Name of funds"
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="number"
            value={maxValueToEarn}
            onChange={e => {
              setMaxValueToEarn(e.target.value);
            }}
            placeholder="Max value to earn"
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="number"
            value={currentValue}
            onChange={e => {
              setCurrentValue(e.target.value);
            }}
            placeholder="Current value"
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="number"
            value={persentMonthly}
            onChange={e => {
              setPersentMonthly(e.target.value);
            }}
            placeholder="Persent Monthly"
          />
        </Form.Group>
        <Row className="mt-4 d-flex justify-content-center mb-5">
          <div className="col-lg-4">
            <Button type="submit" variant="dark" className="w-100">
              Create Funds
            </Button>
          </div>
        </Row>
      </Container>
    </Form>
  );
}

export default CreateFunds;
