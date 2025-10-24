// src/pages/MediaGalleryPage.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

function MediaGalleryPage() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // *** USE LIVE URL HERE ***
        const response = await axios.get('http://faizan8108.pythonanywhere.com/api/media/');
        setMediaItems(response.data);
      } catch (error) {
        console.error("There was an error fetching the media!", error);
      }
      setLoading(false);
    };

    fetchMedia();
  }, []);

  if (loading) {
    return <p>Loading media gallery...</p>;
  }

  return (
    <div>
      <h1>Media Gallery</h1>
      <p>See our work, events, and success stories.</p>

      <Row>
        {mediaItems.length > 0 ? (
          mediaItems.map(item => (
            <Col key={item.id} sm={12} md={6} lg={4} className="mb-3">
              <Card>
                {item.media_type === 'photo' && item.image && (
                  <Card.Img 
                    variant="top" 
                    src={item.image} 
                  />
                )}
                {item.media_type === 'video' && item.video_url && (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={item.video_url.replace("watch?v=", "embed/")} 
                      title={item.title}
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No media found. Go to your Django admin to add photos or videos!</p>
        )}
      </Row>
    </div>
  );
}

export default MediaGalleryPage;