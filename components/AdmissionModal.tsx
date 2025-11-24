import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle, BookOpen, Loader2 } from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// NOTE: Ensure you use the same Google Script URL here as in Contact.tsx
// If you haven't deployed it yet, check google-apps-script.js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGel1jQ1lkOHtP5PBOnbyOOpniX2NIakWGFCryiTRAvdkvpqGht908sitmh6Gr9TUuxQ/exec";

const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus('submitting');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Admission Popup' }),
      });

      setFormStatus('success');
      setFormData({ name: '', grade: '', phone: '', message: '' });
      
      // Auto close after success
      setTimeout(() => {
        setFormStatus('idle');
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting form", error);
      setFormStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm transition-all"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[101] my-8"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Start Admission</h2>
                  <p className="text-xs text-muted">Fill details to book a trial class</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 text-muted hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {formStatus === 'success' ? (
                <div className="text-center py-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Application Sent!</h3>
                  <p className="text-muted">We will contact you shortly to schedule your trial class.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Student Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter student's full name"
                      className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Grade / Class</label>
                      <input 
                        type="text" 
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Class 5"
                        className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="0321..."
                        className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Interested In</label>
                    <select 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                    >
                      <option value="" className="bg-card">Select a program...</option>
                      <option value="Play Group / Nursery" className="bg-card">Play Group / Nursery</option>
                      <option value="Primary School Tuition" className="bg-card">Primary School Tuition</option>
                      <option value="Matric Prep" className="bg-card">Matric Prep</option>
                      <option value="Online English Course" className="bg-card">Online English Course</option>
                      <option value="Other" className="bg-card">Other</option>
                    </select>
                  </div>

                  {formStatus === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-dark font-bold py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,191,166,0.4)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98]"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-[10px] text-gray-500 mt-2">
                    By submitting, you agree to be contacted by Smart Step Academy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdmissionModal;