import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  const cards = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Our Mission",
      description: "To provide high-quality education that strengthens core concepts and builds confidence in students from Play Group to Matric."
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: "English Specialization",
      description: "Led by an experienced English Subject Specialist (Private School Teacher), we focus on grammar, spoken fluency, and creative writing."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      title: "Student Growth",
      description: "We focus on continuous improvement through regular testing, personalized attention in small groups, and monthly progress reports."
    }
  ];

  return (
    <section id="about" className="py-20 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Smart Step Academy</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            We are dedicated to shaping the future of students in Faisalabad through conceptual learning and a friendly, productive environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-muted leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;