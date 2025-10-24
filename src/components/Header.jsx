// src/components/Header.jsx

import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

function Header() {
  const { isLoggedIn, user, logout } = useAuth(); // 2. Get state and logout function
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    logout(); // Call the logout function from context
    // The logout function in context already handles redirecting
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">NGO Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/media">Media</Nav.Link>
            <Nav.Link as={Link} to="/volunteer">Volunteer</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            {/* 3. Conditional Rendering for Login/Logout */}
            {isLoggedIn ? (
              // If logged in, show username and Logout button
              <>
                <Nav.Link disabled style={{ color: 'rgba(255,255,255,.75)' }}>
                  Hi, {user?.username || 'Admin'}
                </Nav.Link>
                <Button variant="link" onClick={handleLogout} style={{ color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>
                  Logout
                </Button>
              </>
            ) : (
              // If not logged in, show Login link
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>

          <Link to="/donate" className="ms-3">
            <Button variant="success">Donate Now</Button>
          </Link>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;