// src/pages/ProjectsPage.jsx

import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../services/api";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects/");
        setProjects(response.data);
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
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
            <Col key={project.slug} sm={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">

                {project.image && (
                  <Card.Img
                    variant="top"
                    src={
                      project.image.startsWith("http")
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

                  <Card.Title className="fw-bold text-primary">
                    {project.title}
                  </Card.Title>

                  <Card.Text className="text-muted small mb-3">
                    {project.description.length > 150
                      ? `${project.description.substring(0, 150)}...`
                      : project.description}
                  </Card.Text>

                  {/* ✅ tags preview */}
                  {project.tags?.length > 0 && (
                    <p className="small text-muted">
                      <strong>Tags:</strong> {project.tags.join(", ")}
                    </p>
                  )}

                  {/* ✅ progress preview */}
                  {project.progress_percent !== null && (
                    <p className="small text-primary fw-semibold">
                      Progress: {project.progress_percent}%
                    </p>
                  )}

                  <Link to={`/projects/${project.slug}`} className="mt-auto">
                    <Button variant="outline-primary" size="sm">
                      Read More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No projects found. Add new projects in Admin.</p>
        )}
      </Row>
    </Container>
  );
}

export default ProjectsPage;
