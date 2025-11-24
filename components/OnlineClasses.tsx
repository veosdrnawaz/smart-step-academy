import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Video, Clock, Users, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-scroll';

const OnlineClasses: React.FC = () => {
  return (
    <section id="online" className="py-20 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Online Classes Available</h2>
          <p className="mt-4 text-muted text-lg">Learn from the comfort of your home with our specialized online programs.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Main Focus: English */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border-2 border-primary/20 rounded-3xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 bg-primary text-dark text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Most Popular
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Spoken English & Grammar</h3>
              <p className="text-primary font-medium mb-6">Online Specialization Course</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                  <Clock className="text-secondary w-5 h-5" />
                  <div>
                    <div className="text-xs text-muted">Duration</div>
                    <div className="text-white text-sm font-semibold">30 Mins / Session</div>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                  <Users className="text-secondary w-5 h-5" />
                  <div>
                    <div className="text-xs text-muted">Group Size</div>
                    <div className="text-white text-sm font-semibold">4-8 Students</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h4 className="text-white font-semibold">Curriculum Includes:</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"/> Grammar Rules & Application</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"/> Vocabulary Building</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"/> Speaking & Confidence</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"/> Weekly Homework & Worksheets</li>
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-muted text-sm">5 Days / Week (Mon-Fri)</span>
                <span className="text-white font-bold">1:1 Option Available</span>
              </div>
            </div>
          </motion.div>

          {/* Other Subjects & Steps */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-white/5 p-8 rounded-2xl flex-1"
            >
              <h3 className="text-xl font-bold text-white mb-4">Other Online Subjects</h3>
              <p className="text-muted mb-6">Comprehensive online tuition available for regular academic syllabus.</p>
              <div className="flex flex-wrap gap-3">
                {['Mathematics', 'General Science', 'Urdu', 'Islamiat', 'Physics (9-10)', 'Biology (9-10)'].map((sub, i) => (
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
                {[
                  "Contact Academy via WhatsApp",
                  "Share Student Grade & Subject",
                  "Get Trial Class Link",
                  "Start Learning"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <div className="text-gray-300 text-sm">{step}</div>
                    {idx < 3 && <ChevronRight className="w-4 h-4 text-white/20 ml-auto" />}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="contact" smooth={true} duration={500} className="w-full block text-center bg-primary text-dark py-3 rounded-lg font-bold hover:bg-secondary transition-colors cursor-pointer">
                  Start Admission Process
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineClasses;