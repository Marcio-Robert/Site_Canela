import React from 'react';
import { Button } from './ui/Button';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90svh] flex items-end pb-12 pt-24">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")', // Placeholder de multidão/comício
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary-dark text-sm font-semibold border border-primary/20">
            Pré-candidato a Deputado Estadual
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
            O trabalho não para. <br />
            <span className="text-primary">EU VOU ESCUTAR O POVO!</span>
          </h1>
          <h2 className="text-lg sm:text-xl text-foreground/80 font-medium mb-8">
            De vereador atuante em Bom Jesus à força que o nosso Piauí precisa na Assembleia Legislativa.
          </h2>
          
          <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg group">
            Conheça as Propostas
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
