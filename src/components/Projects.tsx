import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Button } from './ui/Button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    tag: 'Saúde e Cuidado',
    title: 'Rota da Saúde no Interior',
    summary: 'Apoio logístico e garantia de transporte seguro para pacientes da zona rural e dos interiores de Bom Jesus realizarem seus tratamentos.',
    image: 'https://images.unsplash.com/photo-1538108149393-cebb47acddb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    details: 'Muitas famílias perdem consultas e tratamentos por falta de transporte. Nosso mandato atuou firmemente para garantir veículos adequados e rotas constantes para os moradores mais distantes do centro urbano.'
  },
  {
    id: 2,
    tag: 'Infraestrutura Rural',
    title: 'Água para Quem Tem Sede',
    summary: 'Indicações e cobranças ativas que resultaram na perfuração de poços e manutenção de estradas vicinais, tirando comunidades do isolamento.',
    image: 'https://images.unsplash.com/photo-1505963776269-8f0a006ee2de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    details: 'A falta de água e de estradas dignas é um desrespeito. Cobramos a prefeitura e os órgãos estaduais até que as máquinas chegassem às comunidades que estavam esquecidas há anos.'
  },
  {
    id: 3,
    tag: 'Ação Social',
    title: 'Gabinete nas Ruas',
    summary: 'O projeto que deu origem à marca "Eu Vou Escutar o Povo". Despachos e atendimentos feitos diretamente nas praças e bairros, sem burocracia.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    details: 'A política de verdade não acontece com o vereador trancado no ar-condicionado. Montamos nossa estrutura em praças e bairros para despachar, ouvir reclamações e encaminhar soluções na hora.'
  }
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section className="py-16 bg-surface overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 text-center">
          Projetos e Ações
        </h2>
        <p className="text-center text-foreground/70 mb-10">Deslize para conhecer nosso trabalho</p>

        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1.1}
          centeredSlides={true}
          breakpoints={{
            640: { slidesPerView: 1.5, centeredSlides: false },
            768: { slidesPerView: 2.2, centeredSlides: false },
            1024: { slidesPerView: 3, centeredSlides: false },
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="pb-14"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="h-auto">
              <div className="flex flex-col h-full bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {project.tag}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-heading mb-2 text-foreground">{project.title}</h3>
                  <p className="text-sm text-foreground/80 mb-6 flex-grow">{project.summary}</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedProject(project)}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-surface rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90svh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative h-64 shrink-0">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="bg-secondary inline-block text-white text-xs font-bold px-2 py-1 rounded mb-2">
                    {selectedProject.tag}
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="p-6 overflow-y-auto">
                <h4 className="font-bold text-lg mb-2 text-foreground">Sobre a Ação</h4>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {selectedProject.details}
                </p>
                <Button variant="primary" className="w-full" onClick={() => setSelectedProject(null)}>
                  Apoiar esta causa
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
