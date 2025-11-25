
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOOGLE_SCRIPT_URL } from '../config';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        // 'text/plain' prevents CORS preflight issues while allowing body data
        body: JSON.stringify({ ...formData, action: 'submit', source: 'Admission Popup' }),
      });

      setFormStatus('success');
      setFormData({ name: '', grade: '', phone: '', message: '' });
      
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[101] my-8"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Book Free Trial</h2>
                  <p className="text-xs text-muted">No commitment required.</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-muted hover:text-white transition-colors">
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-6">
              {formStatus === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                    <i className="fa-solid fa-check-circle"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Done!</h3>
                  <p className="text-muted">We will call you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Student Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Student Name" className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Class</label>
                      <input type="text" name="grade" value={formData.grade} onChange={handleChange} required placeholder="Class" className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone" className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Interest</label>
                    <select name="message" value={formData.message} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none appearance-none">
                      <option value="" className="bg-card">Select Option...</option>
                      <option value="Free Trial" className="bg-card">Book Free Trial Class</option>
                      <option value="Fee Info" className="bg-card">Fee Structure</option>
                      <option value="Online Class" className="bg-card">Online Class</option>
                    </select>
                  </div>

                  {formStatus === 'error' && (
                    <div className="text-red-400 text-sm text-center">Something went wrong. Try again.</div>
                  )}

                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-dark font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20"
                  >
                    {formStatus === 'submitting' ? (
                      <>Processing...</>
                    ) : (
                      <>Book Now <i className="fa-solid fa-paper-plane"></i></>
                    )}
                  </button>
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
    