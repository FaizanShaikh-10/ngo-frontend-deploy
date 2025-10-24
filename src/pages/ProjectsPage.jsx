// src/pages/ProjectsPage.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // *** USE LIVE URL HERE ***
        const response = await axios.get('http://faizan8108.pythonanywhere.com/api/projects/');
        
        setProjects(response.data);
      } catch (error) {
        console.error("There was an error fetching the projects!", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []); 

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h1>Our Projects</h1>
      <p>Here you'll see all ongoing and completed projects.</p>

      <Row>
        {projects.length > 0 ? (
          projects.map(project => (
            <Col key={project.id} sm={12} md={6} lg={4} className="mb-3">
              <Card>
                {project.image && (
                  <Card.Img variant="top" src={project.image} /> 
                )}
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>{project.description.substring(0, 100)}...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No projects found. Go to your Django admin to add some!</p>
        )}
      </Row>
    </div>
  );
}

export default ProjectsPage;