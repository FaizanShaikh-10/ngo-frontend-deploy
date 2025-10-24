// src/pages/LoginPage.jsx

import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const { login } = useAuth();    

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // *** USE HTTPS URL HERE ***
      const response = await axios.post('https://faizan8108.pythonanywhere.com/api/login/', {
        username: username, 
        password: password,
      });

      const token = response.data.token;
      console.log('Login successful, token:', token);
      login(token); 
      navigate('/dashboard'); 

    } catch (err) {
      console.error('Login failed:', err);
      if (err.response && err.response.status === 400) {
        setError('Invalid username or password.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

   return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h1>Admin Login</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100"> Login </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;