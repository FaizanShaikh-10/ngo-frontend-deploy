// src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePage.css"; // optional

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
      {/* ===== Dynamic Banner Carousel ===== */}
      {!loading && banners.length > 0 && (
        <Row className="mb-5">
          <Col>
            <Carousel fade interval={4000} className="rounded shadow-sm overflow-hidden">
              {banners.map((banner) => (
                <Carousel.Item key={banner.id}>
                  <img
                    className="d-block w-100"
                    src={
                      banner.image_url?.startsWith("http")
                        ? banner.image_url
                        : `https://faizan8108.pythonanywhere.com${banner.image_url}`
                    }
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

      {/* ===== Vision & Mission Section ===== */}
      <Row
        className="text-center py-5 mb-5"
        style={{ backgroundColor: "#f8fafc", borderRadius: "12px" }}
      >
        <Col>
          <h2 className="fw-bold mb-4 text-primary">Our Vision & Mission</h2>
          <div className="mx-auto" style={{ maxWidth: "850px", color: "#475569" }}>
            <h4 className="fw-semibold text-dark">Our Vision</h4>
            <p className="mb-4">
              To build a world where every individual rises with dignity and opportunity after
              hardship — spreading light, hope, and empowerment in every community.
            </p>

            <h4 className="fw-semibold text-dark">Our Mission</h4>
            <p>
              Light After Rain works to uplift vulnerable communities by providing education,
              healthcare, and skill development. We believe in sustainable progress driven by
              compassion, equality, and inclusion.
            </p>
          </div>
        </Col>
      </Row>

      {/* ===== Welcome Section ===== */}
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

      {/* ===== Featured Projects ===== */}
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
                        src={
                          project.image?.startsWith("http")
                            ? project.image
                            : `https://faizan8108.pythonanywhere.com${project.image}`
                        }
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          borderTopLeftRadius: "0.5rem",
                          borderTopRightRadius: "0.5rem",
                        }}
                        alt={project.title}
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

      {/* ===== Impact Statistics ===== */}
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

      {/* ===== Join Us Section ===== */}
      <section
        className="text-center text-white py-5"
        style={{ backgroundColor: "#0d6efd" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Join Us in Making a Difference</h2>
          <p className="mb-4">
            Whether you want to donate, volunteer, or partner with us, every contribution helps.
          </p>
          <div>
            <a href="/donate" className="btn btn-light btn-lg mx-2">
              Donate Now
            </a>
            <a href="/volunteer" className="btn btn-outline-light btn-lg mx-2">
              Volunteer With Us
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default HomePage;
