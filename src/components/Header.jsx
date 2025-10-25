// src/components/Header.jsx

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          NGO Website
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Use me-auto to push everything else to the right */}
          <Nav className="me-auto">
            {/* *** USE mx-3 INSTEAD OF mx-2 *** */}
            <Nav.Link as={Link} to="/" className="mx-3">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-3">About Us</Nav.Link>
            <Nav.Link as={Link} to="/projects" className="mx-3">Projects</Nav.Link>
            <Nav.Link as={Link} to="/blog" className="mx-3">Blog</Nav.Link>
            <Nav.Link as={Link} to="/media" className="mx-3">Media</Nav.Link>
            <Nav.Link as={Link} to="/volunteer" className="mx-3">Volunteer</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-3">Contact</Nav.Link>
          </Nav>

          {/* Keep Auth links and Donate button separate on the right */}
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
              // Also add margin to login link if needed
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