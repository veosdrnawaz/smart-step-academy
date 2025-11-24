import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Specialists: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-dark to-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Expert Subject Specialists
            </h2>
            <p className="text-muted text-lg mb-8">
              Our faculty comprises experienced educators from reputed private schools who understand the curriculum needs of modern students.
            </p>

            <div className="space-y-6">
              <div className="bg-white/5 border border-primary/20 p-6 rounded-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">English Specialist</h3>
                    <p className="text-white text-sm mb-2">Private School Teacher Experience</p>
                    <p className="text-muted text-sm">Focus on Grammar, Vocabulary, Creative Writing, and Spoken English.</p>
                  </div>
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">Math & Science</h3>
                <p className="text-muted text-sm">
                  Concept-based learning for Physics, Chemistry, Biology, and Mathematics. Focus on numericals and theory clarity.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">Urdu & Islamiat</h3>
                <p className="text-muted text-sm">
                  Improvement in handwriting, reading fluency, and complete syllabus coverage.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="relative z-10 bg-card border border-white/10 rounded-2xl p-8 shadow-2xl">
               <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
               <h3 className="text-2xl font-bold text-white mb-6">Teaching Methodology</h3>
               <ul className="space-y-4">
                 {[
                   "Concept-based teaching (No rote learning)",
                   "Daily homework checks",
                   "Weekly test system",
                   "One-on-one attention for weak students",
                   "Friendly and motivating environment"
                 ].map((item, index) => (
                   <li key={index} className="flex items-center text-gray-300">
                     <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary font-bold text-sm">
                       {index + 1}
                     </span>
                     {item}
                   </li>
                 ))}
               </ul>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Specialists;