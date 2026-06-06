import React, { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const whatsappLink = "https://wa.me/5589999999999?text=Olá,%20gostaria%20de%20falar%20com%20a%20equipe%20do%20Vereador%20Canela!";

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
    { name: 'Projetos', id: 'projetos' },
    { name: 'Gabinete Aberto', id: 'contato' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo / Name */}
          <button 
            onClick={() => scrollTo('inicio')}
            className="flex items-center gap-2 focus:outline-none"
          >
            <span className="font-heading font-black text-xl text-primary-dark tracking-tight">
              CANELA
            </span>
          </button>

          {/* Desktop Nav (hidden on mobile, but keeping for scaling if needed later) */}
          <nav className="hidden md:flex gap-6 items-center absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)}
                className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" className="hidden sm:flex rounded-full px-4 bg-green-600 hover:bg-green-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button variant="primary" size="sm" className="sm:hidden w-10 h-10 p-0 rounded-full bg-green-600 hover:bg-green-700">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-foreground hover:bg-black/5 rounded-full transition-colors md:hidden"
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
              
              <div className="w-16 h-1 bg-primary/20 rounded-full my-4" />
              
              <button 
                onClick={() => scrollTo('mobilize')}
                className="text-xl font-bold text-secondary"
              >
                Fazer Parte da Equipe
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
