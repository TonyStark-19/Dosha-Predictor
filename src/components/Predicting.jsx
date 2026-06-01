import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STEPS = [
  'Analyzing your constitution...',
  'Consulting ancient wisdom...',
  'Mapping your Prakriti...',
  'Generating your profile...',
];

export default function Predicting() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % STEPS.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Spinning mandala */}
      <div className="relative w-48 h-48 mb-10">
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: i === 0 ? '#C9A84C40' : i === 1 ? '#7B9E8740' : '#C8773A40',
              scale: 1 - i * 0.15,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-display text-5xl" style={{ color: '#C9A84C' }}>
            ॐ
          </motion.div>
        </div>
      </div>

      <motion.p key={step}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        className="font-display italic text-xl font-light" style={{ color: 'rgba(245,240,232,0.6)' }}>
        {STEPS[step]}
      </motion.p>

      <div className="flex gap-2 mt-6">
        {STEPS.map((_, i) => (
          <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
            animate={{ background: i === step ? '#C9A84C' : 'rgba(255,255,255,0.15)' }} />
        ))}
      </div>
    </div>
  );
}
