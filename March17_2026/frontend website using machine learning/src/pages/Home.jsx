import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import ChurnPredictor from '../components/ChurnPredictor';
import FeatureEngineering from '../components/FeatureEngineering';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ChurnPredictor />
      <FeatureEngineering />
      <Dashboard />
    </>
  );
}
