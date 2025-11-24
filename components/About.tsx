
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const MAIN_IMAGE_URL = "https://images.unsplash.com/photo-1544531679-dad933946664?auto=format&fit=crop&q=80&w=800"; 
  const SECONDARY_IMAGE_URL = "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600";

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
    <section id="about" className="py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
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

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[500px] w-full hidden md:block"
            >
                <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">
                    <img src={MAIN_IMAGE_URL} alt="Academy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl border-2 border-dark z-20">
                     <img src={SECONDARY_IMAGE_URL} alt="Student" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
            </motion.div>
             
            <div className="md:hidden mt-8">
                 <img src={MAIN_IMAGE_URL} alt="Academy" className="w-full rounded-2xl shadow-lg mb-4" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-2xl text-primary">
                <i className={`fa-solid ${card.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-muted leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
