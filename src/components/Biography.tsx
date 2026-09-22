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
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Minha Essência
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6" />
          
          <img 
            src={`${import.meta.env.BASE_URL}media/capa_essencia.png?v=1`} 
            alt="Vereador Canela com o povo" 
            className="w-full h-56 sm:h-auto sm:max-h-[450px] object-cover rounded-2xl shadow-lg mb-6"
          />

          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6">
            "Sou pai, avô e um homem que aprendeu, desde cedo, o valor do trabalho. Escolhi Bom Jesus para viver e construí uma relação de respeito e amizade com a nossa gente. Foi ouvindo as pessoas e conhecendo as dificuldades do nosso povo que entrei para a vida pública. Política, para mim, não é distância. É presença, respeito e compromisso com as pessoas."
          </p>

          <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto shadow-md"
          >
            Conhecer Minha Trajetória
          </Button>
        </motion.div>

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
                <span className="font-heading font-bold text-lg text-primary-dark">Minha História</span>
                <button 
                  onClick={closeModal}
                  className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <div className="container mx-auto px-4 py-8 max-w-2xl">
                
                <h3 className="text-2xl font-bold font-heading text-primary-dark mb-4">Origem e Trabalho</h3>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  Nascido em São Félix de Balsas, no Maranhão, iniciei meus estudos lá. No final da adolescência, mudei-me para Baixa Grande do Ribeiro (PI), a convite do ex-prefeito José Martins Silva. Foi lá que trabalhei duro como agricultor e motorista, e onde tive minhas primeiras experiências no meio político.
                </p>

                <h3 className="text-2xl font-bold font-heading text-primary-dark mb-4">A Chegada a Bom Jesus</h3>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  Em 2005, escolhi Bom Jesus para viver. Comecei como autônomo, vendendo frutas e fazendo fretes. Com muita luta e suor, em 2010 consegui espaço como pequeno empresário, primeiro no transporte e depois na construção civil. Foi aqui que construí minha vida e minha verdadeira relação de amizade com a nossa gente.
                </p>

                <h3 className="text-2xl font-bold font-heading text-primary-dark mb-4">Família</h3>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  Sou orgulhoso pai de Wellington, Werveson, Wilian (in memoriam) e Saulo, e avô amoroso de Maria Helena e Lorena Maria. A família é a base de tudo que faço e o que me motiva a lutar todos os dias por um futuro mais digno para todas as famílias piauienses.
                </p>

                <h3 className="text-2xl font-bold font-heading text-primary-dark mb-4">A Vida Pública</h3>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  Incentivado por amigos e pela população que acompanhava minha dedicação, decidi entrar para a vida pública. Em 2023, me filiei ao partido União Brasil e em 2024 tive a honra de ser eleito vereador com 579 votos de confiança. Em 2025, minha atuação estadual foi ampliada quando fui eleito Diretor-Tesoureiro da AVEP. Hoje, a convite do deputado Georgiano Neto, me filiei ao PSD e coloco meu nome e meu histórico de muito trabalho como candidato a Deputado Estadual pelo Piauí.
                </p>

                <div className="relative p-6 sm:p-8 rounded-3xl bg-primary/5 border border-primary/10 mb-10">
                  <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/20" />
                  <blockquote className="relative z-10 text-lg sm:text-xl font-medium italic text-primary-dark ml-8 leading-relaxed">
                    "Quero levar para todo o Piauí a experiência de quem conhece a realidade de perto, de quem sabe ouvir e, principalmente, de quem faz questão de responder e estar presente. Por isso, coloco minha vida e meu trabalho a serviço da nossa gente!"
                  </blockquote>
                </div>

                <div className="text-center bg-surface p-8 rounded-3xl border border-border">
                  <h4 className="text-xl font-bold mb-4 text-foreground">
                    O trabalho não para. Venha conhecer nossas propostas!
                  </h4>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full sm:w-auto" 
                    onClick={() => {
                      closeModal();
                      setTimeout(() => document.getElementById('propostas')?.scrollIntoView({ behavior: 'smooth' }), 300);
                    }}
                  >
                    Ver Propostas
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
