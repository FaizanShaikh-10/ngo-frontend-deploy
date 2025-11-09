// src/pages/ProjectDetailPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import api from "../services/api";   // ✅ your axios instance


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
        console.error("Error fetching project details:", error);
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
        <p>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return <p className="text-center mt-5">Project not found.</p>;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={9}>
          <Card className="shadow-sm">
            {project.image && (
              <Card.Img
                variant="top"
                src={
                  project.image.startsWith("http")
                    ? project.image
                    : `https://faizan8108.pythonanywhere.com${project.image}`
                }
                style={{ height: "420px", objectFit: "cover" }}
              />
            )}

            <Card.Body>
              {/* CATEGORY + STATUS */}
              <div className="mb-3">
                <Badge bg="secondary" className="me-2">
                  {project.category || "Uncategorized"}
                </Badge>
                <Badge bg="success">{project.status}</Badge>
              </div>

              {/* TITLE */}
              <Card.Title className="fw-bold fs-3 mb-3 text-primary">
                {project.title}
              </Card.Title>

              {/* DESCRIPTION */}
              <Card.Text className="text-muted mb-3">
                {project.description}
              </Card.Text>

              {/* Tags */}
              {project.tags?.length > 0 && (
                <p><strong>Tags:</strong> {project.tags.join(", ")}</p>
              )}

              {/* Progress */}
              {project.progress_percent !== null && (
                <p><strong>Progress:</strong> {project.progress_percent}%</p>
              )}

              {/* PRIMARY DETAILS */}
              {project.goals && (
                <p><strong>Goals:</strong> {project.goals}</p>
              )}
              {project.beneficiaries && (
                <p><strong>Beneficiaries:</strong> {project.beneficiaries}</p>
              )}
              {project.location && (
                <p><strong>Location:</strong> {project.location}</p>
              )}
              {project.project_timeline && (
                <p><strong>Project Timeline:</strong> {project.project_timeline}</p>
              )}
              {project.impact_statistics && (
                <p><strong>Impact Statistics:</strong> {project.impact_statistics}</p>
              )}

              {/* ✅ MEDIA */}
              {project.media?.length > 0 && (
                <section className="mt-4">
                  <h4 className="fw-bold text-secondary">Media</h4>
                  <Row>
                    {project.media.map(item => (
                      <Col key={item.id} md={4}>
                        <img
                          src={
                            item.image?.startsWith("http")
                              ? item.image
                              : `https://faizan8108.pythonanywhere.com${item.image}`
                          }
                          className="img-fluid rounded mb-2"
                          alt={item.caption}
                        />
                      </Col>
                    ))}
                  </Row>
                </section>
              )}

              {/* ✅ MILESTONES */}
              {project.milestones?.length > 0 && (
                <section className="mt-4">
                  <h4 className="fw-bold text-secondary">Milestones</h4>
                  <ul>
                    {project.milestones.map(ms => (
                      <li key={ms.id}>
                        <strong>{ms.title}</strong>
                        {ms.date && ` — ${ms.date}`}
                        {ms.description && <p className="mb-1">{ms.description}</p>}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* ✅ TESTIMONIALS */}
              {project.testimonials?.length > 0 && (
                <section className="mt-4">
                  <h4 className="fw-bold text-secondary">Testimonials</h4>
                  <Row>
                    {project.testimonials.map(ts => (
                      <Col key={ts.id} md={6} className="mb-3">
                        <Card className="border-0 shadow-sm">
                          {ts.photo && (
                            <Card.Img
                              variant="top"
                              src={`https://faizan8108.pythonanywhere.com${ts.photo}`}
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                          )}
                          <Card.Body>
                            <Card.Text>"{ts.quote}"</Card.Text>
                            <p className="fw-bold text-primary">{ts.author_name}</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </section>
              )}

              {/* ✅ PARTNERS */}
              {project.partners?.length > 0 && (
                <section className="mt-4">
                  <h4 className="fw-bold text-secondary">Partners</h4>
                  <Row>
                    {project.partners.map(pt => (
                      <Col key={pt.id} md={3} className="text-center mb-3">
                        {pt.logo && (
                          <img
                            src={`https://faizan8108.pythonanywhere.com${pt.logo}`}
                            alt={pt.name}
                            className="img-fluid"
                            style={{ maxHeight: "80px", objectFit: "contain" }}
                          />
                        )}
                        <p className="fw-semibold">{pt.name}</p>
                        {pt.website && (
                          <a href={pt.website} target="_blank" rel="noreferrer">
                            Visit →
                          </a>
                        )}
                      </Col>
                    ))}
                  </Row>
                </section>
              )}

              {/* ✅ IMPACT METRICS */}
              {project.impact_metrics?.length > 0 && (
                <section className="mt-4">
                  <h4 className="fw-bold text-secondary">Impact Metrics</h4>
                  <Row>
                    {project.impact_metrics.map(im => (
                      <Col key={im.id} md={3} className="text-center mb-3">
                        <Card className="border-0 shadow-sm p-3">
                          <h5 className="fw-bold">{im.value}</h5>
                          <p className="text-muted small">{im.label}</p>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </section>
              )}

              {/* BACK BUTTON */}
              <Link to="/projects">
                <Button variant="primary" className="mt-4">
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
