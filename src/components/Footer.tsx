import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <>
      {/* Faixa Slogan Final */}
      <div className="bg-primary-dark py-12 flex justify-center items-center overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white text-center tracking-tight px-4"
        >
          EU VOU ESCUTAR <span className="text-secondary inline-block hover:scale-105 transition-transform cursor-default">O POVO!</span>
        </motion.h2>
      </div>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8 mb-8">
            
            <div className="text-center md:text-left">
              <h3 className="font-heading font-bold text-2xl mb-1">Vereador Canela</h3>
              <p className="text-white/60 text-sm">Bom Jesus - Piauí</p>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-xs font-bold">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-xs font-bold">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-xs font-bold">
                YT
              </a>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 text-center md:text-left">
            <div>
              <p>Eleições 2026 - Deputado Estadual</p>
              <p className="mt-1">CNPJ: 00.000.000/0001-00 | Produzido por Equipe Canela</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
