// src/pages/ProjectDetailPage.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import api from "../services/api";
import "../styles/project.css";

function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${slug}/`);
        setProject(response.data);
      } catch (error) {
        console.error("Error loading project", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading…</p>
      </div>
    );
  }

  if (!project) return <p>Project not found.</p>;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm">
            {project.image && (
              <Card.Img
                className="project-main-image"
                src={
                  project.image.startsWith("http")
                    ? project.image
                    : `https://faizan8108.pythonanywhere.com${project.image}`
                }
              />
            )}

            <Card.Body>
              {/* Category + Status */}
              <div className="mb-3">
                <Badge bg="secondary" className="me-2">
                  {project.category}
                </Badge>
                <Badge bg="success">{project.status}</Badge>
              </div>

              <h2 className="project-title">{project.title}</h2>

              <p className="text-muted">{project.description}</p>

              {/* Tags + Progress */}
              {project.tags?.length > 0 && (
                <p className="project-tags">
                  <strong>Tags:</strong> {project.tags.join(", ")}
                </p>
              )}

              {project.progress_percent !== null && (
                <p className="project-tags">
                  <strong>Progress:</strong> {project.progress_percent}%
                </p>
              )}

              {/* Fields */}
              {project.goals && (
                <p>
                  <strong>Goals:</strong> {project.goals}
                </p>
              )}
              {project.beneficiaries && (
                <p>
                  <strong>Beneficiaries:</strong> {project.beneficiaries}
                </p>
              )}
              {project.location && (
                <p>
                  <strong>Location:</strong> {project.location}
                </p>
              )}
              {project.project_timeline && (
                <p>
                  <strong>Timeline:</strong> {project.project_timeline}
                </p>
              )}
              {project.impact_statistics && (
                <p>
                  <strong>Impact:</strong> {project.impact_statistics}
                </p>
              )}

              {/* ✅ MEDIA */}
              {project.media?.length > 0 && (
                <section className="project-media mt-4">
                  <h4 className="section-title">Media</h4>
                  <Row>
                    {project.media.map((item) => (
                      <Col key={item.id} md={4}>
                        <img
                          src={
                            item.file.startsWith("http")
                              ? item.file
                              : `https://faizan8108.pythonanywhere.com${item.file}`
                          }
                          className="img-fluid rounded mb-2"
                          alt={item.caption}
                        />
                      </Col>
                    ))}
                  </Row>
                </section>
              )}

              <Link to="/projects">
                <Button className="back-btn" variant="primary">
                  Back to All Projects
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProjectDetailPage;
