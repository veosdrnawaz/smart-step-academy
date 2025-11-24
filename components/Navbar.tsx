import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Link } from 'react-scroll';
import { useAdmission } from './AdmissionContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useAdmission();

  // INSTRUCTION: Replace this URL with your uploaded logo image link
  const LOGO_URL = "https://placehold.co/100x100/00bfa6/ffffff?text=S";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', to: 'about' },
    { name: 'Courses', to: 'courses' },
    { name: 'Online', to: 'online' },
    { name: 'Why Us', to: 'why-us' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Logo Image */}
            <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-lg mr-3 shadow-lg">
               <img 
                 src={LOGO_URL} 
                 alt="Smart Step Academy Logo" 
                 className="h-8 w-8 object-cover rounded bg-white" 
               />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Smart Step <span className="text-primary">Academy</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer text-muted hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
              <button
                 onClick={openModal}
                 className="bg-gradient-to-r from-primary to-secondary text-dark border-none hover:shadow-[0_0_20px_rgba(0,191,166,0.5)] px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <Zap size={16} fill="currentColor" /> Book Free Trial
              </button>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-white/5 shadow-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
             <button
                 onClick={() => {
                   setIsOpen(false);
                   openModal();
                 }}
                 className="flex items-center justify-center gap-2 w-full text-center mt-4 bg-primary text-dark font-bold px-4 py-3 rounded-lg shadow-lg"
              >
                <Zap size={18} fill="currentColor" /> Book Free Trial Class
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;