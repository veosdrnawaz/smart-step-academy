
import React from 'react';
import { useAdmission } from './AdmissionContext';
import { motion } from 'framer-motion';

const Admissions: React.FC = () => {
  const { openModal } = useAdmission();

  const steps = [
    {
      icon: "fa-pen-to-square",
      title: "1. Fill Form",
      description: "Click the button and tell us about your child."
    },
    {
      icon: "fa-calendar-check",
      title: "2. Free Trial",
      description: "We schedule a 3-day free trial class for you."
    },
    {
      icon: "fa-graduation-cap",
      title: "3. Start",
      description: "If you are satisfied, we finalize admission."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-muted">Simple 3-step process to success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-blue-400/30 -z-10"></div>

            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-card border border-white/10 rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10 text-3xl text-primary">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <i className={`fa-solid ${step.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-muted text-sm px-4">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-1 shadow-[0_0_50px_rgba(0,191,166,0.2)]">
            <div className="bg-dark/90 backdrop-blur-sm rounded-[22px] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
                <h2 className="text-3xl font-extrabold text-white mb-2">Ready to Start?</h2>
                <p className="text-gray-300 font-medium text-lg mb-4">Limited seats available for new batches.</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full font-semibold text-sm border border-primary/20">Sibling Discount</span>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full font-semibold text-sm border border-primary/20">Free Trial</span>
                </div>
            </div>
            <button 
                onClick={openModal}
                className="whitespace-nowrap bg-gradient-to-r from-primary to-secondary text-dark px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2 cursor-pointer shadow-xl shadow-primary/20"
            >
                Get Started <i className="fa-solid fa-arrow-right"></i>
            </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
