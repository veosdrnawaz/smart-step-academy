
import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs: React.FC = () => {
  const features = [
    { icon: "fa-user-tie", title: "Pro Teachers", text: "Taught by real school teachers." },
    { icon: "fa-lightbulb", title: "Clear Concepts", text: "Understanding over memorization." },
    { icon: "fa-users", title: "Small Groups", text: "Personal attention for every child." },
    { icon: "fa-award", title: "Exam Focus", text: "Targeted prep for high marks." },
    { icon: "fa-wallet", title: "Affordable", text: "Quality education that fits the budget." },
    { icon: "fa-shield-halved", title: "Safe Space", text: "Secure environment for all." }
  ];

  return (
    <section id="why-us" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Us?</h2>
          <p className="mt-4 text-muted">We build the foundation for your child's success.</p>
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
              <div className="bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary text-xl">
                <i className={`fa-solid ${feature.icon}`}></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
