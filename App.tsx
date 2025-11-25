
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProgramDetails from './components/ProgramDetails';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackgroundAnimation from './components/BackgroundAnimation';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-dark text-white font-sans overflow-x-hidden selection:bg-primary selection:text-dark relative">
        <BackgroundAnimation />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/program/:id" element={<ProgramDetails />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </div>
    </Router>
  );
};

export default App;
