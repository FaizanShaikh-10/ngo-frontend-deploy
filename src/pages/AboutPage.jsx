// src/pages/AboutPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

function AboutPage() {
  const [aboutContent, setAboutContent] = useState({});
  const [coreValues, setCoreValues] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);  // <-- Added this
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // 1️⃣ Fetch About Us content
        const contentResponse = await axios.get('https://faizan8108.pythonanywhere.com/api/about-content/');
        setAboutContent(contentResponse.data[0] || {});

        // 2️⃣ Fetch Core Values
        const valuesResponse = await axios.get('https://faizan8108.pythonanywhere.com/api/core-values/');
        setCoreValues(valuesResponse.data);

        // 3️⃣ Fetch Team Members (Correct endpoint)
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
      <Container className="mt-5">
        <p>Loading About Us content...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-5 px-md-5">
      {/* ---- Header Section ---- */}
      <Row className="mb-5 text-center">
        <Col>
          <h1>About Us</h1>
          <p className="lead">
            Welcome to our NGO! We are a passionate team dedicated to making a difference...
          </p>
        </Col>
      </Row>

      <Row>
        {/* ---- Left Side: History + Core Values ---- */}
        <Col lg={8}>
          {/* 1️⃣ History Section */}
          <section className="mb-5">
            <h2>Our History</h2>
            <p>{aboutContent.history_text || "History content loading..."}</p>
          </section>

          {/* 2️⃣ Core Values Section */}
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

        {/* ---- Right Side: Team Section ---- */}
        <Col lg={4}>
          <aside className="p-4 rounded shadow-sm" style={{ backgroundColor: 'var(--bs-tertiary-bg)' }}>
            <h3 className="text-center mb-4">Our Team</h3>

            {teamMembers.length > 0 ? (
              teamMembers.map(member => (
                <div key={member.id} className="mb-3 p-3 border rounded text-center">
                  {/* Image (if available) */}
                  {member.image && (
                    <img
                      src={`https://faizan8108.pythonanywhere.com${member.image}`}
                      alt={member.name}
                      style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                      className="mb-3"
                    />
                  )}
                  <h5 className="mb-0 fw-bold text-primary">{member.name}</h5>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{member.title}</p>
                  <p style={{ fontSize: '0.9rem' }}>{member.bio}</p>
                </div>
              ))
            ) : (
              <p className="text-center">No team members added yet.</p>
            )}
          </aside>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
