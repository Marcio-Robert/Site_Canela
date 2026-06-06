import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Quote, X } from 'lucide-react';

export const Biography: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent background scrolling and handle Hardware Back Button
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      
      // Push state to intercept hardware back button
      window.history.pushState({ modal: 'biography' }, '');
      
      const handlePopState = (e: PopStateEvent) => {
        if (e.state?.modal === 'biography') return;
        setIsModalOpen(false);
      };
      
      window.addEventListener('popstate', handlePopState);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('popstate', handlePopState);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    window.history.back();
  };

  return (
    <section id="historia" className="py-10 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Minha Essência
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6" />
          
          <img 
            src="/media/capa_projetos.jpg" 
            alt="Vereador Canela com o povo" 
            className="w-full h-56 object-cover rounded-2xl shadow-lg mb-6"
          />

          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6">
            "Sempre fui um homem do interior, de mãos calejadas e coração aberto. Em 2024, Bom Jesus me deu a honra de ser seu representante, mas o meu trabalho de cuidar da nossa gente começou muito antes da política. Eu não fico em gabinete, meu lugar é na rua, porque o meu compromisso é um só: EU VOU ESCUTAR O POVO!"
          </p>

          <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto shadow-md"
          >
            Conhecer Minha História
          </Button>
        </div>

        {/* Full-Screen Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[100] bg-background overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-border px-4 py-4 flex items-center justify-between">
                <span className="font-heading font-bold text-lg text-primary-dark">Nossa História</span>
                <button 
                  onClick={closeModal}
                  className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <div className="container mx-auto px-4 py-8 max-w-2xl">
                
                <h3 className="text-2xl font-bold font-heading text-primary-dark mb-4">As Raízes</h3>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  Nascido e criado na região de Bom Jesus, conheço de perto a realidade do homem do campo e das famílias das periferias. Antes mesmo de pensar em ser vereador, minha porta sempre esteve aberta para quem precisava. A política não mudou quem eu sou, apenas me deu as ferramentas para ajudar ainda mais pessoas. Fui eleito em 2024 no meu primeiro mandato porque a população entendeu que precisava de alguém que sentisse as mesmas dores que eles.
                </p>

                <div className="relative p-6 sm:p-8 rounded-3xl bg-primary/5 border border-primary/10 mb-10">
                  <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/20" />
                  <blockquote className="relative z-10 text-lg sm:text-xl font-medium italic text-primary-dark ml-8 leading-relaxed">
                    "A vida me ensinou a ser forte da maneira mais dura. A perda precoce do meu filho foi a maior dor que um pai pode suportar. Mas foi ali, no momento de maior escuridão, que eu decidi que transformaria o meu luto em luta. Hoje, eu acordo todos os dias com uma missão: trabalhar para que nenhuma família da nossa região se sinta desamparada pelo poder público. O que faço hoje é por ele, e por todos os filhos e pais do nosso Piauí."
                  </blockquote>
                </div>

                <div className="text-center bg-surface p-8 rounded-3xl border border-border">
                  <h4 className="text-xl font-bold mb-4 text-foreground">
                    Você acredita em uma política feita com o coração e com trabalho duro?
                  </h4>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full sm:w-auto" 
                    onClick={() => {
                      closeModal();
                      setTimeout(() => document.getElementById('mobilize')?.scrollIntoView({ behavior: 'smooth' }), 300);
                    }}
                  >
                    Venha caminhar com a gente
                  </Button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
