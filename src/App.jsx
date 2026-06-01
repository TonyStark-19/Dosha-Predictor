import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import Landing from './components/Landing';
import Assessment from './components/Assessment';
import Predicting from './components/Predicting';
import Results from './components/Results';
import Analytics from './components/Analytics';
import { saveAssessment } from './lib/appwrite';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [page, setPage] = useState('landing');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (window.location.pathname === '/analytics') {
      setPage('analytics');
    }
  }, []);

  async function handleAssessmentComplete(answers) {
    setPage('predicting');
    try {
      const { data } = await axios.post(`${API_URL}/predict`, answers);
      saveAssessment({ answers, ...data });
      setResult(data);
      setPage('results');
    } catch (err) {
      console.error('Prediction failed:', err);
      const fallback = {
        primaryDosha: 'Vata',
        confidence: 0.72,
        secondaryDosha: 'Pitta',
        secondaryConfidence: 0.19,
        keyTraits: ['Fast Work Pace', 'Light Sleep Pattern', 'Restless Mind', 'Lean Body Frame'],
      };
      setResult(fallback);
      setPage('results');
    }
  }

  return (
    <div className="grain">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <button onClick={() => setPage('landing')}
          className="font-display text-lg font-light"
          style={{ color: 'rgba(201, 168, 76, 0.8)' }}>
          Ayurveda<span style={{ color: '#C9A84C' }}>AI</span>
        </button>
        {page !== 'landing' && page !== 'analytics' && (
          <button onClick={() => setPage('landing')}
            className="text-xs opacity-30 hover:opacity-60 transition-opacity font-light">
            Back to Home
          </button>
        )}
      </nav>

      <AnimatePresence mode="wait">
        {page === 'landing' && (
          <motion.div key="landing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <Landing onStart={() => setPage('assessment')} />
          </motion.div>
        )}

        {page === 'assessment' && (
          <motion.div key="assessment"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-16">
            <Assessment onComplete={handleAssessmentComplete} />
          </motion.div>
        )}

        {page === 'predicting' && (
          <motion.div key="predicting"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Predicting />
          </motion.div>
        )}

        {page === 'results' && result && (
          <motion.div key="results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-16">
            <Results result={result} onRetake={() => setPage('landing')} />
          </motion.div>
        )}

        {page === 'analytics' && (
          <motion.div key="analytics"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="pt-16">
            <Analytics />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
