import React from 'react';
import { Button } from './ui/Button';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-[85svh] flex items-end pb-12 pt-20">
      {/* Background Photo */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[center_top]"
        style={{ 
          backgroundImage: 'url("/media/capa.jpg")',
        }}
      >
        {/* Dark linear gradient overlay pushed only to the bottom half so the face is clearly visible */}
        <div className="absolute bottom-0 w-full h-[65%] bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/30 backdrop-blur-sm">
            Pré-candidato a Deputado Estadual
          </div>
          
          <div className="text-sm sm:text-base text-white/80 font-semibold uppercase tracking-wider mb-2 drop-shadow-md">
            O trabalho não para.
          </div>
          
          {/* Animated and highly emphasized H1 */}
          <motion.h1 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white mb-4 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          >
            EU VOU ESCUTAR <span className="text-secondary inline-block relative after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-secondary/50 animate-pulse">O POVO!</span>
          </motion.h1>
          
          <h2 className="text-base sm:text-lg text-white/90 font-medium mb-8 leading-relaxed drop-shadow-md">
            De vereador atuante em Bom Jesus à força que o nosso Piauí precisa na Assembleia Legislativa.
          </h2>
          
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full sm:w-auto text-lg group shadow-xl"
            onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Conheça as Propostas
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
