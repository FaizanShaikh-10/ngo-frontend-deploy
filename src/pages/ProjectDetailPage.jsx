// src/pages/ProjectDetailPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";

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
        <Col md={8}>
          <Card className="shadow-sm">
            {project.image && (
              <Card.Img
                variant="top"
                src={
                  project.image.startsWith("http")
                    ? project.image
                    : `https://faizan8108.pythonanywhere.com${project.image}`
                }
                style={{ height: "400px", objectFit: "cover" }}
              />
            )}
            <Card.Body>
              <div className="mb-3">
                <Badge bg="secondary" className="me-2">
                  {project.category || "Uncategorized"}
                </Badge>
                <Badge bg="success">{project.status || "Active"}</Badge>
              </div>

              <Card.Title className="fw-bold fs-3 mb-3 text-primary">
                {project.title}
              </Card.Title>
              <Card.Text className="text-muted mb-3">
                {project.description}
              </Card.Text>

              {project.goals && (
                <Card.Text>
                  <strong>Goals:</strong> {project.goals}
                </Card.Text>
              )}
              {project.beneficiaries && (
                <Card.Text>
                  <strong>Beneficiaries:</strong> {project.beneficiaries}
                </Card.Text>
              )}
              {project.location && (
                <Card.Text>
                  <strong>Location:</strong> {project.location}
                </Card.Text>
              )}
              {project.project_timeline && (
              <Card.Text>
              <strong>Project Timeline:</strong> {project.project_timeline}
              </Card.Text>
              )}

              {project.impact_statistics && (
              <Card.Text>
              <strong>Impact Statistics:</strong> {project.impact_statistics}
              </Card.Text>
               )}

              <Link to="/projects">
                <Button variant="primary" className="mt-3">
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
