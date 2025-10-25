// src/components/Header.jsx

import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-3"> {/* Added padding top/bottom */}
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold"> {/* Made Brand bold */}
          NGO Website
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Use me-auto to push everything else to the right */}
          <Nav className="me-auto">
            {/* Add mx-2 for horizontal margin around each link */}
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2">About Us</Nav.Link>
            <Nav.Link as={Link} to="/projects" className="mx-2">Projects</Nav.Link>
            <Nav.Link as={Link} to="/blog" className="mx-2">Blog</Nav.Link>
            <Nav.Link as={Link} to="/media" className="mx-2">Media</Nav.Link>
            <Nav.Link as={Link} to="/volunteer" className="mx-2">Volunteer</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-2">Contact</Nav.Link>
          </Nav>

          {/* Keep Auth links and Donate button separate on the right */}
          <Nav className="ms-auto align-items-center"> {/* Use ms-auto and align items */}
            {isLoggedIn ? (
              <>
                <Nav.Link disabled style={{ color: 'rgba(255,255,255,.75)' }} className="me-2"> {/* Margin end */}
                  Hi, {user?.username || 'Admin'}
                </Nav.Link>
                <Button variant="outline-light" size="sm" onClick={handleLogout} className="me-3"> {/* Margin end */}
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="mx-2">Login</Nav.Link>
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