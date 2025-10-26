// src/pages/ContactPage.jsx

import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState(null);

  const { name, email, subject, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(null);
    
    try {
      // *** USE HTTPS URL HERE ***
      await axios.post('https://faizan8108.pythonanywhere.com/api/contact/', formData);
      
      setResponseMessage({ type: 'success', text: 'Thank you for your message!' });
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setResponseMessage({ type: 'danger', text: 'Error sending message. Please try again.' });
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={6}>
          <h1>Contact Us</h1>
          <p>
            Have questions or want to partner with us? Fill out the form,
            and we'll get back to you.
          </p>
          {responseMessage && <Alert variant={responseMessage.type}>{responseMessage.text}</Alert>}
          
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" name="name" value={name} onChange={onChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={onChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" name="subject" value={subject} onChange={onChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} name="message" value={message} onChange={onChange} required />
            </Form.Group>
            <Button variant="primary" type="submit"> Send Message </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h4>Our Office</h4> <p>502 5th Floor, Sunshine Plaza, Kailash Lassi Lane, near Dadar Railway Station, Dadar East, Dadar, Mumbai, Maharashtra 400014</p>
          <h4>Email</h4> <p>faizan810819@gmail.com</p>
          <h4>Phone</h4> <p>+91 81081 95535</p>
          <div className="mt-4">
            <iframe
              src="https://maps.google.com/maps?q=new%20delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" height="300" style={{ border: 0 }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactPage;