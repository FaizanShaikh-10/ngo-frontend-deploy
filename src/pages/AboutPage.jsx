// src/pages/AboutPage.jsx

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// --- Specific team data requested by the user ---
const teamMembers = [
  {
    id: 1,
    name: 'Faizan Shaikh', // Your name
    title: 'Founder & CEO',
    bio: 'Faizan founded the NGO with a core vision focused on providing education and healthcare to underserved communities.',
  },
  {
    id: 2,
    name: 'Anas M.', // Friend's name
    title: 'Director of Programs',
    bio: 'Anas manages all our field operations, ensuring program development meets the changing needs of the community.',
  },
  {
    id: 3,
    name: 'Muskan A.', // Friend's name
    title: 'Lead Healthcare Coordinator',
    bio: 'Muskan coordinates our Mobile Health Units and oversees community health camp initiatives.',
  },
];
// --- End specific team data ---


function AboutPage() {
  return (
    <Container className="mt-5">
      {/* 1. Introduction (Already done) */}
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
          {/* 2. History Section (Already done) */}
          <section className="mb-5">
            <h2>Our History</h2>
            <p>
              Founded in [2010], our journey began with a focus on providing education to underprivileged children. Over the years, we have achieved significant milestones including launching our first mobile health clinic in [2014], establishing a women's vocational training center in [2018], and expanding our educational programs to three new districts in [2022], growing our reach and impact across various communities.
            </p>
          </section>

          {/* 3. Core Values Section (NEW) */}
          <section className="mb-5">
            <h2>Our Core Values</h2>
            <ul>
              <li><strong>Integrity:</strong> We are committed to being transparent and accountable in all our actions.</li>
              <li><strong>Inclusivity:</strong> We serve all individuals regardless of their background, religion, or gender.</li>
              <li><strong>Empathy:</strong> We listen to the needs of our communities and serve with compassion.</li>
              <li><strong>Transparency:</strong> We believe in open communication with our donors, partners, and beneficiaries.</li>
            </ul>
          </section>

          {/* 7. Call to Action (Already done in Header) */}

        </Col>

        <Col lg={4}>
          {/* 5. Leadership and Team Section (NEW) */}
          <aside className="p-4 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
            <h3 className="text-center mb-4">Our Team</h3>
            {teamMembers.map(member => (
              <div key={member.id} className="mb-3 text-center">
                {/* You can add <Card.Img src={member.image} /> here */}
                <h5 className="mb-0">{member.name}</h5>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{member.title}</p>
                <p style={{ fontSize: '0.9rem' }}>{member.bio}</p>
              </div>
            ))}
          </aside>
        </Col>
      </Row>
      {/* ... (Sections 4 and 6 are covered on other pages) ... */}
    </Container>
  );
}

export default AboutPage;