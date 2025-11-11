// src/pages/MediaGalleryPage.jsx

import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import api from "../services/api";

function MediaGalleryPage() {
  const [mediaItems, setMediaItems] = useState([]);
  const [press, setPress] = useState([]);
  const [coverage, setCoverage] = useState([]);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/media/"),              // ✅ images & videos
      api.get("/press-releases/"),     // ✅ press releases
      api.get("/media-coverage/"),     // ✅ media coverage
      api.get("/media-contact/"),      // ✅ media contact
    ])
      .then(([mediaRes, pressRes, coverageRes, contactRes]) => {
        setMediaItems(mediaRes.data);
        setPress(pressRes.data);
        setCoverage(coverageRes.data);
        setContact(contactRes.data[0]); // only one contact record
      })
      .catch((err) => console.error("Error loading media page:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading media...</p>;

  return (
    <div className="container my-5">

      {/* ✅ Page Intro */}
      <h1 className="fw-bold text-primary mb-4">Media</h1>
      <p className="text-muted">
        Explore press releases, news coverage, images, and videos showcasing our work.
      </p>


      {/* ✅ PRESS RELEASES */}
      {press.length > 0 && (
        <section className="mt-5">
          <h2 className="fw-bold mb-3">Press Releases</h2>

          {press.map((p) => (
            <div key={p.id} className="mb-3 border-bottom pb-2">
              <h5>{p.title}</h5>
              <p className="text-muted small">{p.date}</p>
              <p>{p.summary}</p>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer">
                  Read More →
                </a>
              )}
            </div>
          ))}
        </section>
      )}


      {/* ✅ MEDIA COVERAGE */}
      {coverage.length > 0 && (
        <section className="mt-5">
          <h2 className="fw-bold mb-3">Media Coverage</h2>

          {coverage.map((c) => (
            <div key={c.id} className="mb-3 border-bottom pb-2">
              <h5>{c.title}</h5>
              <p className="text-muted small">
                {c.source} • {c.date}
              </p>
              <p>{c.summary}</p>
              {c.link && (
                <a href={c.link} target="_blank" rel="noreferrer">
                  View Coverage →
                </a>
              )}
            </div>
          ))}
        </section>
      )}


      {/* ✅ IMAGE + VIDEO GALLERY */}
      <section className="mt-5">
        <h2 className="fw-bold mb-3">Gallery</h2>

        <Row>
          {mediaItems.length > 0 ? (
            mediaItems.map((item) => (
              <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  {item.media_type === "photo" && item.image && (
                    <Card.Img
                      variant="top"
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `https://faizan8108.pythonanywhere.com${item.image}`
                      }
                    />
                  )}

                  {item.media_type === "video" && item.video_url && (
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
                    <Card.Text className="text-muted small">
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No media items found.</p>
          )}
        </Row>
      </section>


      {/* ✅ MEDIA CONTACT */}
      {contact && (
        <section className="mt-5 p-4 bg-light rounded">
          <h2 className="fw-bold mb-3">Media Contact</h2>

          {contact.name && <p><strong>Name:</strong> {contact.name}</p>}
          {contact.email && (
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          )}
          {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
        </section>
      )}
    </div>
  );
}

export default MediaGalleryPage;
