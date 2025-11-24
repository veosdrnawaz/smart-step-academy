import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Lightbulb, Wallet, Users, Award } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      title: "Experienced Faculty",
      text: "Taught by professional Private School Teachers."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-secondary" />,
      title: "Concept Clarity",
      text: "We prioritize deep understanding over rote memorization."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Small Groups",
      text: "Limited students per class to ensure individual attention."
    },
    {
      icon: <Award className="w-6 h-6 text-purple-400" />,
      title: "Exam Focused",
      text: "Special preparation for exams and monthly tests."
    },
    {
      icon: <Wallet className="w-6 h-6 text-green-400" />,
      title: "Affordable Fees",
      text: "Premium education at a price accessible to parents."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-400" />,
      title: "Safe Environment",
      text: "Secure and friendly atmosphere for all students."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Smart Step?</h2>
          <p className="mt-4 text-muted">We build the foundation for a bright academic future.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 border border-white/5 p-6 rounded-xl hover:bg-card transition-colors duration-300"
            >
              <div className="bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;