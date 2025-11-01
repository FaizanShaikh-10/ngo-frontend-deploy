// src/pages/AboutPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Placeholder array must be kept empty if dynamic data isn't used yet
const teamMembers = []; 

function AboutPage() {
  const [aboutContent, setAboutContent] = useState({});
  const [coreValues, setCoreValues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic content and core values
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch main content (should be only one entry)
        const contentResponse = await axios.get('https://faizan8108.pythonanywhere.com/api/about-content/');
        setAboutContent(contentResponse.data[0] || {});

        // Fetch repeatable Core Values
        const valuesResponse = await axios.get('https://faizan8108.pythonanywhere.com/api/core-values/');
        setCoreValues(valuesResponse.data);

      } catch (error) {
        console.error("Error fetching About Us content:", error);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) {
    return <Container className="mt-5"><p>Loading About Us content...</p></Container>;
  }

  return (
    <Container fluid className="mt-5 px-md-5">
      <Row className="mb-5 text-center">
        <Col>
          <h1>About Us</h1>
          <p className="lead">
            Welcome to our NGO! We are a passionate team dedicated to making a difference...
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* 1. History Section (DYNAMIC) */}
          <section className="mb-5">
            <h2>Our History</h2>
            <p>
              {aboutContent.history_text || "History content loading..."}
            </p>
          </section>

          {/* 2. Core Values Section (DYNAMIC) */}
          <section className="mb-5">
            <h2>Our Core Values</h2>
            {coreValues.length > 0 ? (
                <ul>
                    {coreValues.map(item => (
                        <li key={item.id}>
                            <strong>{item.value}:</strong> {item.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Core values not yet defined. Please add them in the CMS.</p>
            )}
          </section>
        </Col>

        <Col lg={4}>
          {/* 3. Leadership and Team Section (Placeholder/Static for now) */}
          <aside className="p-4 rounded shadow-sm" style={{ backgroundColor: 'var(--bs-tertiary-bg)' }}>
            <h3 className="text-center mb-4">Our Team</h3>
            {/* ... (Team members map remains here if you didn't delete it) ... */}
            {/* For now, the existing teamMembers array is gone, so this section needs the dynamic team members you added in the previous step. */}
            {teamMembers.length > 0 ? (
                teamMembers.map(member => (
                  <div key={member.id} className="mb-3 p-3 border rounded">
                    <h5 className="mb-0 fw-bold text-primary">{member.name}</h5>
                    <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{member.title}</p>
                    <p style={{ fontSize: '0.9rem' }}>{member.bio}</p>
                  </div>
                ))
            ) : (
               <p className="text-center">Team section is ready for dynamic members.</p>
            )}
          </aside>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;