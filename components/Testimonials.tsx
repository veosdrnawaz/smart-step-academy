
import React from 'react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Mrs. Ahmed",
      role: "Parent (Class 5)",
      text: "My son's English improved so much in just 3 months. The teacher really focuses on grammar."
    },
    {
      name: "Ali Raza",
      role: "Student (Matric)",
      text: "I used to hate Physics, but the concepts are so clear here. I scored great marks in my send-ups."
    },
    {
      name: "Mrs. Fatima",
      role: "Parent (Play Group)",
      text: "Very safe and friendly place for small kids. My daughter loves going to Smart Step."
    }
  ];

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-12">What Parents Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
            >
              <i className="fa-solid fa-quote-left text-primary text-2xl mb-4 opacity-50"></i>
              <p className="text-gray-300 italic mb-6">"{review.text}"</p>
              <div>
                <h4 className="text-white font-bold">{review.name}</h4>
                <span className="text-primary text-sm">{review.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
