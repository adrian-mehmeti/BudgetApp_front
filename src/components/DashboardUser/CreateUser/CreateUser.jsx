import { Button, Form, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api, { endpoints } from '../../../lib/api';
import { emailRegex, passwordRegex } from '../../../lib/constants';
import MessageErrors from '../../ErrorHandlers';

function CreateUser() {
  const token = useSelector(state => state.auth.value);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

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
    if (password !== confirmPassword) {
      errors.push('Password doesnt match ');
    }
    if (!passwordRegex.test(password)) {
      errors.push(
        'Password must be minimum eight characters, at least one letter and one number'
      );
    }
    if (!passwordRegex.test(confirmPassword)) {
      errors.push(
        'Confirm Password must be minimum eight characters, at least one letter and one number'
      );
    }
    if (!telNumber) {
      errors.push('Please a provide a telefon number');
    }

    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const response = await api.call(
      endpoints.createUser,
      { firstName, lastName, email, password, confirmPassword, telNumber },
      token
    );

    if (response.errors) {
      setErrorMessages([response.errors[0].msg]);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm password"
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
            <Button type="submit" variant="dark" className="w-100">
              Create User
            </Button>
          </div>
        </Row>
      </Container>
    </Form>
  );
}

export default CreateUser;
