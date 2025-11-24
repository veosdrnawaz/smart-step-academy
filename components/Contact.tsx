
import React, { useState } from 'react';
import { https://script.google.com/macros/s/AKfycby45RBg-tlFMNqRFIiIFjsqEkmqjA57CbfaI__TKbtMYK-InSvzAJx5K36qgUj0txOmUQ/exec } from '../config';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      // Using 'text/plain' Content-Type avoids CORS preflight checks for simple POST
      await fetch(https://script.google.com/macros/s/AKfycby45RBg-tlFMNqRFIiIFjsqEkmqjA57CbfaI__TKbtMYK-InSvzAJx5K36qgUj0txOmUQ/exec, {
        method: 'POST',
        body: JSON.stringify({ ...formData, action: 'submit', source: 'Contact Form' }),
      });

      // We assume success if no network error occurred (since no-cors/opaque response)
      setFormStatus('success');
      setFormData({ name: '', grade: '', phone: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error("Error submitting form", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h2>
          <p className="mt-4 text-muted">Visit our campus or call us today.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card border border-white/5 p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Academy Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 w-10 h-10 flex items-center justify-center rounded-lg text-primary text-lg">
                    <i className="fa-solid fa-map-pin"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Address</h4>
                    <p className="text-muted">People’s Colony No. 2, Faisalabad</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 w-10 h-10 flex items-center justify-center rounded-lg text-primary text-lg">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Call / WhatsApp</h4>
                    <a href="tel:+923261658636" className="text-muted hover:text-primary transition-colors">+92 326 1658636</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 w-10 h-10 flex items-center justify-center rounded-lg text-primary text-lg">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Timings</h4>
                    <p className="text-muted">Mon - Sat: 2:00 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-64 bg-card rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center relative group shadow-lg">
                <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Faisalabad_montage.jpg')] bg-cover bg-center"></div>
                <div className="z-10 text-center p-4 bg-dark/80 backdrop-blur-sm rounded-xl">
                    <i className="fa-solid fa-location-dot text-4xl text-red-500 mb-2"></i>
                    <p className="text-white font-bold">People's Colony No. 2</p>
                    <a 
                        href="https://www.google.com/maps/search/?api=1&query=Peoples+Colony+No+2+Faisalabad" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline mt-1 block"
                    >
                        Open in Maps
                    </a>
                </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-white/5 p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Student Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Ali Khan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Class</label>
                  <input type="text" name="grade" value={formData.grade} onChange={handleChange} required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Class 5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="0300 1234567" />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Message</label>
                <textarea rows={4} name="message" value={formData.message} onChange={handleChange} className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="I want to know about..." />
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="w-full bg-primary text-dark font-bold py-4 rounded-lg hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2"
              >
                {formStatus === 'submitting' ? (
                  <span>Sending...</span>
                ) : formStatus === 'success' ? (
                  <span className="flex items-center gap-2"><i className="fa-solid fa-check"></i> Sent!</span>
                ) : formStatus === 'error' ? (
                  <span className="flex items-center gap-2"><i className="fa-solid fa-triangle-exclamation"></i> Error</span>
                ) : (
                    <>
                        <span>Submit</span>
                        <i className="fa-solid fa-paper-plane"></i>
                    </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
