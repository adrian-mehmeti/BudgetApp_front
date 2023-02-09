import { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { emailRegex, passwordRegex } from '../../../lib/constants';
import api, { endpoints } from '../../../lib/api';
import { Link } from 'react-router-dom';
import MessageErrors from '../../ErrorHandlers';

function RegisterForm({ setRegistered }) {
  //useState
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = [];
    setErrorMessages(errors);

    if (!firstName) {
      errors.push('Please provide a first name ');
    }
    if (!lastName) {
      errors.push('Please provide a last name');
    }
    if (!emailRegex.test(email)) {
      errors.push('Please provide a valid email address');
    }
    if (password !== confirmPassword) {
      errors.push('Password doesnt match');
    }
    if (!passwordRegex.test(password)) {
      errors.push(
        'Password must be minimum eight characters, at least one letter and one number'
      );
    }
    if (!passwordRegex.test(confirmPassword)) {
      errors.push(
        'Confirm password must be minimum eight characters, at least one letter and one number'
      );
    }
    if (!telNumber) {
      errors.push('Please provide a telephone number');
    }

    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const response = await api.call(endpoints.register, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      telNumber,
    });

    if (!response.confirm) {
      setErrorMessages([response.results]);
      return;
    }

    setRegistered(true);
  };

  return (
    <Container>
      <h3 className="text-center mt-5">Register</h3>
      <Form onSubmit={handleSubmit}>
        {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value);
            }}
            placeholder="FirstName"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>LastName</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={e => {
              setLastName(e.target.value);
            }}
            placeholder="LastName"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
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

        <Form.Group className="mb-3" controlId="formBasicPassowrd">
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

        <Form.Group className="mb-3" controlId="formBasicPassowrd">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTelephoneNumber">
          <Form.Label>Telephone Number</Form.Label>
          <Form.Control
            type="text"
            value={telNumber}
            onChange={e => {
              setTelNumber(e.target.value);
            }}
            placeholder="Telephone Number"
          />
          <Link to="/login" className="text-secondary">
            If you have an account you can click here!
          </Link>
        </Form.Group>
        <Row className="d-flex justify-content-center">
          <Button className="col-lg-8" variant="dark" type="submit">
            Create
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default RegisterForm;
