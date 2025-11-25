
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdmission } from './AdmissionContext';
import { ASSETS } from '../config';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useAdmission();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

  const handleNavClick = (to: string) => {
    setIsOpen(false);
    if (isHomePage) {
      const element = document.getElementById(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const goHome = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={goHome}>
              <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-lg mr-3 shadow-lg">
                 <img src={ASSETS.LOGO} alt="Logo" className="h-8 w-8 object-cover rounded bg-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Smart Step <span className="text-primary">Academy</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.to)}
                    className="cursor-pointer text-muted hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-transparent border-none"
                  >
                    {link.name}
                  </button>
                ))}
                <button
                   onClick={openModal}
                   className="bg-gradient-to-r from-primary to-secondary text-dark border-none px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                >
                  <i className="fa-solid fa-bolt mr-2"></i> Book Free Trial
                </button>
              </div>
            </div>
            
            {/* Mobile Hamburger */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary focus:outline-none"
              >
                <i className="fa-solid fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Right Side) */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      <div className={`fixed top-0 right-0 h-full w-72 bg-card border-l border-white/10 shadow-2xl z-[70] transform transition-transform duration-300 md:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <span className="font-bold text-xl text-white">Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white">
                <i className="fa-solid fa-times text-2xl"></i>
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.to)}
                className="block w-full text-left px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
        </div>

        <div className="p-6 border-t border-white/5 bg-dark/50">
             <button
                 onClick={() => {
                   setIsOpen(false);
                   openModal();
                 }}
                 className="w-full bg-primary text-dark font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-bolt"></i> Book Free Trial
              </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
