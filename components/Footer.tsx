
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ASSETS } from '../config';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (to: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(to);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(to);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const programs = [
    { name: 'Play Group', id: 'play-group' },
    { name: 'Primary (1-5)', id: 'primary' },
    { name: 'Matric (Science)', id: 'matric' },
    { name: 'Spoken English', id: 'spoken-english' }
  ];

  const phoneNumber = "923261658636";
  const message = "Asalam-o-Alaikum! I am visiting your website and would like to know more about Smart Step Academy.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-primary/20 p-1 rounded-lg mr-3">
                 <img src={ASSETS.LOGO} alt="Logo" className="h-8 w-8 object-cover rounded bg-white" />
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
              {['home', 'about', 'courses', 'online', 'contact'].map((item) => (
                <li key={item}>
                   <button 
                    onClick={() => handleNavClick(item)} 
                    className="text-muted text-sm hover:text-primary cursor-pointer transition-colors bg-transparent border-none capitalize"
                   >
                     {item}
                   </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-muted">
              {programs.map((prog) => (
                <li key={prog.id}>
                  <button 
                    onClick={() => {
                        navigate(`/program/${prog.id}`);
                        window.scrollTo(0,0);
                    }}
                    className="text-muted hover:text-primary transition-colors text-left bg-transparent border-none p-0 cursor-pointer"
                  >
                    {prog.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Social</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 text-muted"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 text-muted"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 text-muted"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex justify-center items-center">
          <p className="text-muted text-sm text-center">
            &copy; {new Date().getFullYear()} Smart Step Academy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
