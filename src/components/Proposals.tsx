import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to resolve media paths against Vite's BASE_URL
const getMediaUrl = (path: string | null) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

type Proposal = {
  id: number;
  tag: string;
  title: string;
  summary: string;
  image: string;
  details: string;
};

const proposals: Proposal[] = [
  {
    id: 1,
    tag: 'Saúde',
    title: 'Fortalecimento dos Hospitais',
    summary: 'Saúde de qualidade, perto das pessoas e em todas as regiões do Piauí.',
    image: 'media/hospital.png',
    details: 'CANELA VAI DEFENDER O FORTALECIMENTO DOS HOSPITAIS DO EXTREMO SUL E DOS HOSPITAIS REGIONAIS DO PIAUÍ, COM MAIS INVESTIMENTOS EM ESTRUTURA, EQUIPAMENTOS, MEDICAMENTOS E PROFISSIONAIS DE SAÚDE. NOSSO POVO NÃO PODE PRECISAR VIAJAR CENTENAS DE QUILÔMETROS PARA CONSEGUIR ATENDIMENTO ESPECIALIZADO. VAMOS TRABALHAR PELA AMPLIAÇÃO DOS SERVIÇOS DE MÉDIA E ALTA COMPLEXIDADE, FORTALECIMENTO DAS CIRURGIAS ELETIVAS, EXAMES E ATENDIMENTO ESPECIALIZADO, GARANTINDO MAIS DIGNIDADE E RESOLUTIVIDADE PARA QUEM PRECISA DO SUS. SAÚDE DE QUALIDADE, PERTO DAS PESSOAS E EM TODAS AS REGIÕES DO PIAUÍ.'
  },
  {
    id: 2,
    tag: 'Educação',
    title: 'Qualificação para os Jovens',
    summary: 'Educação que prepara para o futuro e gera oportunidades locais.',
    image: 'media/jovens.png',
    details: 'CANELA VAI DEFENDER MAIS INVESTIMENTOS NA EDUCAÇÃO PÚBLICA, ESPECIALMENTE NOS MUNICÍPIOS DO INTERIOR, FORTALECENDO ESCOLAS, FORMAÇÃO PROFISSIONAL E OPORTUNIDADES PARA OS NOSSOS JOVENS. VAMOS LUTAR PELA AMPLIAÇÃO DE CURSOS TÉCNICOS E PROFISSIONALIZANTES, PELA MELHORIA DA ESTRUTURA DAS ESCOLAS E POR MAIS OPORTUNIDADES DE ACESSO AO ENSINO SUPERIOR. O JOVEM DO INTERIOR PRECISA TER OPORTUNIDADE DE ESTUDAR, SE QUALIFICAR E CONSTRUIR SEU FUTURO SEM PRECISAR ABANDONAR SUA CIDADE.'
  },
  {
    id: 3,
    tag: 'Infraestrutura',
    title: 'Saneamento e Desenvolvimento',
    summary: 'Cidades limpas, infraestrutura urbana e qualidade de vida para a população.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    details: 'COMO VEREADOR, CANELA TEM ACOMPANHADO DE PERTO PROBLEMAS QUE AFETAM DIRETAMENTE A VIDA DA POPULAÇÃO, COMO A FALTA DE ESTRUTURA ADEQUADA PARA O ABATE DE ANIMAIS EM BOM JESUS E A DESTINAÇÃO CORRETA DO LIXO. COMO DEPUTADO ESTADUAL, VAI AMPLIAR ESSA LUTA, DEFENDENDO INVESTIMENTOS E POLÍTICAS PÚBLICAS PARA A IMPLANTAÇÃO, RECUPERAÇÃO E MODERNIZAÇÃO DE MATADOUROS PÚBLICOS, GARANTINDO CONDIÇÕES ADEQUADAS DE HIGIENE, SEGURANÇA SANITÁRIA. TAMBÉM VAI ATUAR PELO FORTALECIMENTO DAS POLÍTICAS DE GESTÃO DE RESÍDUOS SÓLIDOS, BUSCANDO SOLUÇÕES PARA O FIM DOS LIXÕES, IMPLANTAÇÃO E ESTRUTURAÇÃO DE ATERROS SANITÁRIOS, COLETA SELETIVA E RECICLAGEM. ALÉM DISSO, DEFENDERÁ INVESTIMENTOS EM ESTRADAS, ABASTECIMENTO DE ÁGUA, SANEAMENTO BÁSICO E INFRAESTRUTURA URBANA, ESPECIALMENTE NOS MUNICÍPIOS DO INTERIOR E DO EXTREMO SUL DO PIAUÍ. PORQUE DESENVOLVIMENTO NÃO É APENAS CONSTRUIR. É GARANTIR CIDADES MAIS LIMPAS, SAUDÁVEIS, ESTRUTURADAS E PREPARADAS PARA O FUTURO.'
  }
];

export const Proposals: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== null) {
      window.history.pushState({ modal: 'singleProposal' }, '');
      const handlePopState = (e: PopStateEvent) => {
        if (e.state?.modal === 'singleProposal') return;
        setSelectedIndex(null);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [selectedIndex]);

  const closeSingleProposal = () => {
    setSelectedIndex(null);
    window.history.back();
  };

  const selectedProposal = selectedIndex !== null ? proposals[selectedIndex] : null;

  const goNext = () => {
    if (selectedIndex !== null && selectedIndex < proposals.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <section id="propostas" className="py-10 bg-surface overflow-hidden border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2 text-center">
            Nossas Propostas
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
            {proposals.map((proposal, index) => (
              <SwiperSlide key={proposal.id} className="h-auto">
                <div className="flex flex-col h-full bg-background rounded-3xl overflow-hidden shadow-lg border border-border/50 transition-shadow">
                  <div className="relative h-56 w-full shrink-0 bg-black/5">
                    <img src={getMediaUrl(proposal.image)} alt={proposal.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                      {proposal.tag}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold font-heading mb-2 text-foreground leading-tight">{proposal.title}</h3>
                    <p className="text-sm text-foreground/70 mb-4 flex-grow">{proposal.summary}</p>
                  </div>

                  <button 
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-sm py-4 transition-colors"
                    onClick={() => setSelectedIndex(index)}
                  >
                    VER DETALHES
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProposal && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background overflow-y-auto"
          >
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
              <span className="font-heading font-bold text-lg text-primary-dark truncate pr-4">
                {selectedProposal.tag}
              </span>
              <button 
                onClick={closeSingleProposal}
                className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors shrink-0 flex items-center gap-2 pr-4"
              >
                <X className="w-5 h-5 text-foreground" />
                <span className="text-sm font-semibold text-foreground hidden sm:block">Voltar</span>
              </button>
            </div>

            <div className="relative w-full h-72 sm:h-96">
              <img src={getMediaUrl(selectedProposal.image)} alt={selectedProposal.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-4 right-4 max-w-3xl mx-auto">
                <div className="bg-secondary inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
                  {selectedProposal.tag}
                </div>
                <h1 className="text-3xl sm:text-4xl font-heading font-black text-white leading-tight drop-shadow-md">
                  {selectedProposal.title}
                </h1>
              </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-3xl">
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  Nossa Proposta
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed uppercase">
                  {selectedProposal.details}
                </p>
              </div>

              <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
                <button
                  onClick={goPrev}
                  disabled={selectedIndex === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                    selectedIndex === 0 ? 'opacity-50 cursor-not-allowed text-foreground/50 bg-surface' : 'text-primary hover:bg-primary/10'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-bold hidden sm:inline">Anterior</span>
                </button>

                <div className="text-sm text-foreground/50 font-bold">
                  {selectedIndex + 1} / {proposals.length}
                </div>

                <button
                  onClick={goNext}
                  disabled={selectedIndex === proposals.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                    selectedIndex === proposals.length - 1 ? 'opacity-50 cursor-not-allowed text-foreground/50 bg-surface' : 'text-primary hover:bg-primary/10'
                  }`}
                >
                  <span className="font-bold hidden sm:inline">Próxima</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
