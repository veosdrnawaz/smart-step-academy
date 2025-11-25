
import React from 'react';
import Hero from './Hero';
import StatsBanner from './StatsBanner';
import About from './About';
import Courses from './Courses';
import Specialists from './Specialists';
import OnlineClasses from './OnlineClasses';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import Admissions from './Admissions';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
