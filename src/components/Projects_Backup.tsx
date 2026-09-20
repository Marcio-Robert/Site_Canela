import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { X, Image as ImageIcon, Video, ArrowRight, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

// Helper function to resolve media paths against Vite's BASE_URL
const getMediaUrl = (path: string | null) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

type ProjectDetails = {
  feito: string;
  acao: string;
  resultado: string;
};

type Project = {
  id: number;
  tag: string;
  title: string;
  summary: string;
  image: string;
  gallery: string[];
  video: string | null;
  details: ProjectDetails | string;
};

const projects: Project[] = [
  {
    id: 1,
    tag: 'Infraestrutura',
    title: 'Poço Artesiano em Tamboril',
    summary: 'Inauguração e entrega de um novo poço artesiano na comunidade Corrente dos Matões.',
    image: 'media/tamboril-1.jpg',
    gallery: ['media/tamboril-1.jpg', 'media/tamboril-2.jpg'],
    video: 'media/tamboril.mp4',
    details: {
      feito: 'Inauguração e entrega de um novo poço artesiano na comunidade Corrente dos Matões, na localidade de Tamboril.',
      acao: 'Cumprindo o compromisso de ouvir a população nas suas visitas às comunidades, o vereador Canela articulou a perfuração do poço em parceria com o deputado Georgiano e o Dr. Lucas.',
      resultado: 'O novo poço garantiu o acesso a água de qualidade para 15 famílias da região. A iniciativa levou saúde, dignidade e mais qualidade de vida para a comunidade local, que agora pode usufruir deste direito básico até mesmo para as suas pequenas plantações.'
    }
  },
  {
    id: 2,
    tag: 'Segurança Viária',
    title: 'Melhorias na BR-135',
    summary: 'Manutenção e melhoria na segurança da rodovia BR-135, em trechos críticos.',
    image: 'media/br-1.jpg',
    gallery: ['media/br-1.jpg', 'media/br-2.jpg'],
    video: 'media/br.mp4',
    details: {
      feito: 'Manutenção e melhoria na segurança da rodovia BR-135, focando em trechos críticos que registravam alto índice de acidentes por desnível na pista (como a "Curva do Belinho" e a "Curva das Melancias", entre Bom Jesus e Cristino Castro).',
      acao: 'O vereador Canela esteve no local dos acidentes, fez cobranças ativas e apresentou requerimentos diretamente em Teresina junto ao superintendente do DNIT (Departamento Nacional de Infraestrutura de Transportes).',
      resultado: 'O DNIT atendeu à demanda rapidamente, enviando uma equipe para realizar os reparos necessários, solucionando o problema do desnível e garantindo mais segurança para quem trafega pelo Sul do Piauí e ajudando a salvar vidas.'
    }
  },
  {
    id: 3,
    tag: 'Recursos Hídricos',
    title: 'Poço Artesiano em Tapuitama',
    summary: 'Inauguração e entrega de poço artesiano para atender a comunidade de Tapuitama.',
    image: 'media/tapuitama-1.jpg',
    gallery: ['media/tapuitama-1.jpg', 'media/tapuitama-2.jpg'],
    video: 'media/tapuitama.mp4',
    details: {
      feito: 'Inauguração e entrega de mais um poço artesiano, desta vez focado em atender a comunidade de Tapuitama.',
      acao: 'Cumprindo a sua promessa de ouvir as necessidades da população de perto, o vereador Canela acolheu o pedido dos moradores locais (como o Sr. Dorim e a Dona Irene) e articulou a execução do projeto junto a parceiros políticos, como o deputado Georgiano Neto.',
      resultado: 'Transformação completa na qualidade de vida das famílias, que enfrentaram quase dois anos dependendo do transporte de água em galões de 20 litros por carrinhos de mão. A chegada da água garantiu saúde, dignidade e segurança alimentar, permitindo que a comunidade agora cultive o próprio alimento, mantendo plantações de milho, feijão, banana e abóbora.'
    }
  },
  {
    id: 4,
    tag: 'Esporte e Juventude',
    title: 'Esporte Resgata',
    summary: 'Incentivo ao esporte amador e revitalização de quadras.',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541872526131-ab19f71c4ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ],
    video: null,
    details: 'Acreditamos que o esporte é a principal ferramenta para afastar nossos jovens das drogas. Destinamos recursos para campeonatos amadores locais e cobramos a reforma de três quadras poliesportivas que estavam abandonadas, devolvendo o lazer para as comunidades.'
  },
  {
    id: 5,
    tag: 'Empreendedorismo',
    title: 'Empreende Mulher',
    summary: 'Capacitação e fomento para mulheres chefes de família.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573164136489-28c701460398?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    video: null,
    details: 'Criamos um programa de apoio focando em mulheres que sustentam sozinhas seus lares. Em parceria com instituições técnicas, oferecemos cursos profissionalizantes e orientamos sobre o acesso a microcrédito. Hoje, dezenas de mulheres já abriram seus próprios negócios.'
  }
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedProject || isAllProjectsOpen || lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject, isAllProjectsOpen, lightboxIndex]);

  // Handle Hardware Back Button for "All Projects" Modal
  useEffect(() => {
    if (isAllProjectsOpen) {
      window.history.pushState({ modal: 'allProjects' }, '');
      const handlePopState = (e: PopStateEvent) => {
        if (e.state?.modal === 'allProjects') return;
        setIsAllProjectsOpen(false);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [isAllProjectsOpen]);

  const closeAllProjects = () => {
    setIsAllProjectsOpen(false);
    window.history.back();
  };

  // Handle Hardware Back Button for "Single Project" Modal
  useEffect(() => {
    if (selectedProject) {
      window.history.pushState({ modal: 'singleProject' }, '');
      const handlePopState = (e: PopStateEvent) => {
        if (e.state?.modal === 'singleProject') return;
        setSelectedProject(null);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [selectedProject]);

  const closeSingleProject = () => {
    setSelectedProject(null);
    window.history.back();
  };

  // Handle Hardware Back Button for Lightbox
  useEffect(() => {
    if (lightboxIndex !== null) {
      window.history.pushState({ modal: 'lightbox' }, '');
      const handlePopState = (e: PopStateEvent) => {
        if (e.state?.modal === 'lightbox') return;
        setLightboxIndex(null);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [lightboxIndex]);

  const closeLightbox = () => {
    setLightboxIndex(null);
    window.history.back();
  };

  const handleMobilize = () => {
    setSelectedProject(null);
    window.history.back();
    if (isAllProjectsOpen) {
      setIsAllProjectsOpen(false);
      setTimeout(() => window.history.back(), 10);
    }
    setTimeout(() => document.getElementById('mobilize')?.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projetos" className="py-10 bg-surface overflow-hidden border-t border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2 text-center">
          Projetos e Ações
        </h2>
        
        <div className="flex items-center justify-center gap-2 text-foreground/60 mb-6 font-medium text-sm">
          <span>Arraste para o lado para ver mais</span>
          <motion.div 
            animate={{ x: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4 text-primary" />
          </motion.div>
        </div>

        <Swiper
          modules={[]}
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-6"
        >
          {featuredProjects.map((project) => (
            <SwiperSlide key={project.id} className="h-auto">
              <div className="flex flex-col h-full bg-background rounded-3xl overflow-hidden shadow-lg border border-border/50 transition-shadow">
                <div className="relative h-56 w-full shrink-0 bg-black/5">
                  <img src={getMediaUrl(project.image)} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                    {project.tag}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-heading mb-2 text-foreground leading-tight">{project.title}</h3>
                  <p className="text-sm text-foreground/70 mb-4 flex-grow">{project.summary}</p>
                </div>

                <button 
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-sm py-4 transition-colors"
                  onClick={() => setSelectedProject(project)}
                >
                  VER DETALHES
                </button>
              </div>
            </SwiperSlide>
          ))}

          <SwiperSlide className="h-auto">
            <div 
              onClick={() => setIsAllProjectsOpen(true)}
              className="flex flex-col items-center justify-center h-full min-h-[350px] bg-primary/5 hover:bg-primary/10 rounded-3xl border-2 border-dashed border-primary/30 cursor-pointer transition-colors group px-6 text-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <PlusCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading text-primary-dark mb-2">Ver Todos os Projetos</h3>
              <p className="text-sm text-foreground/70">Conheça todas as nossas {projects.length} ações e bandeiras.</p>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto border-primary/20 text-primary-dark hover:bg-primary/5"
            onClick={() => setIsAllProjectsOpen(true)}
          >
            Visualizar Todas as Ações
          </Button>
        </div>
      </div>

      {/* Modal: All Projects List */}
      <AnimatePresence>
        {isAllProjectsOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-surface overflow-y-auto"
          >
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border px-4 py-4 flex items-center justify-between shadow-sm">
              <span className="font-heading font-black text-xl text-primary-dark">
                Todas as Ações
              </span>
              <button 
                onClick={closeAllProjects}
                className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors shrink-0 flex items-center gap-2"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-background rounded-3xl overflow-hidden shadow-md border border-border/50 flex flex-col sm:flex-row h-full">
                    <div className="relative h-48 sm:h-full sm:w-2/5 shrink-0">
                      <img src={getMediaUrl(project.image)} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 sm:hidden bg-secondary text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-md z-10">
                        {project.tag}
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="hidden sm:inline-block bg-secondary/10 text-secondary-dark text-xs font-bold px-2 py-1 rounded w-max mb-2">
                        {project.tag}
                      </div>
                      <h3 className="text-xl font-bold font-heading mb-2 text-foreground leading-tight">{project.title}</h3>
                      <p className="text-sm text-foreground/70 mb-4 flex-grow">{project.summary}</p>
                      
                      <button 
                        className="w-full bg-primary/10 hover:bg-primary/20 text-primary-dark font-bold text-sm py-3 rounded-xl transition-colors mt-auto"
                        onClick={() => setSelectedProject(project)}
                      >
                        Ler Completo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Single Project Detail View */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background overflow-y-auto"
          >
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
              <span className="font-heading font-bold text-lg text-primary-dark truncate pr-4">
                {selectedProject.tag}
              </span>
              <button 
                onClick={closeSingleProject}
                className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors shrink-0 flex items-center gap-2 pr-4"
              >
                <X className="w-5 h-5 text-foreground" />
                <span className="text-sm font-semibold text-foreground hidden sm:block">Voltar</span>
              </button>
            </div>

            <div className="relative w-full h-72 sm:h-96">
              <img src={getMediaUrl(selectedProject.image)} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-4 right-4 max-w-3xl mx-auto">
                <div className="bg-secondary inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
                  {selectedProject.tag}
                </div>
                <h1 className="text-3xl sm:text-4xl font-heading font-black text-white leading-tight drop-shadow-md">
                  {selectedProject.title}
                </h1>
              </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-3xl">
              
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  Visão Geral
                </h2>
                
                {typeof selectedProject.details === 'string' ? (
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    {selectedProject.details}
                  </p>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <strong className="text-primary-dark text-lg mb-1 block">O que foi feito:</strong>
                      <p className="text-base text-foreground/80 leading-relaxed">{selectedProject.details.feito}</p>
                    </div>
                    <div>
                      <strong className="text-primary-dark text-lg mb-1 block">Ação do Vereador:</strong>
                      <p className="text-base text-foreground/80 leading-relaxed">{selectedProject.details.acao}</p>
                    </div>
                    <div>
                      <strong className="text-primary-dark text-lg mb-1 block">Resultado:</strong>
                      <p className="text-base text-foreground/80 leading-relaxed">{selectedProject.details.resultado}</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Galeria de Ações
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.gallery.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setLightboxIndex(idx)}
                        className="aspect-square bg-surface rounded-2xl overflow-hidden border border-border relative cursor-pointer group shadow-sm hover:shadow-md transition-all"
                      >
                        <img 
                          src={getMediaUrl(img)} 
                          alt={`Miniatura Galeria ${idx+1}`} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-300" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-colors">
                          <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 drop-shadow-md transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.video && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    Registro Audiovisual
                  </h3>
                  
                  {/* Changed to natural height layout */}
                  <div className="w-full bg-black rounded-2xl overflow-hidden shadow-md border border-border flex items-center justify-center">
                    <video 
                      src={getMediaUrl(selectedProject.video)} 
                      controls 
                      className="w-full h-auto max-h-[80vh] cursor-pointer" 
                      controlsList="nodownload"
                      playsInline
                      preload="metadata"
                      onClick={(e) => {
                        const video = e.currentTarget;
                        const rect = video.getBoundingClientRect();
                        const clickY = e.clientY - rect.top;
                        
                        // Ignorar o clique se for na área inferior (15% da base), onde ficam os controles nativos
                        if (clickY > rect.height * 0.85) return;

                        if (video.paused) {
                          video.play();
                        } else {
                          video.pause();
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="bg-surface border border-border p-6 rounded-3xl text-center mb-8">
                <h4 className="font-bold text-lg mb-4 text-foreground">Quer levar essa ação para seu bairro?</h4>
                <button 
                  className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl py-4 transition-colors"
                  onClick={handleMobilize}
                >
                  Mobilizar minha comunidade
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Image Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] bg-black/95 flex flex-col"
          >
            <div className="absolute top-0 right-0 z-50 p-4">
              <button 
                onClick={closeLightbox}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 w-full h-full flex items-center justify-center pb-8">
              <Swiper
                initialSlide={lightboxIndex}
                spaceBetween={20}
                slidesPerView={1}
                modules={[Navigation]}
                navigation={true}
                className="w-full h-full"
                style={{
                  '--swiper-navigation-color': '#ffffff',
                  '--swiper-navigation-size': '32px',
                } as React.CSSProperties}
                onSlideChange={(swiper) => setLightboxIndex(swiper.activeIndex)}
              >
                {selectedProject.gallery.map((img, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center w-full h-full">
                    <div className="w-full h-full p-4 flex items-center justify-center">
                      <img 
                        src={getMediaUrl(img)} 
                        alt={`Visualização ${idx+1}`} 
                        className="max-w-full max-h-screen object-contain drop-shadow-2xl" 
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            <div className="absolute bottom-8 left-0 right-0 z-50 text-center">
              <span className="bg-black/50 text-white/90 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-md">
                {lightboxIndex + 1} / {selectedProject.gallery.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
