import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../data/questions';

export default function Assessment({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const q = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;
  const isLast = current === QUESTIONS.length - 1;

  function handleSelect(value) {
    setSelected(value);
  }

  function handleNext() {
    if (!selected) return;
    const updated = { ...answers, [q.id]: selected };
    setAnswers(updated);

    if (isLast) {
      onComplete(updated);
    } else {
      setCurrent(c => c + 1);
      setSelected(answers[QUESTIONS[current + 1]?.id] || null);
    }
  }

  function handleBack() {
    if (current === 0) return;
    const prev = current - 1;
    setCurrent(prev);
    setSelected(answers[QUESTIONS[prev].id] || null);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs tracking-widest uppercase opacity-40">
            Question {current + 1} of {QUESTIONS.length}
          </span>
          <span className="text-xs opacity-40">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #C9A84C, #E8CF80)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }} />
        </div>
        {/* Step dots */}
        <div className="flex justify-between mt-2">
          {QUESTIONS.map((_, i) => (
            <motion.div key={i}
              className="w-1.5 h-1.5 rounded-full"
              animate={{
                background: i < current ? '#C9A84C' : i === current ? '#E8CF80' : 'rgba(255,255,255,0.15)',
                scale: i === current ? 1.4 : 1,
              }}
              transition={{ duration: 0.3 }} />
          ))}
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-2xl">

          <div className="glass rounded-3xl p-8 md:p-10">
            {/* Question header */}
            <div className="mb-8">
              <div className="text-4xl mb-4">{q.emoji}</div>
              <h2 className="font-display text-3xl md:text-4xl mb-2 font-light"
                style={{ color: '#F5F0E8' }}>
                {q.label}
              </h2>
              <p className="font-light opacity-50 text-sm">{q.subtitle}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isChosen = selected === opt.value;
                return (
                  <motion.button key={opt.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleSelect(opt.value)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full text-left rounded-2xl p-4 transition-all duration-200"
                    style={{
                      background: isChosen ? 'rgba(201, 168, 76, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: isChosen ? '1px solid rgba(201, 168, 76, 0.5)' : '1px solid rgba(255,255,255,0.06)',
                    }}>
                    <div className="flex items-center gap-4">
                      {/* Radio indicator */}
                      <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{
                          border: isChosen ? '2px solid #C9A84C' : '2px solid rgba(255,255,255,0.2)',
                          background: isChosen ? '#C9A84C' : 'transparent',
                        }}>
                        {isChosen && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full" style={{ background: '#0D0B09' }} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-0.5"
                          style={{ color: isChosen ? '#C9A84C' : '#F5F0E8' }}>
                          {opt.label}
                        </div>
                        <div className="text-xs font-light opacity-50">{opt.desc}</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {current > 0 && (
                <button onClick={handleBack}
                  className="flex-1 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,240,232,0.5)' }}>
                  ← Back
                </button>
              )}
              <motion.button onClick={handleNext}
                disabled={!selected}
                whileHover={selected ? { scale: 1.01 } : {}}
                whileTap={selected ? { scale: 0.99 } : {}}
                className="flex-[3] py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: selected ? 'linear-gradient(135deg, #C9A84C, #A07830)' : 'rgba(255,255,255,0.05)',
                  color: selected ? '#0D0B09' : 'rgba(245,240,232,0.2)',
                  cursor: selected ? 'pointer' : 'not-allowed',
                }}>
                {isLast ? '✨ Reveal My Dosha' : 'Next →'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
