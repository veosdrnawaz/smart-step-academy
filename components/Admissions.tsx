import React from 'react';
import { Link } from 'react-scroll';
import { ArrowRight } from 'lucide-react';

const Admissions: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary/90 to-secondary/90 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-[0_0_50px_rgba(0,191,166,0.2)]">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-extrabold text-dark mb-2">Admissions Open</h2>
            <p className="text-dark/80 font-medium text-lg mb-4">Limited seats available for the upcoming session.</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               <span className="bg-dark/10 px-3 py-1 rounded-full text-dark font-semibold text-sm">Sibling Discount Available</span>
               <span className="bg-dark/10 px-3 py-1 rounded-full text-dark font-semibold text-sm">Free Trial Class</span>
            </div>
          </div>
          <Link 
            to="contact"
            smooth={true}
            duration={500}
            className="whitespace-nowrap bg-dark text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2 cursor-pointer shadow-xl"
          >
            Enroll Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admissions;