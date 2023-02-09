import { Form, Button, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import api, { endpoints } from '../../../lib/api';
import { useDispatch } from 'react-redux';
import { login, setRole } from '../../../lib/store/slices/authSlice';
import MessageErrors from '../../ErrorHandlers';

function LoginForm() {
  //useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  //dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = [];
    setErrorMessages(errors);

    if (!email) {
      errors.push('Please provide an email');
    }
    if (!password) {
      errors.push('Please provide an password');
    }

    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    //make a call to endpoints
    const response = await api.call(endpoints.login, { email, password });
    if (!response.confirm) {
      setErrorMessages([response.results]);
      return;
    }

    if (response.results.role === 'ADMIN') {
      dispatch(login(response.results.token));
      dispatch(setRole(response.results.role));
      navigate('/dashboard');
    } else {
      dispatch(login(response.results.token));
      dispatch(setRole(response.results.role));
      navigate('/mainpage');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            placeholder="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
        </Form.Group>
        <Link to={'/forgot-password'} className="text-secondary">
          Forgot password
        </Link>
        <Row className="d-flex justify-content-center mt-4">
          <Button className="col-lg-8" variant="dark" type="submit">
            Log in
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default LoginForm;
