// src/components/Header.jsx

// --- IMPORTS ARE NEEDED HERE ---
import React from 'react'; // Import React (though often implicit now)
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// --- END IMPORTS ---

function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  // The 'return' statement MUST be INSIDE the function
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          NGO Website
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Using mx-3 for spacing */}
            <Nav.Link as={Link} to="/" className="mx-3">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-3">About Us</Nav.Link>
            <Nav.Link as={Link} to="/projects" className="mx-3">Projects</Nav.Link>
            <Nav.Link as={Link} to="/blog" className="mx-3">Blog</Nav.Link>
            <Nav.Link as={Link} to="/media" className="mx-3">Media</Nav.Link>
            <Nav.Link as={Link} to="/volunteer" className="mx-3">Volunteer</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-3">Contact</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                <Nav.Link disabled style={{ color: 'rgba(255,255,255,.75)' }} className="me-2">
                  Hi, {user?.username || 'Admin'}
                </Nav.Link>
                <Button variant="outline-light" size="sm" onClick={handleLogout} className="me-3">
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="mx-3">Login</Nav.Link>
            )}
            <Link to="/donate">
              <Button variant="success">Donate Now</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;