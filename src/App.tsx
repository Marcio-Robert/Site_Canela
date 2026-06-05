
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { Biography } from './components/Biography';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Mobilize } from './components/Mobilize';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      
      <main>
        <Hero />
        <Metrics />
        <Biography />
        <Projects />
        <Contact />
        <Mobilize />
      </main>

      <Footer />
    </div>
  );
}

export default App;
