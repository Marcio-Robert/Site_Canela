import React from 'react';
import { Button } from './ui/Button';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative flex flex-col pt-16 pb-12 overflow-hidden">
      
      {/* Imagem Principal (Sem cortes, sem gradientes) */}
      <div className="w-full flex justify-center relative z-0">
        <img 
          src={`${import.meta.env.BASE_URL}media/capa.png?v=2`} 
          alt="Candidato"
          className="w-full max-w-2xl object-cover object-bottom"
          style={{ aspectRatio: '3/4', maxHeight: '70vh' }}
        />
      </div>

      {/* Conteúdo de Texto */}
      <div className="container relative z-10 mx-auto px-4 -mt-8 sm:-mt-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center"
        >
          {/* Frase sobrepondo a imagem */}
          <div className="text-sm sm:text-base text-foreground font-black uppercase tracking-wider mb-2 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] bg-surface/70 backdrop-blur-md w-max mx-auto px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-400/20">
            O trabalho não para.
          </div>
          
          <div className="bg-surface/80 p-5 sm:p-8 rounded-2xl backdrop-blur-md mt-3 sm:mt-5 shadow-[0_0_25px_rgba(59,130,246,0.3)] border border-blue-500/30">
            {/* Animated and highly emphasized H1 */}
            <motion.h1 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-foreground mb-4 leading-tight drop-shadow-sm"
            >
              EU VOU ESCUTAR <span className="text-secondary inline-block relative after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-secondary/50 animate-pulse">O POVO!</span>
            </motion.h1>
            
            <h2 className="text-base sm:text-lg text-foreground/80 font-medium mb-8 leading-relaxed">
              De vereador atuante em Bom Jesus à força que o nosso Piauí precisa na Assembleia Legislativa.
            </h2>
            
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto text-lg group shadow-xl"
              onClick={() => document.getElementById('propostas')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conheça as Propostas
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
