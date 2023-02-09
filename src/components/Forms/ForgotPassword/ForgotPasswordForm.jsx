import { Button, Form, Row } from 'react-bootstrap';
import { emailRegex } from '../../../lib/constants';
import React, { useState } from 'react';
import api, { endpoints } from '../../../lib/api';
import MessageErrors from '../../ErrorHandlers';

function ForgotPasswordForm({ setSend }) {
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = [];
    setErrorMessages(errors);
    if (!emailRegex.test(email)) {
      errors.push('Please provide a valid email adress');
    }

    if (errorMessages.length) {
      setErrorMessages(errors);
      return;
    }

    const response = await api.call(endpoints.requestPasswordReset, { email });
    if (!response.confirm) {
      setErrorMessages(['Please provide a valid email adress']);
      return;
    }

    setSend(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessages.length > 0 && <MessageErrors errors={errorMessages} />}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Row className="d-flex justify-content-center mt-4">
        <Button className="col-lg-8 mt-3" type="submit" variant="dark">
          Submit
        </Button>
      </Row>
    </Form>
  );
}

export default ForgotPasswordForm;
