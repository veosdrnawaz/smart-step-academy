import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h2>
          <p className="mt-4 text-muted">Visit us for a campus tour or book a free trial class.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card border border-white/5 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Academy Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Location</h4>
                    <p className="text-muted">People’s Colony No. 2, Faisalabad, Pakistan</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Phone & WhatsApp</h4>
                    <a href="tel:+923261658636" className="text-muted hover:text-primary transition-colors">+92 326 1658636</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Office Hours</h4>
                    <p className="text-muted">Monday - Saturday: 2:00 PM - 8:00 PM</p>
                    <p className="text-muted text-sm mt-1">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder - Visual Representation */}
            <div className="w-full h-64 bg-card rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center relative group">
                {/* Simulated Map Look */}
                <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
                <div className="z-10 text-center">
                    <MapPin className="w-10 h-10 text-red-500 mx-auto mb-2 drop-shadow-lg" />
                    <p className="text-white font-bold">People's Colony No. 2</p>
                    <a 
                        href="https://www.google.com/maps/search/?api=1&query=Peoples+Colony+No+2+Faisalabad" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline mt-1 block"
                    >
                        View on Google Maps
                    </a>
                </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-white/5 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Student Name</label>
                  <input type="text" required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Ali Khan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Class / Grade</label>
                  <input type="text" required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="e.g. Class 5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Phone Number</label>
                <input type="tel" required className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="+92 326 1658636" />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Message</label>
                <textarea rows={4} className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="I am interested in..." />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary text-dark font-bold py-4 rounded-lg hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                {formStatus === 'success' ? (
                    <span>Message Sent!</span>
                ) : (
                    <>
                        <span>Submit Inquiry</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
                {/* Ripple Effect Container */}
                <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg origin-center"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;