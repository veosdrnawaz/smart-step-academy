import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, CheckCircle, Zap } from 'lucide-react';
import { useAdmission } from './AdmissionContext';

const Hero: React.FC = () => {
  const { openModal } = useAdmission();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" id="home">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[96px] -z-10" />

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
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8">
              Build A Strong Foundation For <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Your Child's Future</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted mb-10 leading-relaxed max-w-2xl mx-auto">
              Don't just send them to tuition. Give them the <strong>Smart Step advantage</strong>. 
              Specialized English & Science coaching from Play Group to Matric by Private School experts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={openModal}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-dark font-bold rounded-lg shadow-[0_0_20px_rgba(0,191,166,0.3)] hover:shadow-[0_0_30px_rgba(0,191,166,0.5)] hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-1 text-lg"
            >
              <Zap size={20} fill="currentColor" /> Book A Free Trial Class
            </button>
            <a
              href="tel:+923261658636"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 text-primary" /> Call Now: 0326 1658636
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" /> 3-Day Free Trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" /> English Specialist
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" /> Guaranteed Results
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;