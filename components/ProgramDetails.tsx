
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmission } from './AdmissionContext';

const programData: Record<string, { title: string; subtitle: string; description: string; features: string[]; icon: string; image: string }> = {
  'play-group': {
    title: 'Play Group & Nursery',
    subtitle: 'Early Childhood Education',
    description: 'Our Play Group program focuses on cognitive development through activity-based learning. We build a strong foundation in phonics, basic numeracy, and social skills in a safe, caring environment.',
    features: ['Phonics & Reading', 'Handwriting Basics', 'Creative Arts', 'Social Confidence', 'Daily Activity Reports'],
    icon: 'fa-shapes',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000'
  },
  'primary': {
    title: 'Primary Education (1-5)',
    subtitle: 'Building Strong Foundations',
    description: 'We ensure your child masters core concepts in English, Math, and Science. Our specialized homework assistance and weekly test system guarantees improvement in school grades.',
    features: ['All Subjects Covered', 'English Grammar Focus', 'Math Concept Clarity', 'Homework Assistance', 'Handwriting Improvement'],
    icon: 'fa-book-open',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000'
  },
  'matric': {
    title: 'Matric (Science)',
    subtitle: 'Board Exam Preparation',
    description: 'Expert coaching for Physics, Chemistry, Biology, and Math. We focus on paper presentation, time management, and concept clarity to maximize board exam scores.',
    features: ['Physics, Chem, Bio, Math', 'Test Session Series', 'Paper Presentation Skills', 'Past Paper Practice', 'Concept Based Learning'],
    icon: 'fa-microscope',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000'
  },
  'spoken-english': {
    title: 'Spoken English',
    subtitle: 'Fluency & Confidence',
    description: 'A dedicated course to improve communication skills. Perfect for students wanting to improve their accent, vocabulary, and public speaking confidence.',
    features: ['Conversation Practice', 'Vocabulary Building', 'Accent Reduction', 'Public Speaking', 'Grammar Correction'],
    icon: 'fa-comments',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000'
  }
};

const ProgramDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openModal } = useAdmission();
  
  const data = id ? programData[id] : null;

  useEffect(() => {
    if (!data) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [data, navigate]);

  if (!data) return null;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-dark">
      {/* Header */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-dark/60 z-10"></div>
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center text-3xl mb-4 mx-auto backdrop-blur-md border border-primary/30">
                    <i className={`fa-solid ${data.icon}`}></i>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2">{data.title}</h1>
                <p className="text-xl text-primary font-medium">{data.subtitle}</p>
            </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
                <div className="bg-card border border-white/5 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-4">Program Overview</h2>
                    <p className="text-muted leading-relaxed text-lg">{data.description}</p>
                </div>

                <div className="bg-card border border-white/5 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">What We Cover</h2>
                    <div className="grid gap-4">
                        {data.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                                <i className="fa-solid fa-check-circle text-primary text-xl"></i>
                                <span className="text-gray-200 font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar CTA */}
            <div className="md:col-span-1">
                <div className="sticky top-28 bg-gradient-to-br from-card to-white/5 border border-primary/20 p-6 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Join This Class</h3>
                    <p className="text-sm text-muted mb-6">Limited seats available for the upcoming batch.</p>
                    
                    <button 
                        onClick={openModal}
                        className="w-full bg-primary text-dark font-bold py-3 rounded-xl hover:bg-secondary transition-colors mb-4 flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-bolt"></i> Book Free Trial
                    </button>
                    
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full bg-transparent border border-white/20 text-white font-medium py-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                        Back to Home
                    </button>

                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-sm text-muted mb-2">Have questions?</p>
                        <a href="tel:+923261658636" className="text-primary font-bold hover:underline">0326 1658636</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
