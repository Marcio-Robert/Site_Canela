import React from 'react';
import { Menu, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-xl text-primary-dark">
            Vereador Canela
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" className="hidden sm:flex rounded-full px-4">
            <MessageCircle className="w-4 h-4 mr-2" />
            Fale com a Equipe
          </Button>
          <Button variant="primary" size="sm" className="sm:hidden w-10 h-10 p-0 rounded-full">
            <MessageCircle className="w-5 h-5" />
          </Button>
          
          <button className="p-2 text-foreground/80 hover:bg-black/5 rounded-full transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
