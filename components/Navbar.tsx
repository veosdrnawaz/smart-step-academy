
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdmission } from './AdmissionContext';
import { ASSETS } from '../config';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useAdmission();
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* 
         Mobile Menu Container
         - h-auto: Height fits content
         - w-48: Compact width
         - rounded-bl-3xl: Smooth styling
      */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-auto w-48 bg-card border-l border-b border-white/10 shadow-2xl z-[70] transform transition-transform duration-300 md:hidden flex flex-col rounded-bl-3xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-3 border-b border-white/5">
            <span className="font-bold text-sm text-primary pl-2">Menu</span>
        </div>
        
        <div className="flex flex-col p-2 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.to)}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}

             {/* Small, Left-Aligned CTA Button */}
             <button
                 onClick={() => {
                   setIsOpen(false);
                   openModal();
                 }}
                 className="mt-2 w-full bg-primary text-dark font-bold py-1.5 px-3 rounded-lg shadow-sm flex items-center justify-start gap-2 text-[11px] hover:bg-secondary transition-colors"
              >
                <i className="fa-solid fa-bolt text-xs"></i> Book Free Trial
              </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
