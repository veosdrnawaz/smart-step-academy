
import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../config';

const About: React.FC = () => {
  const cards = [
    {
      icon: "fa-bullseye",
      title: "Our Mission",
      description: "We don't just help with homework; we build concepts that last a lifetime."
    },
    {
      icon: "fa-book-open-reader",
      title: "English Specialists",
      description: "Led by top private school teachers, we turn English from a struggle into a strength."
    },
    {
      icon: "fa-chart-line",
      title: "Real Growth",
      description: "Weekly tests and monthly reports ensure you know exactly how your child is progressing."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-20">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Who We Are</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Not Just Another <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tuition Center</span>
                </h2>
                <p className="text-muted text-lg mb-6 leading-relaxed">
                    Welcome to Smart Step Academy in People’s Colony No. 2. We believe that every child is smart—they just need the right step forward.
                </p>
                <p className="text-muted text-lg mb-8 leading-relaxed">
                   Most tuitions are crowded and chaotic. We are different. We offer a structured, professional environment where your child gets individual attention to master difficult subjects like English and Science.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Professional Faculty', 'Small Batches', 'Weekly Tests', 'Safe & Secure'].map((item, i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <i className="fa-solid fa-check-circle text-primary"></i>
                            <span className="text-gray-300">{item}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Responsive Layered Images: Visible on all devices, height scales with screen */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[320px] sm:h-[400px] lg:h-[500px] w-full mt-10 lg:mt-0"
            >
                <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">
                    <img src={ASSETS.ABOUT_MAIN} alt="Academy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl border-2 border-dark z-20">
                     <img src={ASSETS.ABOUT_SECONDARY} alt="Student" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card border border-white/5 p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="bg-white/5 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-xl md:text-2xl text-primary">
                <i className={`fa-solid ${card.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-muted leading-relaxed text-sm md:text-base">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
