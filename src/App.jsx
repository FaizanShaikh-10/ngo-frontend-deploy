// src/App.jsx (Full version)

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
import MediaGalleryPage from './pages/MediaGalleryPage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailPage from "./pages/ProjectDetailPage";


function App() {
  return (
    <>
      <Header />
      <main className="py-3 d-flex flex-column min-vh-100">
        <Container fluid className="flex-grow-1">
          <Routes>
            {/* All your routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/media" element={<MediaGalleryPage />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/contact" element={<ContactPage />} />
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