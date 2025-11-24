import React from 'react';
import { motion } from 'framer-motion';
import { Baby, BookOpen, GraduationCap } from 'lucide-react';

const Courses: React.FC = () => {
  const courses = [
    {
      title: "Play Group & Nursery",
      icon: <Baby className="w-10 h-10 text-primary" />,
      features: ["Basic Phonics", "Number Recognition", "Writing Skills", "Confidence Building"],
      color: "from-primary/20 to-primary/5"
    },
    {
      title: "Primary (Class 1-5)",
      icon: <BookOpen className="w-10 h-10 text-secondary" />,
      features: ["All Subjects Tuition", "English Grammar Focus", "Math Concepts", "Homework Assistance"],
      color: "from-secondary/20 to-secondary/5"
    },
    {
      title: "Middle & Matric (6-10)",
      icon: <GraduationCap className="w-10 h-10 text-blue-400" />,
      features: ["Board Exam Prep", "Science Subjects", "Advanced English", "Test Sessions"],
      color: "from-blue-500/20 to-blue-500/5"
    }
  ];

  return (
    <section id="courses" className="py-20 bg-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider text-sm uppercase">Our Programs</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Courses Offered</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="mb-6 bg-white/5 w-20 h-20 rounded-full flex items-center justify-center">
                  {course.icon}
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
      </div>
    </section>
  );
};

export default Courses;