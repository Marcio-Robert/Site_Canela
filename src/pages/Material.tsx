import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const materials = [
  {
    id: 1,
    title: 'Logo Oficial (Canela)',
    type: 'Logomarca',
    image: 'media/downloads/LOGO CANELA.png',
    file: 'media/downloads/LOGO CANELA.png',
  },
  {
    id: 2,
    title: 'Figurinha WhatsApp 02',
    type: 'Figurinha',
    image: 'media/downloads/FIGURINHA 02.png',
    file: 'media/downloads/FIGURINHA 02.png',
  },
  {
    id: 3,
    title: 'Arte Canela 2026',
    type: 'Arte para Redes',
    image: 'media/downloads/CANELA 2026.png',
    file: 'media/downloads/CANELA 2026.png',
  }
];

export const Material: React.FC = () => {
  return (
    <main className="min-h-screen bg-surface pt-24 pb-16">
      <div className="container mx-auto px-4">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-black text-primary-dark mb-4"
          >
            Material de Campanha
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/70"
          >
            Baixe nossas artes oficiais e figurinhas para compartilhar com seus amigos e grupos. 
            Juntos somos mais fortes!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {materials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-square bg-black/5 relative overflow-hidden flex items-center justify-center p-6">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                  {item.type}
                </span>
                <h3 className="text-xl font-heading font-bold text-primary-dark mb-6 flex-1">
                  {item.title}
                </h3>
                
                <a 
                  href={item.file} 
                  download 
                  className="block w-full"
                >
                  <Button className="w-full gap-2 text-base border-primary/20 hover:bg-primary/5 text-primary-dark" variant="outline">
                    <Download className="w-5 h-5" />
                    Baixar Arquivo
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
};
