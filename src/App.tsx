import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { Transparency } from './components/Transparency';
import { Biography } from './components/Biography';
import { Projects } from './components/Projects';
import { Agenda } from './components/Agenda';
import { Contact } from './components/Contact';
import { Mobilize } from './components/Mobilize';
import { Footer } from './components/Footer';

// ESTA ESTRUTURA FOI DESENHADA PARA FACILITAR A FUTURA SUBSTITUIÇÃO 
// POR UMA REQUISIÇÃO DE API INTEGRADA AO GOOGLE SHEETS VIA N8N.
export const MOCK_PLANILHA_DATA = {
  metrics: [
    { iconName: 'Calendar', value: '2+', label: 'Anos de Mandato' },
    { iconName: 'FileText', value: '25+', label: 'Projetos e Indicações' },
    { iconName: 'MapPin', value: '18+', label: 'Comunidades Atendidas' },
    { iconName: 'Heart', value: '100%', label: 'Dedicação' },
  ],
  transparency: {
    chartData: [
      { id: 'saude', label: 'Saúde', percentage: 45, color: '#3b82f6' }, // blue-500
      { id: 'infra', label: 'Infraestrutura Rural', percentage: 30, color: '#10b981' }, // green-500
      { id: 'social', label: 'Ação Social', percentage: 25, color: '#f59e0b' }, // amber-500
    ]
  },
  agenda: [
    { id: 1, date: '10/11', time: '09:00', title: 'Visita técnica ao Povoado Varginha', location: 'Bom Jesus - PI', status: 'Confirmado' },
    { id: 2, date: '12/11', time: '14:30', title: 'Reunião com lideranças no bairro Centro', location: 'Bom Jesus - PI', status: 'Em andamento' },
    { id: 3, date: '15/11', time: '19:00', title: 'Sessão Plenária na Câmara', location: 'Câmara Municipal', status: 'Confirmado' },
  ]
};

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      
      <main>
        <Hero />
        <Metrics data={MOCK_PLANILHA_DATA.metrics} />
        <Transparency data={MOCK_PLANILHA_DATA.transparency} />
        <Biography />
        <Projects />
        <Agenda data={MOCK_PLANILHA_DATA.agenda} />
        <Contact />
        <Mobilize />
      </main>

      <Footer />
    </div>
  );
}

export default App;
