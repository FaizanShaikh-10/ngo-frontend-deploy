// src/pages/AboutPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AboutPage.css';

function AboutPage() {
  const [aboutContent, setAboutContent] = useState({});
  const [coreValues, setCoreValues] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [banner, setBanner] = useState(null);
  const [visionMission, setVisionMission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch main About content (includes history, vision, mission, banner if stored together)
        const aboutRes = await axios.get('https://faizan8108.pythonanywhere.com/api/about-content/');
        if (aboutRes.data && aboutRes.data.length > 0) {
          setAboutContent(aboutRes.data[0]);
          setBanner(aboutRes.data[0]); // assuming banner fields are part of this
        }

        // Fetch Vision & Mission (if stored separately)
        try {
          const visionRes = await axios.get('https://faizan8108.pythonanywhere.com/api/vision-mission/');
          if (visionRes.data && visionRes.data.length > 0) {
            setVisionMission(visionRes.data[0]);
          }
        } catch {
          console.log("No separate Vision & Mission endpoint found, skipping...");
        }

        // Fetch Core Values
        const valuesResponse = await axios.get('https://faizan8108.pythonanywhere.com/api/core-values/');
        setCoreValues(valuesResponse.data);

        // Fetch Team Members
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
      {/* 🟦 Banner Section */}
      {banner?.banner_image && (
        <Row className="mb-5">
          <Col>
            <div className="banner-section text-center p-4 rounded shadow-sm position-relative">
              <img
                src={`https://faizan8108.pythonanywhere.com${banner.banner_image}`}
                alt="NGO Banner"
                className="img-fluid rounded"
              />
              {banner.banner_title && (
                <h1 className="fw-bold mt-3">{banner.banner_title}</h1>
              )}
              {banner.banner_subtitle && (
                <p className="lead text-secondary">{banner.banner_subtitle}</p>
              )}
            </div>
          </Col>
        </Row>
      )}

      {/* 🟨 Intro Header */}
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="fw-bold">About Us</h1>
          <p className="lead text-secondary">
            Welcome to Light After Rain! We are a passionate team dedicated to making a difference.
          </p>
        </Col>
      </Row>

      <Row>
        {/* LEFT SECTION */}
        <Col lg={8}>
          {/* 🕰 History Section */}
          <section className="mb-5">
            <h2 className="fw-semibold mb-3">Our History</h2>
            <p>{aboutContent.history_text || "History content not yet added."}</p>
          </section>

          {/* 🌟 Vision & Mission */}
          {visionMission && (
            <section className="mb-5">
              <h2 className="fw-semibold mb-3">Our Vision & Mission</h2>
              {visionMission.vision && (
                <p><strong>Vision:</strong> {visionMission.vision}</p>
              )}
              {visionMission.mission && (
                <p><strong>Mission:</strong> {visionMission.mission}</p>
              )}
            </section>
          )}

          {/* 💎 Core Values */}
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

        {/* RIGHT SECTION */}
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
                          src={`https://faizan8108.pythonanywhere.com${member.image}`}
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
