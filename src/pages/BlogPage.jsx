// src/pages/BlogPage.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // *** USE HTTPS URL HERE ***
        const response = await axios.get('https://faizan8108.pythonanywhere.com/api/posts/');
        
        setPosts(response.data);
      } catch (error) {
        console.error("There was an error fetching the posts!", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading blog posts...</p>;
  }

  return (
    <div>
      <h1>Blog</h1>
      <p>Read our latest news, stories, and updates.</p>

      <Row>
        {posts.length > 0 ? (
          posts.map(post => (
            <Col key={post.id} sm={12} md={6} lg={4} className="mb-3">
              <Card>
                {post.image && (
                   <Card.Img variant="top" src={post.image} />
                )}
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content.substring(0, 600)}...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No posts found. Go to your Django admin to write one!</p>
        )}
      </Row>
    </div>
  );
}

export default BlogPage;