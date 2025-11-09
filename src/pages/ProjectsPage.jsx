// src/pages/ProjectsPage.jsx

import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/project.css";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects/");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects…</p>;

  return (
    <Container fluid className="mt-5 px-md-5">
      <h1 className="fw-bold mb-3">Our Projects</h1>
      <p className="text-secondary">
        Explore ongoing & completed initiatives making real impact.
      </p>

      <Row className="g-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Col key={project.slug} sm={12} md={6} lg={4}>
              <Card className="project-card h-100 border-0">
                {project.image && (
                  <Card.Img
                    src={
                      project.image.startsWith("http")
                        ? project.image
                        : `https://faizan8108.pythonanywhere.com${project.image}`
                    }
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
                        className={
                          project.status === "Completed"
                            ? "badge-completed"
                            : project.status === "Ongoing"
                            ? "badge-ongoing"
                            : "badge-upcoming"
                        }
                      >
                        {project.status}
                      </Badge>
                    )}
                  </div>

                  <Card.Title className="project-card-title">
                    {project.title}
                  </Card.Title>

                  <Card.Text className="project-card-desc">
                    {project.description.length > 120
                      ? `${project.description.substring(0, 120)}…`
                      : project.description}
                  </Card.Text>

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
          <p>No projects found.</p>
        )}
      </Row>
    </Container>
  );
}

export default ProjectsPage;
