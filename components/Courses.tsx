
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Courses: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const courses = [
    {
      title: "Play Group & Nursery",
      icon: "fa-shapes",
      features: ["Phonics & Reading", "Handwriting Basics", "Confidence Building", "Activity Based"],
      color: "from-primary/20 to-primary/5"
    },
    {
      title: "Primary (Class 1-5)",
      icon: "fa-book-open",
      features: ["All Subjects", "English Grammar Focus", "Math Concepts", "Homework Help"],
      color: "from-secondary/20 to-secondary/5"
    },
    {
      title: "Middle & Matric",
      icon: "fa-graduation-cap",
      features: ["Board Exam Prep", "Science (Phy/Chem/Bio)", "Advanced English", "Test Sessions"],
      color: "from-blue-500/20 to-blue-500/5"
    }
  ];

  return (
    <section id="courses" className="py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-semibold tracking-wider text-sm uppercase">Our Programs</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">What We Teach</h2>
        </div>

        {/* --- DESKTOP VIEW (Grid) --- */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${course.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
              <div className="relative bg-card border border-white/5 rounded-2xl p-8 h-full hover:-translate-y-2 transition-transform duration-300">
                <div className="mb-6 bg-white/5 w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white">
                  <i className={`fa-solid ${course.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{course.title}</h3>
                <ul className="space-y-3">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-muted">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- MOBILE VIEW (Accordion) --- */}
        <div className="md:hidden flex flex-col gap-4">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-white/5 rounded-xl overflow-hidden shadow-md"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white/5 active:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg">
                    <i className={`fa-solid ${course.icon}`}></i>
                  </div>
                  <span className="text-lg font-bold text-white">{course.title}</span>
                </div>
                <i 
                  className={`fa-solid fa-chevron-down text-muted transition-transform duration-300 ${expandedIndex === index ? 'rotate-180 text-primary' : ''}`}
                ></i>
              </button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-white/5">
                        <ul className="space-y-3 mt-4">
                          {course.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-gray-300 text-sm">
                              <i className="fa-solid fa-check text-primary text-xs mr-3"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Courses;
