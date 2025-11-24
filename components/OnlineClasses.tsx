
import React from 'react';
import { motion } from 'framer-motion';
import { useAdmission } from './AdmissionContext';

const OnlineClasses: React.FC = () => {
  const { openModal } = useAdmission();

  return (
    <section id="online" className="py-20 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 text-primary text-xl">
            <i className="fa-solid fa-globe"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Online Classes</h2>
          <p className="mt-4 text-muted text-lg">Quality education from the comfort of your home.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border-2 border-primary/20 rounded-3xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 bg-primary text-dark text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Best Seller
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Spoken English & Grammar</h3>
              <p className="text-primary font-medium mb-6">Live Online Sessions</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                  <i className="fa-solid fa-clock text-secondary text-xl"></i>
                  <div>
                    <div className="text-xs text-muted">Duration</div>
                    <div className="text-white text-sm font-semibold">30 Mins/Day</div>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                  <i className="fa-solid fa-user-group text-secondary text-xl"></i>
                  <div>
                    <div className="text-xs text-muted">Group</div>
                    <div className="text-white text-sm font-semibold">Small Batches</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h4 className="text-white font-semibold">What We Cover:</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex gap-2"><i className="fa-solid fa-check text-primary mt-1"></i> Grammar Mastery</li>
                  <li className="flex gap-2"><i className="fa-solid fa-check text-primary mt-1"></i> Vocabulary Building</li>
                  <li className="flex gap-2"><i className="fa-solid fa-check text-primary mt-1"></i> Speaking Confidence</li>
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-muted text-sm">Mon-Fri Classes</span>
                <span className="text-white font-bold">1-on-1 Available</span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-white/5 p-8 rounded-2xl flex-1"
            >
              <h3 className="text-xl font-bold text-white mb-4">Other Online Subjects</h3>
              <p className="text-muted mb-6">We also offer online tuition for regular school syllabus.</p>
              <div className="flex flex-wrap gap-3">
                {['Math', 'Science', 'Urdu', 'Physics', 'Biology'].map((sub, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/10">
                    {sub}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="bg-gradient-to-r from-card to-white/5 border border-white/5 p-8 rounded-2xl flex-1"
            >
              <h3 className="text-xl font-bold text-white mb-6">How to Join?</h3>
              <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">1</div>
                    <div className="text-gray-300 text-sm">Book a Trial</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">2</div>
                    <div className="text-gray-300 text-sm">Take Assessment</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">3</div>
                    <div className="text-gray-300 text-sm">Start Learning</div>
                  </div>
              </div>
              <div className="mt-8">
                <button 
                  onClick={openModal}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-dark py-3 rounded-lg font-bold hover:bg-secondary transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-bolt"></i> Start Free Trial
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineClasses;
