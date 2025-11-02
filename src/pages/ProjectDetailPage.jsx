// src/pages/ProjectDetailPage.jsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Badge, Button, Card } from "react-bootstrap";

function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `https://faizan8108.pythonanywhere.com/api/projects/${id}/`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading project details...</p>;
  if (!project) return <p className="text-center mt-5">Project not found.</p>;

  return (
    <Container className="mt-5 px-md-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-sm border-0">
            {project.image && (
              <Card.Img
                variant="top"
                src={
                  project.image?.startsWith("http")
                    ? project.image
                    : `https://faizan8108.pythonanywhere.com${project.image}`
                }
                alt={project.title}
                style={{
                  height: "400px",
                  objectFit: "cover",
                  borderTopLeftRadius: "0.5rem",
                  borderTopRightRadius: "0.5rem",
                }}
              />
            )}
            <Card.Body>
              <div className="mb-3">
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

              <Card.Title className="fw-bold text-primary fs-3 mb-3">
                {project.title}
              </Card.Title>
              <Card.Text className="fs-6 text-muted mb-4">
                {project.description}
              </Card.Text>

              {/* Optional extra info */}
              {project.start_date && (
                <p className="text-secondary mb-1">
                  <strong>Start Date:</strong> {project.start_date}
                </p>
              )}
              {project.end_date && (
                <p className="text-secondary">
                  <strong>End Date:</strong> {project.end_date}
                </p>
              )}

              <div className="mt-4">
                <Link to="/projects">
                  <Button variant="outline-primary" className="me-2">
                    ← Back to Projects
                  </Button>
                </Link>
                <Button variant="primary">Support This Project</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectDetailPage;
