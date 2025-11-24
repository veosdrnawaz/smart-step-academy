
import React from 'react';
import { motion } from 'framer-motion';

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
              Your child deserves better than a general tutor. We have subject experts who actually know the curriculum inside out.
            </p>

            <div className="space-y-6">
              <div className="bg-white/5 border border-primary/20 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <i className="fa-solid fa-language text-6xl text-primary"></i>
                </div>
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">English Specialist</h3>
                    <p className="text-white text-sm mb-2 font-semibold">Experienced Private School Teacher</p>
                    <p className="text-muted text-sm">We fix grammar, improve creative writing, and boost spoken fluency.</p>
                  </div>
                  <div className="bg-primary/20 w-10 h-10 flex items-center justify-center rounded-lg text-primary">
                    <i className="fa-solid fa-check"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">Math & Science</h3>
                <p className="text-muted text-sm">
                  No rote learning. We teach Physics, Chemistry, and Math through concepts so students can solve any paper.
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
               <h3 className="text-2xl font-bold text-white mb-6">Our Methodology</h3>
               <ul className="space-y-4">
                 {[
                   "Concept-based teaching (No cramming)",
                   "Daily homework checking",
                   "Weekly test system",
                   "Special focus on weak students",
                   "Friendly, motivating environment"
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
