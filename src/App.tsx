import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { RecruiterProvider } from './context/RecruiterContext';
import { ThemeProvider } from './context/ThemeContext';
import { initGA, trackPageView } from './lib/analytics';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <RecruiterProvider>
        <Router>
          <AnalyticsTracker />
          <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] active-scanline selection:bg-blue-500/30 transition-colors duration-300">
            <Navbar />
            <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
            </Routes>
          </main>
          {/* Global Footer could go here if needed */}
        </div>
      </Router>
      </RecruiterProvider>
    </ThemeProvider>
  );
}
