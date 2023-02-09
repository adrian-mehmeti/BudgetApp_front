import { Button, Form, Row, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api, { endpoints } from '../../../lib/api';
import MessageErrors from '../../ErrorHandlers';

function CreateOutcomes() {
  const token = useSelector(state => state.auth.value);
  const [nameOfOutcomes, setNameOfOutcomes] = useState('');
  const [value, setValue] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = [];
    setErrorMessages(errors);
    if (!nameOfOutcomes) {
      errors.push('Please fill the incomes monthly input');
    }
    if (!value) {
      errors.push('Please fill the value for incomes input');
    }
    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const response = await api.call(
      endpoints.createOutcomes,
      { nameOfOutcomes, value },
      token
    );

    if (!response.confirm) {
      setErrorMessages([response.results]);
      return;
    }

    navigate('/outcomes');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
      <Container className="col-lg-6">
        <Form.Group className="mt-4">
          <Form.Label>Name of outcomes</Form.Label>
          <Form.Control
            type="text"
            value={nameOfOutcomes}
            onChange={e => {
              setNameOfOutcomes(e.target.value);
            }}
            placeholder="Name of outcomes"
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="number"
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
            placeholder="Value"
          />
        </Form.Group>
        <Row className="mt-4 d-flex justify-content-center mb-5">
          <div className="col-lg-4">
            <Button type="submit" variant="dark" className="w-100">
              Create Outcomes
            </Button>
          </div>
        </Row>
      </Container>
    </Form>
  );
}

export default CreateOutcomes;
