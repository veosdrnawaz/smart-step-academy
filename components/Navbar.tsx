import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg mr-2">
              <GraduationCap className="h-6 w-6 text-dark" />
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
              <Link
                 to="contact"
                 smooth={true}
                 duration={500}
                 className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-dark px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
              >
                Enroll Now
              </Link>
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
        <div className="md:hidden bg-card border-b border-white/5">
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
             <Link
                 to="contact"
                 smooth={true}
                 duration={500}
                 onClick={() => setIsOpen(false)}
                 className="block w-full text-center mt-4 bg-primary text-dark font-bold px-4 py-3 rounded-lg"
              >
                Enroll Now
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;