// src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePage.css"; // 👈 optional if you want hover effects or animations

function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(
          "https://faizan8108.pythonanywhere.com/api/projects/"
        );
        setFeaturedProjects(projectRes.data.slice(0, 3));

        const bannerRes = await axios.get(
          "https://faizan8108.pythonanywhere.com/api/banners/"
        );
        setBanners(bannerRes.data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="mt-5 px-md-5">
      {/* --- DYNAMIC BANNER SLIDER --- */}
      {!loading && banners.length > 0 && (
        <Row className="mb-5">
          <Col>
            <Carousel fade interval={4000} className="rounded shadow-sm overflow-hidden">
              {banners.map((banner) => (
                <Carousel.Item key={banner.id}>
                  <img
                    className="d-block w-100"
                    src={`https://faizan8108.pythonanywhere.com${banner.image_url}`}
                    alt={banner.title}
                    style={{
                      height: "480px",
                      objectFit: "cover",
                      filter: "brightness(80%)",
                    }}
                  />
                  <Carousel.Caption
                    className="rounded p-3"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "10px",
                    }}
                  >
                    <h3 className="fw-bold text-white">{banner.title}</h3>
                    <p className="text-light small">{banner.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}

      {/* --- WELCOME / MISSION SECTION --- */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="fw-bold">Welcome to Light After Rain</h1>
          <p className="lead text-secondary">
            Empowering lives through education, healthcare, and compassion.
          </p>
          <Link to="/about">
            <Button variant="outline-primary" className="mt-3 px-4 py-2 fw-semibold">
              Learn More About Us
            </Button>
          </Link>
        </Col>
      </Row>

      {/* --- FEATURED PROJECTS SECTION --- */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center fw-semibold mb-4">Featured Campaigns</h2>

          {loading ? (
            <p className="text-center">Loading campaigns...</p>
          ) : featuredProjects.length > 0 ? (
            <Row className="g-4">
              {featuredProjects.map((project) => (
                <Col key={project.id} md={4}>
                  <Card className="h-100 shadow-sm border-0 project-card">
                    {project.image && (
                      <Card.Img
                        variant="top"
                        src={`https://faizan8108.pythonanywhere.com${project.image}`}
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          borderTopLeftRadius: "0.5rem",
                          borderTopRightRadius: "0.5rem",
                        }}
                      />
                    )}
                    <Card.Body>
                      <Card.Title className="fw-bold text-primary">
                        {project.title}
                      </Card.Title>
                      <Card.Text className="text-muted small">
                        {project.description.length > 100
                          ? `${project.description.substring(0, 100)}...`
                          : project.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">No featured campaigns to display right now.</p>
          )}

          <div className="text-center mt-4">
            <Link to="/projects">
              <Button variant="primary" className="px-4 py-2 fw-semibold">
                See All Projects
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* --- IMPACT STATISTICS --- */}
      <Row className="bg-light p-5 rounded mb-5 text-center shadow-sm">
        <Col>
          <h2 className="fw-semibold mb-4">Our Impact</h2>
          <Row>
            <Col md={4}>
              <h3 className="fw-bold text-primary">10,000+</h3>
              <p>Children Educated</p>
            </Col>
            <Col md={4}>
              <h3 className="fw-bold text-primary">5,000+</h3>
              <p>Families Supported</p>
            </Col>
            <Col md={4}>
              <h3 className="fw-bold text-primary">50+</h3>
              <p>Communities Reached</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
