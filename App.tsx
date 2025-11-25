
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import About from './components/About';
import Courses from './components/Courses';
import Specialists from './components/Specialists';
import OnlineClasses from './components/OnlineClasses';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Admissions from './components/Admissions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackgroundAnimation from './components/BackgroundAnimation';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark text-white font-sans overflow-x-hidden selection:bg-primary selection:text-dark relative">
      <BackgroundAnimation />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <StatsBanner />
        <About />
        <Courses />
        <Specialists />
        <OnlineClasses />
        <WhyChooseUs />
        <Testimonials />
        <Admissions />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default App;