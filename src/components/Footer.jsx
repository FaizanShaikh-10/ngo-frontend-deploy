// src/components/Footer.jsx
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      {/* Footer Links Section */}
      <Container>
        <Row className="text-center text-md-start mb-4">
          {/* NGO Info */}
          <Col md={3} className="mb-3">
            <h5 className="fw-bold text-uppercase">Light After Rain NGO</h5>
            <p className="small">
              Empowering lives and creating opportunities for underprivileged communities.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-white text-decoration-none">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-white text-decoration-none">
                  Donate
                </Link>
              </li>
            </ul>
          </Col>

          {/* Social Media */}
          <Col md={3} className="mb-3">
            <h6 className="fw-bold">Follow Us</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Instagram
                </a>
              </li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col md={3}>
            <h6 className="fw-bold">Newsletter</h6>
            <p className="small">Stay updated with our latest news.</p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-2"
              />
              <button type="submit" className="btn btn-primary w-100">
                Subscribe
              </button>
            </form>
          </Col>
        </Row>
      </Container>

      {/* Copyright */}
      <div className="text-center py-3 border-top border-secondary small">
        © {new Date().getFullYear()} Light After Rain NGO. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
