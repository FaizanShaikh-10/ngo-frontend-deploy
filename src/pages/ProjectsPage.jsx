// src/pages/ProjectsPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://faizan8108.pythonanywhere.com/api/projects/"
        );
        setProjects(response.data);
      } catch (error) {
        console.error("There was an error fetching the projects!", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <Container fluid className="mt-5 px-md-5">
      <h1 className="fw-bold mb-3">Our Projects</h1>
      <p className="text-secondary">
        Explore our ongoing and completed initiatives that are creating real impact.
      </p>

      <Row className="g-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Col key={project.id} sm={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                {project.image && (
                  <Card.Img
                    variant="top"
                    src={
                      project.image?.startsWith("http")
                        ? project.image
                        : `https://faizan8108.pythonanywhere.com${project.image}`
                    }
                    style={{
                      height: "230px",
                      objectFit: "cover",
                    }}
                    alt={project.title}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    {project.category && (
                      <Badge bg="secondary" className="me-2">
                        {project.category}
                      </Badge>
                    )}
                    {project.status && (
                      <Badge
                        bg={
                          project.status === "Completed"
                            ? "success"
                            : project.status === "Ongoing"
                            ? "info"
                            : "warning"
                        }
                      >
                        {project.status}
                      </Badge>
                    )}
                  </div>

                  <Card.Title className="fw-bold text-primary">{project.title}</Card.Title>
                  <Card.Text className="text-muted small mb-3">
                    {project.description.length > 150
                      ? `${project.description.substring(0, 150)}...`
                      : project.description}
                  </Card.Text>
                  {project.project_timeline && (
                  <p className="text-secondary small mb-1">
                  <strong>Timeline:</strong> {project.project_timeline}
                  </p>
                  )}

                   {project.impact_statistics && (
                  <p className="text-secondary small mb-2">
                    <strong>Impact:</strong> {project.impact_statistics}
                    </p>
                  )}

                  <Link to={`/projects/${project.id}`} className="mt-auto">
                    <Button variant="outline-primary" size="sm">
                      Read More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No projects found. Go to your Django admin to add some!</p>
        )}
      </Row>
      {/* 🌍 Impact Section */}
<section className="my-5 py-5 bg-light text-center rounded shadow-sm">
  <h2 className="fw-bold text-primary mb-3">Our Impact</h2>
  <p className="text-secondary mb-5">
    Over the years, our initiatives have touched countless lives and built stronger communities.
  </p>

  <Row className="justify-content-center text-center">
    <Col xs={6} md={3} className="mb-4">
      <h3 className="fw-bold text-success display-6">500+</h3>
      <p className="text-muted">Households Accessing Clean Water</p>
    </Col>
    <Col xs={6} md={3} className="mb-4">
      <h3 className="fw-bold text-success display-6">200+</h3>
      <p className="text-muted">Children Educated</p>
    </Col>
    <Col xs={6} md={3} className="mb-4">
      <h3 className="fw-bold text-success display-6">50+</h3>
      <p className="text-muted">Active Volunteers</p>
    </Col>
    <Col xs={6} md={3} className="mb-4">
      <h3 className="fw-bold text-success display-6">10+</h3>
      <p className="text-muted">Ongoing Projects</p>
    </Col>
  </Row>
</section>
    </Container>
  );
}

export default ProjectsPage;
