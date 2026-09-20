import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Início', id: 'inicio' },
    { name: 'Minha História', id: 'historia' },
    { name: 'Propostas', id: 'propostas' },
    { name: 'Obras Realizadas', id: 'obras' },
    { name: 'Agenda', id: 'agenda' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left: Logo / Name */}
          <button 
            onClick={() => scrollTo('inicio')}
            className="flex flex-col items-center leading-none focus:outline-none"
          >
            <span className="font-heading font-black text-2xl text-primary-dark tracking-tight leading-none">CANELA</span>
            <span className="font-heading font-black text-2xl text-secondary tracking-wider mt-0.5">55888</span>
          </button>

          {/* Center: Title */}
          <div className="flex flex-col items-center justify-center text-center leading-tight mx-2">
            <span className="text-[11px] sm:text-sm md:text-base font-black text-secondary [-webkit-text-stroke:_0.5px_currentColor]">CANDIDATO A DEPUTADO ESTADUAL</span>
            <span className="text-[11px] sm:text-sm md:text-base font-black text-primary-dark mt-0.5 [-webkit-text-stroke:_0.5px_currentColor]">PELO PSD</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center shrink-0">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-foreground hover:bg-black/5 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-surface flex flex-col"
          >
            <div className="h-16 px-4 flex items-center justify-between border-b border-border">
              <span className="font-heading font-black text-xl text-primary-dark tracking-tight">
                MENU
              </span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-foreground hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center gap-8 p-4">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-3xl font-heading font-bold text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
