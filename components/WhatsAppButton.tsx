import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Official WhatsApp Icon SVG
const WhatsAppIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.514-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

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
                            <WhatsAppIcon size={24} className="text-white" />
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
                            <WhatsAppIcon size={20} className="text-white" /> Start Chat on WhatsApp
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
            {isOpen ? <X size={28} className="text-white" /> : <WhatsAppIcon size={32} className="text-white" />}
            
            {/* Notification Badge if closed */}
            {!isOpen && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 bg-red-500 rounded-full border-2 border-dark animate-bounce"></span>
            )}
        </button>
    </div>
  );
};

export default WhatsAppButton;