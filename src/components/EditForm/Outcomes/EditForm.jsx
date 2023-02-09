import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api, { endpoints } from '../../../lib/api';
import { useParams } from 'react-router-dom';
import MessageErrors from '../../ErrorHandlers';

function EditForm() {
  const [nameOfOutcomes, setNameOfOutcomes] = useState('');
  const [value, setValue] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  let { id } = useParams();
  const token = useSelector(state => state.auth.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(
        {
          url: endpoints.getOutcomes.url + `/${id}`,
          method: endpoints.getOutcomes.method,
        },
        {},
        token
      );
      setNameOfOutcomes(response.results.nameOfOutcomes);
      setValue(response.results.value);
    };
    getData();
  }, [id, token]);

  const updateOutcomes = async () => {
    const errors = [];
    setErrorMessages(errors);

    if (!nameOfOutcomes) {
      errors.push('Name of Outcomes can not be empty');
    }

    if (!value) {
      errors.push('Value can not be empty');
    }

    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const response = await api.call(
      {
        url: endpoints.updateOutcomes.url + `/${id}`,
        method: endpoints.updateOutcomes.method,
      },
      { nameOfOutcomes, value },
      token
    );

    if (!response.confirm) {
      setErrorMessages(['Something went wrong']);
      return;
    }

    navigate('/outcomes');
  };

  return (
    <Form>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
      <h2 className="ms-4 mt-4">Edit Incomes</h2>
      <Container className="col-lg-6">
        <Form.Group>
          <Form.Label>Name of outcomes</Form.Label>
          <Form.Control
            type="text"
            value={nameOfOutcomes}
            onChange={e => {
              setNameOfOutcomes(e.target.value);
            }}
            placeholder="Name Of Outcomes"
          />
        </Form.Group>

        <Form.Group className="mt-3">
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
            <Link to="/outcomes">
              <Button variant="dark" className="w-100 mb-1">
                Cancel
              </Button>
            </Link>
          </div>
          <div className="col-lg-4">
            <Button
              className="w-100"
              variant="dark"
              onClick={() => {
                updateOutcomes();
              }}
            >
              Update
            </Button>
          </div>
        </Row>
      </Container>
    </Form>
  );
}

export default EditForm;
