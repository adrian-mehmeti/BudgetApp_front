import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api, { endpoints } from '../../../lib/api';
import { useParams } from 'react-router-dom';
import MessageErrors from '../../ErrorHandlers';

function EditForm() {
  const [nameOfFunds, setNameOfFunds] = useState('');
  const [maxValueToEarn, setMaxValueToEarn] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [persentMonthly, setPersentMonthly] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  let { id } = useParams();
  const token = useSelector(state => state.auth.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(
        {
          url: endpoints.getFunds.url + `/${id}`,
          method: endpoints.getFunds.method,
        },
        {},
        token
      );
      setNameOfFunds(response.results.nameOfFunds);
      setMaxValueToEarn(response.results.maxValueToEarn);
      setCurrentValue(response.results.currentValue);
      setPersentMonthly(response.results.persentMonthly);
    };
    getData();
  }, [token, id]);

  const updateFunds = async () => {
    const errors = [];
    setErrorMessages(errors);

    if (!nameOfFunds) {
      errors.push('Name of fund can not be empty');
    }

    if (!maxValueToEarn) {
      errors.push('Max value can not be empty');
    }

    if (!currentValue) {
      errors.push('Current value can not be empty');
    }

    if (!persentMonthly) {
      errors.push('Persent monthly can not be empty');
    }

    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const response = await api.call(
      {
        url: endpoints.updateFunds.url + `/${id}`,
        method: endpoints.updateFunds.method,
      },
      { nameOfFunds, maxValueToEarn, currentValue, persentMonthly },
      token
    );

    if (!response.confirm) {
      setErrorMessages(['Something went wrong']);
      return;
    }

    navigate('/funds');
  };

  return (
    <Form>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
      <h2 className="ms-4 mt-4">Edit Funds</h2>
      <Container className="col-lg-6">
        <Form.Group>
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

        <Form.Group>
          <Form.Label>Value to earn</Form.Label>
          <Form.Control
            type="number"
            value={maxValueToEarn}
            onChange={e => {
              setMaxValueToEarn(e.target.value);
            }}
            placeholder="Max value"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Current value</Form.Label>
          <Form.Control
            type="number"
            value={currentValue}
            onChange={e => {
              setCurrentValue(e.target.value);
            }}
            placeholder="Max value"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Persent Monthly</Form.Label>
          <Form.Control
            type="number"
            value={persentMonthly}
            onChange={e => {
              setPersentMonthly(e.target.value);
            }}
            placeholder="Max value"
          />
        </Form.Group>

        <Row className="mt-4 d-flex justify-content-center mb-5">
          <div className="col-lg-4">
            <Link to="/funds">
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
                updateFunds();
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
