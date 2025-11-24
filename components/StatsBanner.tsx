import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Trophy, Clock } from 'lucide-react';

const StatsBanner: React.FC = () => {
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "500+", label: "Happy Students" },
    { icon: <Trophy className="w-6 h-6" />, value: "100%", label: "Pass Rate" },
    { icon: <BookOpen className="w-6 h-6" />, value: "15+", label: "Expert Teachers" },
    { icon: <Clock className="w-6 h-6" />, value: "10+", label: "Years Experience" },
  ];

  return (
    <div className="bg-primary/5 border-y border-white/5 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="bg-primary/10 p-3 rounded-full text-primary mb-3">
                {stat.icon}
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-white">{stat.value}</h4>
              <p className="text-muted text-sm uppercase tracking-wider font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;