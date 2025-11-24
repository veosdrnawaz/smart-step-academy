import React from 'react';
import { GraduationCap, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-primary/20 p-2 rounded-lg mr-2">
                <GraduationCap className="h-6 w-6 text-primary" />
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
              {['Home', 'About', 'Courses', 'Online Classes', 'Contact'].map((item) => (
                <li key={item}>
                   <Link 
                    to={item.toLowerCase().split(' ')[0]} 
                    smooth={true} 
                    className="text-muted text-sm hover:text-primary cursor-pointer transition-colors"
                   >
                     {item}
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