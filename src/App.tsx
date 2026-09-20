import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Biography } from './components/Biography';
import { Proposals } from './components/Proposals';
import { Projects } from './components/Projects';
import { Agenda } from './components/Agenda';
import { Footer } from './components/Footer';

// Agenda gerencia seu próprio state diretamente de forma dinâmica.

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      
      <main>
        <Hero />
        <Biography />
        <Proposals />
        <Projects />
        <Agenda />
      </main>

      <Footer />
    </div>
  );
}

export default App;
