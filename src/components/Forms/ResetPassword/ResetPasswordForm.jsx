import { Button, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import { passwordRegex } from '../../../lib/constants';
import api, { endpoints } from '../../../lib/api';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageErrors from '../../ErrorHandlers';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const { search } = useLocation();
  const [query] = useState(new URLSearchParams(search));

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = [];
    setErrorMessages(errors);
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
        'Password must be minimum eight characters, at least one letter and one number'
      );
    }

    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const response = await api.call(endpoints.resetPassword, {
      token: query.get('token'),
      password,
      confirmPassword,
    });
    if (!response.confirm) {
      setErrorMessages(['Something went wrong']);
    }
    navigate('/');
  };
  return (
    <Form onSubmit={handleSubmit}>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}
      <Form.Group className="mb-3" controlId="formBasicPassword">
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
      <Form.Group className="mb-3" controlId="formBasicConfrimPassword">
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
      <Row className="d-flex justify-content-center mt-4">
        <Button className="col-lg-8" type="submit" variant="dark">
          Reset
        </Button>
      </Row>
    </Form>
  );
}

export default ResetPasswordForm;
