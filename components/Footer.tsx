import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer: React.FC = () => {
  // Same logo logic as Navbar
  const LOGO_URL = "https://placehold.co/100x100/00bfa6/ffffff?text=S";

  const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Courses', to: 'courses' },
    { name: 'Online Classes', to: 'online' },
    { name: 'Contact', to: 'contact' }
  ];

  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-primary/20 p-1 rounded-lg mr-3">
                 <img 
                   src={LOGO_URL} 
                   alt="Smart Step Academy Logo" 
                   className="h-8 w-8 object-cover rounded" 
                 />
              </div>
              <span className="font-bold text-xl text-white">
                Smart Step
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Empowering students from Play Group to Matric with conceptual learning and specialized English language skills in Faisalabad.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                   <Link 
                    to={item.to} 
                    smooth={true} 
                    className="text-muted text-sm hover:text-primary cursor-pointer transition-colors"
                   >
                     {item.name}
                   </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>Play Group & Nursery</li>
              <li>Primary Education</li>
              <li>Matric Preparation</li>
              <li>Spoken English (Online)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 text-muted">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 text-muted">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 text-muted">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Smart Step Academy. All rights reserved.
          </p>
          <p className="text-muted text-sm mt-2 md:mt-0 flex items-center gap-1">
            Made with <span className="text-primary">♥</span> in Faisalabad
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;