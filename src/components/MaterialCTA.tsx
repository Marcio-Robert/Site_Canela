import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

export const MaterialCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-primary text-white overflow-hidden relative border-t-4 border-secondary">
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight drop-shadow-sm">
              Leve a Nossa Campanha<br/>Para o Seu Celular!
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
              Preparamos adesivos, artes para redes sociais e figurinhas do WhatsApp exclusivas. Baixe agora e ajude a espalhar nossa mensagem!
            </p>
            
            <div className="pt-8">
              <Button 
                size="lg" 
                className="gap-2 text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform shadow-xl bg-secondary text-white hover:bg-secondary/90 border-none"
                onClick={() => {
                  navigate('/material');
                  window.scrollTo(0, 0);
                }}
              >
                <Download className="w-6 h-6" />
                Acessar Portal de Materiais
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
