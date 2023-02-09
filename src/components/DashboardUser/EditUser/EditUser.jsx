import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api, { endpoints } from '../../../lib/api';
import { useParams } from 'react-router-dom';
import { emailRegex } from '../../../lib/constants';
import MessageErrors from '../../ErrorHandlers';

function EditUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  let { id } = useParams();
  const token = useSelector(state => state.auth.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await api.call(
        {
          url: endpoints.getUsers.url + `/${id}`,
          method: endpoints.getUsers.method,
        },
        {},
        token
      );
      setFirstName(response.results.firstName);
      setLastName(response.results.lastName);
      setEmail(response.results.email);
      setTelNumber(response.results.telNumber);
    };
    getData();
  }, [token, id]);

  const updateUser = async () => {
    const errors = [];
    setErrorMessages(errors);

    if (!firstName) {
      errors.push('Please provide a first name');
    }
    if (!lastName) {
      errors.push('Please provide a last name');
    }
    if (!emailRegex.test(email)) {
      errors.push('Please provide a valid email address');
    }
    if (!telNumber) {
      errors.push('Please a provide a telefon number');
    }

    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const response = await api.call(
      {
        url: endpoints.updateUser.url + `/${id}`,
        method: endpoints.updateUser.method,
      },
      { firstName, lastName, email, telNumber },
      token
    );

    if (!response.confirm) {
      setErrorMessages(['Something went wrong']);
    }

    navigate('/dashboard');
  };

  return (
    <Form>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
      <h2 className="ms-4 mt-4">Edit User</h2>
      <Container className="col-lg-6">
        <Form.Group className="mt-4">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value);
            }}
            placeholder="First Name"
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={e => {
              setLastName(e.target.value);
            }}
            placeholder="Last name"
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Telephone Number</Form.Label>
          <Form.Control
            type="text"
            value={telNumber}
            onChange={e => {
              setTelNumber(e.target.value);
            }}
            placeholder="Telephone Number"
          />
        </Form.Group>

        <Row className="mt-4 d-flex justify-content-center mb-5">
          <div className="col-lg-4">
            <Link to="/dashboard">
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
                updateUser();
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

export default EditUser;
