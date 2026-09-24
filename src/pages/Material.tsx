import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const materials = [
  { id: 1, title: 'Logo Oficial', type: 'Logomarca', image: 'media/downloads/LOGO CANELA.png' },
  { id: 2, title: 'Arte 2026', type: 'Arte para Redes', image: 'media/downloads/CANELA 2026.png' },
  { id: 3, title: 'Cartaz 01', type: 'Arte para Redes', image: 'media/downloads/01.png' },
  { id: 4, title: 'Figurinha 01', type: 'Figurinha', image: 'media/downloads/FIGURINHA 01.png' },
  { id: 5, title: 'Figurinha 02', type: 'Figurinha', image: 'media/downloads/FIGURINHA 02.png' },
  { id: 6, title: 'Figurinha 03', type: 'Figurinha', image: 'media/downloads/FIGURINHA 03.png' },
  { id: 7, title: 'Sticker 1', type: 'Figurinha', image: 'media/downloads/Sticker Canela (1).png' },
  { id: 8, title: 'Sticker 2', type: 'Figurinha', image: 'media/downloads/Sticker Canela (2).png' },
  { id: 9, title: 'Sticker 3', type: 'Figurinha', image: 'media/downloads/Sticker Canela (3).png' },
  { id: 10, title: 'Sticker 4', type: 'Figurinha', image: 'media/downloads/Sticker Canela (4).png' },
  { id: 11, title: 'Sticker 5', type: 'Figurinha', image: 'media/downloads/Sticker Canela (5).png' },
  { id: 12, title: 'Sticker 6', type: 'Figurinha', image: 'media/downloads/Sticker Canela (6).png' },
  { id: 13, title: 'Sticker 7', type: 'Figurinha', image: 'media/downloads/Sticker Canela (7).png' },
  { id: 14, title: 'Sticker 8', type: 'Figurinha', image: 'media/downloads/Sticker Canela (8).png' },
];

export const Material: React.FC = () => {
  return (
    <main className="min-h-screen bg-surface pt-24 pb-16">
      <div className="container mx-auto px-4">
        
        <div className="max-w-3xl mx-auto text-center mb-10">
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
            className="text-base sm:text-lg text-foreground/70 px-4"
          >
            Baixe nossas artes oficiais e figurinhas para compartilhar. 
            Juntos somos mais fortes!
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 max-w-7xl mx-auto">
          {materials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index % 10) * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md hover:border-primary/30 transition-all flex flex-col relative"
            >
              <div className="aspect-square bg-black/5 relative overflow-hidden flex items-center justify-center p-2 sm:p-4">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                />
                
                {/* Download Overlay (Hover on Desktop) */}
                <a 
                  href={item.image} 
                  download 
                  className="absolute inset-0 bg-primary/80 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10"
                >
                  <div className="flex flex-col items-center text-white">
                    <Download className="w-8 h-8 mb-2" />
                    <span className="font-bold tracking-wide">BAIXAR</span>
                  </div>
                </a>
              </div>
              
              <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white z-20">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-wider mb-1 block truncate">
                    {item.type}
                  </span>
                  <h3 className="text-sm sm:text-base font-heading font-bold text-primary-dark truncate">
                    {item.title}
                  </h3>
                </div>
                
                {/* Mobile Download Button (Always visible on mobile) */}
                <a 
                  href={item.image} 
                  download 
                  className="mt-3 w-full sm:hidden flex items-center justify-center gap-2 bg-primary/10 text-primary-dark py-2 rounded-lg text-xs font-bold active:bg-primary/20"
                >
                  <Download className="w-4 h-4" />
                  Baixar
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
};
