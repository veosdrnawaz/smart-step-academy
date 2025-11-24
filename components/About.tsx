import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  // INSTRUCTION: Replace these URLs with your actual images when you have them.
  // Image 1: Main large image (e.g., Academy building or a classroom shot)
  const MAIN_IMAGE_URL = "https://images.unsplash.com/photo-1544531679-dad933946664?auto=format&fit=crop&q=80&w=800"; 
  // Image 2: Smaller overlapping image (e.g., Close up of student writing or teacher)
  const SECONDARY_IMAGE_URL = "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600";

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
    <section id="about" className="py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section with Images */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">About Us</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    More Than Just A <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tuition Center</span>
                </h2>
                <p className="text-muted text-lg mb-6 leading-relaxed">
                    At Smart Step Academy, we believe every child has the potential to excel. Located in the heart of People’s Colony No. 2, we provide a structured yet friendly environment where students can thrive.
                </p>
                <p className="text-muted text-lg mb-8 leading-relaxed">
                    Our focus isn't just on homework; it's on <strong>concept building</strong>. Whether it's mastering English grammar or understanding complex Science theories, we ensure your child leaves with clarity and confidence.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Experienced Faculty', 'Personalized Attention', 'Regular Assessments', 'Safe Environment'].map((item, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Images Composition */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[500px] w-full hidden md:block"
            >
                {/* Main Image */}
                <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">
                    <img 
                        src={MAIN_IMAGE_URL} 
                        alt="Academy Environment" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>
                
                {/* Secondary Image (Floating) */}
                <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border-2 border-dark z-20">
                     <img 
                        src={SECONDARY_IMAGE_URL} 
                        alt="Students Learning" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -z-10"></div>
            </motion.div>
             {/* Mobile Image Fallback */}
            <div className="md:hidden mt-8">
                 <img 
                    src={MAIN_IMAGE_URL} 
                    alt="Smart Step Academy" 
                    className="w-full rounded-2xl shadow-lg mb-4" 
                 />
            </div>
        </div>

        {/* Existing Cards Section */}
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