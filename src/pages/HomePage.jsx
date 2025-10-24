// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch projects from your API
        const response = await axios.get('http://127.0.0.1:8000/api/projects/');
        // Take the first 3 projects as "featured" (you can change this logic later)
        setFeaturedProjects(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching projects for homepage:", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <Container className="mt-5">
      {/* Section 1: Welcome/Mission Overview */}
      <Row className="text-center mb-5">
        <Col>
          <h1>Welcome to Our NGO</h1>
          <p className="lead">
            Making a difference through education, healthcare, and empowerment.
          </p>
          {/* You can add more mission/vision text here */}
          <Link to="/about">
            <Button variant="outline-primary" className="mt-3">Learn More About Us</Button>
          </Link>
        </Col>
      </Row>

      {/* Section 2: Featured Campaigns/Projects */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Featured Campaigns</h2>
          {loading ? (
            <p className="text-center">Loading campaigns...</p>
          ) : featuredProjects.length > 0 ? (
            <Row>
              {featuredProjects.map(project => (
                <Col key={project.id} md={4} className="mb-4">
                  <Card className="h-100">
                    {project.image && (
                      <Card.Img variant="top" src={project.image} style={{ height: '200px', objectFit: 'cover' }} />
                    )}
                    <Card.Body>
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Text>
                        {project.description.substring(0, 100)}...
                      </Card.Text>
                      {/* Optional: Link to a specific project page later */}
                      {/* <Link to={`/projects/${project.id}`}>
                        <Button variant="link">Read More</Button>
                      </Link> */}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">No featured campaigns to display right now.</p>
          )}
          <div className="text-center mt-3">
             <Link to="/projects">
                <Button variant="primary">See All Projects</Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Section 3: Impact Statistics (Placeholder) */}
      <Row className="bg-light p-4 rounded mb-5 text-center">
        <Col>
          <h2 className="mb-4">Our Impact</h2>
          <Row>
            <Col md={4}>
              <h3>10,000+</h3>
              <p>Children Educated</p>
            </Col>
            <Col md={4}>
              <h3>5,000+</h3>
              <p>Families Supported</p>
            </Col>
            <Col md={4}>
              <h3>50+</h3>
              <p>Communities Reached</p>
            </Col>
          </Row>
           {/* You could add a link to a more detailed impact report page */}
        </Col>
      </Row>

    </Container>
  );
}

export default HomePage;