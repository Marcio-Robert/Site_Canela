import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { ChevronDown, ChevronUp, Quote } from 'lucide-react';

export const Biography: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Minha Essência
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-8" />
          
          <img 
            src="https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Vereador Canela com o povo" 
            className="w-full h-64 object-cover rounded-2xl shadow-lg mb-8"
          />

          {/* Layer 1: Public */}
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            "Sempre fui um homem do interior, de mãos calejadas e coração aberto. Em 2024, Bom Jesus me deu a honra de ser seu representante, mas o meu trabalho de cuidar da nossa gente começou muito antes da política. Eu não fico em gabinete, meu lugar é na rua, porque o meu compromisso é um só: EU VOU ESCUTAR O POVO!"
          </p>

          {!isExpanded && (
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(true)}
              className="mt-4"
            >
              Conhecer Minha História
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>

        {/* Layer 2 & 3: Accordion (Progressive Disclosure) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="space-y-8 pt-4 pb-8 border-t border-border">
                
                {/* Layer 2: Roots */}
                <div className="prose prose-lg">
                  <h3 className="text-xl font-bold text-foreground mb-3">As Raízes</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Nascido e criado na região de Bom Jesus, conheço de perto a realidade do homem do campo e das famílias das periferias. Antes mesmo de pensar em ser vereador, minha porta sempre esteve aberta para quem precisava. A política não mudou quem eu sou, apenas me deu as ferramentas para ajudar ainda mais pessoas. Fui eleito em 2024 no meu primeiro mandato porque a população entendeu que precisava de alguém que sentisse as mesmas dores que eles.
                  </p>
                </div>

                {/* Layer 3: Intimate Motivations */}
                <div className="relative p-6 rounded-2xl bg-primary/5 border border-primary/10 mt-8">
                  <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                  <blockquote className="relative z-10 text-lg font-medium italic text-primary-dark ml-6">
                    "A vida me ensinou a ser forte da maneira mais dura. A perda precoce do meu filho foi a maior dor que um pai pode suportar. Mas foi ali, no momento de maior escuridão, que eu decidi que transformaria o meu luto em luta. Hoje, eu acordo todos os dias com uma missão: trabalhar para que nenhuma família da nossa região se sinta desamparada pelo poder público. O que faço hoje é por ele, e por todos os filhos e pais do nosso Piauí."
                  </blockquote>
                </div>

                <div className="text-center pt-8">
                  <h4 className="text-xl font-bold mb-6 text-foreground">
                    Você acredita em uma política feita com o coração e com trabalho duro?
                  </h4>
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Venha caminhar com a gente
                  </Button>
                </div>

                <div className="text-center mt-8">
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Recolher história
                    <ChevronUp className="w-4 h-4 ml-1" />
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
