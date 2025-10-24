// src/pages/VolunteerPage.jsx

import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function VolunteerPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState(null); 

  const submitHandler = async (e) => {
    e.preventDefault(); 
    setMessage(null); 

    try {
      // *** USE HTTPS URL HERE ***
      const response = await axios.post('https://faizan8108.pythonanywhere.com/api/volunteer/', {
        full_name: fullName,
        email: email,
        reason: reason,
      });

      setMessage({ type: 'success', text: 'Thank you for applying!' });
      setFullName('');
      setEmail('');
      setReason('');
      
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      setMessage({ type: 'danger', text: 'There was an error. Please try again.' });
    }
  };

  return (
    <Container>
      <h1>Volunteer With Us</h1>
      <p>Fill out the form below to express your interest.</p>
      
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="fullName" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="reason" className="mb-3">
          <Form.Label>Why do you want to volunteer?</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Application
        </Button>
      </Form>
    </Container>
  );
}

export default VolunteerPage;