// src/pages/AboutPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AboutPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team members from the live API
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get('https://faizan8108.pythonanywhere.com/api/team/');
        setTeam(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
      setLoading(false);
    };
    fetchTeam();
  }, []);

  return (
    <Container fluid className="mt-5 px-md-5">
      <Row className="mb-5 text-center">
        <Col>
          <h1>About Us</h1>
          <p className="lead">Welcome to our NGO! We are a passionate team dedicated to making a difference...</p>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* History Section */}
          <section className="mb-5">
            <h2>Our History</h2>
            {/* ... (History text remains here) ... */}
          </section>

          {/* Core Values Section */}
          <section className="mb-5">
            <h2>Our Core Values</h2>
            {/* ... (Core Values list remains here) ... */}
          </section>
        </Col>

        <Col lg={4}>
          {/* Leadership and Team Section (DYNAMIC) */}
          <aside className="p-4 rounded shadow-sm" style={{ backgroundColor: 'var(--bs-tertiary-bg)' }}>
            <h3 className="text-center mb-4">Our Team</h3>
            {loading ? (
              <p className="text-center">Loading team...</p>
            ) : team.length === 0 ? (
              <p className="text-center">No team members added yet.</p>
            ) : (
              team.map(member => (
                <div key={member.id} className="mb-3 p-3 border rounded">
                  {/* member.image could go here */}
                  <h5 className="mb-0 fw-bold text-primary">{member.name}</h5>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{member.title}</p>
                  <p style={{ fontSize: '0.9rem' }}>{member.bio}</p>
                </div>
              ))
            )}
          </aside>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;