// src/pages/AboutPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AboutPage.css'; // 👈 for custom hover effects (we’ll create this file next)

function AboutPage() {
  const [aboutContent, setAboutContent] = useState({});
  const [coreValues, setCoreValues] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentResponse = await axios.get('https://faizan8108.pythonanywhere.com/api/about-content/');
        setAboutContent(contentResponse.data[0] || {});

        const valuesResponse = await axios.get('https://faizan8108.pythonanywhere.com/api/core-values/');
        setCoreValues(valuesResponse.data);

        const teamResponse = await axios.get('https://faizan8108.pythonanywhere.com/api/team/');
        setTeamMembers(teamResponse.data);
      } catch (error) {
        console.error("Error fetching About Us content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Loading About Us content...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-5 px-md-5">
      <Row className="mb-5 text-center">
        <Col>
          <h1>About Us</h1>
          <p className="lead">
            {/* <-- CHANGED HERE --> */}
            Welcome to Light After Rain! We are a passionate team dedicated to making a difference...
          </p>
        </Col>
      </Row>

      <Row>
        {/* ---- Left Side: History & Core Values ---- */}
        <Col lg={8}>
          {/* 1️⃣ History */}
          <section className="mb-5">
            <h2 className="fw-semibold mb-3">Our History</h2>
            <p>{aboutContent.history_text || "History content loading..."}</p>
          </section>

          {/* 2️⃣ Core Values */}
          <section className="mb-5">
            <h2 className="fw-semibold mb-3">Our Core Values</h2>
            {coreValues.length > 0 ? (
              <ul>
                {coreValues.map(item => (
                  <li key={item.id}>
                    <strong>{item.value}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No core values added yet.</p>
            )}
          </section>
        </Col>

        {/* ---- Right Side: Team Section ---- */}
        <Col lg={4}>
          <aside>
            <h3 className="text-center fw-bold mb-4">Meet Our Team</h3>
            <Row className="g-4 justify-content-center">
              {teamMembers.length > 0 ? (
                teamMembers.map(member => (
                  <Col md={12} key={member.id}>
                    <Card className="team-card shadow-sm border-0 text-center">
                      {member.image && (
                        <Card.Img
                          variant="top"
                          src={member.image}
                          alt={member.name}
                          className="team-image mx-auto mt-3"
                        />
                      )}
                      <Card.Body>
                        <Card.Title className="fw-bold text-primary mb-1">{member.name}</Card.Title>
                        <Card.Subtitle className="text-muted mb-2">{member.title}</Card.Subtitle>
                        <Card.Text className="small">{member.bio}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-center">No team members added yet.</p>
              )}
            </Row>
          </aside>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
