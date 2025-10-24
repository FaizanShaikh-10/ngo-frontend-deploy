// src/pages/AboutPage.jsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AboutPage() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="mb-4">About Us</h1>

          {/* Mission Section - Citations removed */}
          <section className="mb-5">
            <h2>Our Mission</h2>
            <p>
              To create a lasting impact in the lives of underprivileged children and communities by
              providing education, woman empowerment, and livelihood opportunities.
            </p>
          </section>

          {/* Vision Section - Citations removed */}
          <section className="mb-5">
            <h2>Our Vision</h2>
            <p>
              A world where every child has access to quality education, healthcare, and the
              opportunity to achieve their full potential.
            </p>
          </section>

         {/* History Section - Example milestones added */}
          <section>
            <h2>Our History</h2>
            <p>
              {/* NOTE: Replace bracketed text with the NGO's actual details */}
              Founded in [2010], our journey began with a focus on providing education to underprivileged children. Over the years, we have achieved significant milestones including "launching our first mobile health clinic in [2014]", "establishing a women's vocational training center in [2018]", and "expanding our educational programs to three new districts in [2022]", growing our reach and impact across various communities.
            </p>
            {/* You can add more paragraphs or a timeline component here based on NGO info */}
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;