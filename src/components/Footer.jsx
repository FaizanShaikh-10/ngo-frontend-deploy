// src/components/Footer.jsx
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    // Use the `bg-dark` and `text-white` classes from your theme
    <footer className="bg-dark text-white mt-auto p-4 text-center"> 
      <Container>
        <Row>
          <Col>
            {/* <-- CHANGED HERE --> */}
            <p>&copy; {new Date().getFullYear()} Light After Rain. All Rights Reserved.</p> 
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;