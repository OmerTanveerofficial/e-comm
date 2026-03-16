import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ChurnPredictor from './components/ChurnPredictor';
import FeatureEngineering from './components/FeatureEngineering';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ChurnPredictor />
        <FeatureEngineering />
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}

export default App;
