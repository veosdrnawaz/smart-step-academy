
import React from 'react';
import { Link } from 'react-scroll';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const LOGO_URL = "https://placehold.co/100x100/00bfa6/ffffff?text=S";

  const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Courses', to: 'courses' },
    { name: 'Online', to: 'online' },
    { name: 'Contact', to: 'contact' }
  ];

  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-primary/20 p-1 rounded-lg mr-3">
                 <img src={LOGO_URL} alt="Logo" className="h-8 w-8 object-cover rounded bg-white" />
              </div>
              <span className="font-bold text-xl text-white">Smart Step</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Empowering students in Faisalabad with conceptual learning and English mastery.
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
              <li>Play Group</li>
              <li>Primary (1-5)</li>
              <li>Matric (Science)</li>
              <li>Spoken English</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Social</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/5 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 text-muted">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="bg-white/5 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 text-muted">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Smart Step Academy.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="text-muted text-sm flex items-center gap-1">
              Made in Faisalabad
            </p>
            <button onClick={onOpenAdmin} className="text-xs text-gray-700 hover:text-primary transition-colors">
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
