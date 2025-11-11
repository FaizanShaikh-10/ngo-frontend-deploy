// src/pages/LoginPage.jsx

import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
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
      const response = await axios.post(
        'https://faizan8108.pythonanywhere.com/api/login/',
        { username, password }
      );

      const token = response.data.token;
      login(token);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Invalid username or password.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="p-4 shadow-lg">
            <Card.Body>
              <h1 className="text-center mb-4">Login</h1>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Email / Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email or username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-2 w-100">
                  Login
                </Button>
              </Form>

              {/* ✅ Forgot Password */}
              <div className="text-center mt-3">
                <Link to="/reset-password">Forgot Password?</Link>
              </div>

              {/* ✅ Register Link */}
              <div className="text-center mt-2">
                <p>
                  New user? <Link to="/register">Create an account</Link>
                </p>
              </div>

              {/* ✅ Admin shortcut */}
              <div className="text-center mt-2">
                <small>
                  Are you an admin? <a href="https://faizan8108.pythonanywhere.com/admin">Go to Admin Panel</a>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
