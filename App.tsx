import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Specialists from './components/Specialists';
import OnlineClasses from './components/OnlineClasses';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Admissions from './components/Admissions';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark text-white font-sans overflow-x-hidden selection:bg-primary selection:text-dark">
      <Navbar />
      <main>
        <Hero />
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
    </div>
  );
};

export default App;