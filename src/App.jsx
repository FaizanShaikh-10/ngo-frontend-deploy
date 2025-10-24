// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Import Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import MediaGalleryPage from './pages/MediaGalleryPage'; // 1. Import the new page
import DonatePage from './pages/DonatePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// We'll add more pages here later

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/media" element={<MediaGalleryPage />} /> 
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
import VolunteerPage from './pages/VolunteerPage';