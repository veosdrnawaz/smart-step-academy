
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAdmission } from './AdmissionContext';

const Hero: React.FC = () => {
  const { openModal } = useAdmission();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]); // Moves background slower than content

  return (
    <section className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 overflow-hidden h-full min-h-screen flex items-center" id="home">
      
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-dark/90 z-10"></div> {/* Dark Overlay */}
        <img 
            src="https://images.unsplash.com/photo-1614726365203-c60317e33527?q=80&w=2066&auto=format&fit=crop" 
            alt="Education Background" 
            className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[96px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold tracking-wider uppercase mb-6 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Admissions Open 2024-25
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
              Expert Tuition That <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Delivers Results</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted mb-10 leading-relaxed max-w-2xl mx-auto px-2">
              Stop struggling with grades. Get specialized coaching for English, Science, and Math from Play Group to Matric. Taught by Private School experts in Faisalabad.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full px-4 sm:px-0"
          >
            <button
              onClick={openModal}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-dark font-bold rounded-lg shadow-lg hover:shadow-primary/30 hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2 text-lg"
            >
              <i className="fa-solid fa-bolt"></i> Book Free Trial Class
            </button>
            <a
              href="tel:+923261658636"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-phone"></i> 0326 1658636
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted px-4"
          >
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check-circle text-primary"></i> 3-Day Free Trial
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check-circle text-primary"></i> English Specialist
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check-circle text-primary"></i> Guaranteed Improvement
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
