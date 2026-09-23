import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Material } from './pages/Material';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/material" element={<Material />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
