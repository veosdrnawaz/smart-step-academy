
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const phoneNumber = "923261658636";
  // Pre-filled message to identify that the user came from the website
  const message = "Asalam-o-Alaikum! I am visiting your website and would like to know more about Smart Step Academy.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Handle click outside to close the chat box
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="mb-4 bg-white rounded-2xl shadow-2xl w-80 overflow-hidden border border-gray-200 font-sans text-dark"
                >
                    <div className="bg-[#075e54] p-4 text-white flex items-center gap-3">
                        <div className="text-3xl"><i className="fa-brands fa-whatsapp"></i></div>
                        <div>
                            <h3 className="font-bold text-base">Smart Step Academy</h3>
                            <p className="text-[11px] opacity-90">Replies within an hour</p>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-[#e5ddd5] min-h-[200px] flex flex-col gap-2">
                         <div className="bg-white p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm max-w-[85%] text-sm">
                            Asalam-o-Alaikum! 👋 <br/> How can we help you today?
                         </div>
                    </div>
                    
                    <div className="p-3 bg-white border-t border-gray-100">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold py-3 rounded-full hover:bg-[#20bd5a]">
                            <i className="fa-brands fa-whatsapp"></i> Start Chat
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 text-2xl text-white ${isOpen ? 'bg-gray-700' : 'bg-[#25D366]'}`}
        >
            {isOpen ? <i className="fa-solid fa-times"></i> : <i className="fa-brands fa-whatsapp"></i>}
        </button>
    </div>
  );
};

export default WhatsAppButton;
