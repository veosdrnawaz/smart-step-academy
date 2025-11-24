import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Configuration
  const phoneNumber = "923261658636";
  const preFilledMessage = "Hello! I visited the Smart Step Academy website and I am interested in admission details.";
  
  // Create the direct link
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(preFilledMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="mb-4 bg-white rounded-2xl shadow-2xl w-80 overflow-hidden border border-gray-200 font-sans"
                >
                    {/* Header */}
                    <div className="bg-[#075e54] p-4 text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-base leading-tight">Smart Step Academy</h3>
                            <p className="text-[11px] opacity-90 text-green-100">Typically replies within 1 hour</p>
                        </div>
                    </div>
                    
                    {/* Chat Body */}
                    <div 
                        className="p-4 bg-[#e5ddd5] min-h-[200px] flex flex-col gap-2 relative"
                        style={{
                             backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                             backgroundSize: '300px',
                             backgroundBlendMode: 'soft-light'
                        }}
                    >
                         <div className="bg-white p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm max-w-[85%] self-start text-sm text-gray-800 leading-relaxed relative">
                            <span className="text-[10px] font-bold text-orange-500 block mb-1">Admin</span>
                            Asalam-o-Alaikum! 👋 <br/>
                            Welcome to Smart Step Academy. How can we help you with admissions or online classes today?
                            <span className="text-[10px] text-gray-400 block text-right mt-1">Just now</span>
                         </div>
                    </div>
                    
                    {/* Footer / CTA */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <a 
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <MessageCircle size={20} /> Start Chat on WhatsApp
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
                p-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] 
                transition-all duration-300 hover:scale-110 flex items-center justify-center relative
                ${isOpen ? 'bg-gray-700 rotate-90' : 'bg-[#25D366] rotate-0'}
            `}
            aria-label="Toggle WhatsApp Chat"
        >
            {isOpen ? <X size={28} className="text-white" /> : <MessageCircle size={32} className="text-white" />}
            
            {/* Notification Badge if closed */}
            {!isOpen && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 bg-red-500 rounded-full border-2 border-dark animate-bounce"></span>
            )}
        </button>
    </div>
  );
};

export default WhatsAppButton;