// src/components/Header.jsx
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-3">
      <Container>
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Light After Rain
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* LEFT NAV */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ marginRight: "1.5rem" }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ marginRight: "1.5rem" }}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/projects" style={{ marginRight: "1.5rem" }}>
              Projects
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" style={{ marginRight: "1.5rem" }}>
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/media" style={{ marginRight: "1.5rem" }}>
              Media
            </Nav.Link>
            <Nav.Link as={Link} to="/volunteer" style={{ marginRight: "1.5rem" }}>
              Volunteer
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" style={{ marginRight: "1.5rem" }}>
              Contact
            </Nav.Link>
          </Nav>

          {/* RIGHT NAV */}
          <Nav className="ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                {/* Show Username */}
                <Nav.Link
                  disabled
                  style={{ color: "rgba(255,255,255,.75)", marginRight: "1rem" }}
                >
                  Hi, {user?.username || "User"}
                </Nav.Link>

                {/* Logout */}
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={logout}
                  className="me-3"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Register */}
                <Nav.Link
                  as={Link}
                  to="/register"
                  style={{ marginRight: "1.5rem" }}
                >
                  Register
                </Nav.Link>

                {/* Login */}
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={{ marginRight: "1.5rem" }}
                >
                  Login
                </Nav.Link>
              </>
            )}

            {/* Donate */}
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
