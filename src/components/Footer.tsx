import React from 'react';
import { motion } from 'framer-motion';
import logoAgencia from '../assets/logo_agencia.png';

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
          PELO PIAUÍ, ESCUTANDO <span className="text-secondary inline-block hover:scale-105 transition-transform cursor-default">O POVO!</span>
        </motion.h2>
      </div>

      <footer className="bg-foreground text-white pt-12 pb-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center justify-center gap-6 border-b border-white/10 pb-8 mb-8 text-center">
            
            <div>
              <h3 className="font-heading font-black text-3xl mb-2 text-white">CANELA <span className="text-secondary">55888</span></h3>
              <p className="text-white/60 text-base">Candidato a Deputado Estadual pelo PSD - Piauí</p>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-white/40">
            <div className="text-center md:text-left">
              <p>Eleições 2026 - Deputado Estadual - Partido Social Democrático - PSD</p>
              <p className="mt-1">CNPJ: 68.312.695/0001-80</p>
            </div>
            
            {/* Agency Block */}
            <a 
              href="https://www.abase89.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group hover:text-white transition-colors"
            >
              <span className="uppercase tracking-widest text-[10px] text-white/50 group-hover:text-white/80 transition-colors">Desenvolvido por:</span>
              <motion.img 
                src={logoAgencia} 
                alt="A Base 89 Logo" 
                animate={{ 
                  filter: [
                    'drop-shadow(0px 0px 8px rgba(255,255,255,0.3))', 
                    'drop-shadow(0px 0px 20px rgba(255,255,255,0.9))', 
                    'drop-shadow(0px 0px 8px rgba(255,255,255,0.3))'
                  ] 
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                className="h-14 object-contain rounded-xl"
              />
              <span className="font-bold text-sm tracking-wide text-white/80 group-hover:text-white transition-colors">BASE 89</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
