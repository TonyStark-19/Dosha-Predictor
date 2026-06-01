import { motion } from 'framer-motion';
import { DOSHA_INFO } from '../data/questions';

function ConfidenceRing({ confidence, color, size = 120 }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * confidence;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }} />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-2xl font-light" style={{ color }}>
          {Math.round(confidence * 100)}%
        </div>
      </div>
    </div>
  );
}

export default function Results({ result, onRetake }) {
  const { primaryDosha, confidence, secondaryDosha, secondaryConfidence, keyTraits } = result;
  const info = DOSHA_INFO[primaryDosha];
  const secInfo = DOSHA_INFO[secondaryDosha];

  if (!info) return null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${info.color}20 0%, transparent 70%)`, filter: 'blur(40px)' }} />

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 opacity-40">Your Ayurvedic Constitution</p>
          <h1 className="font-display text-6xl md:text-8xl font-light mb-2"
            style={{ color: info.color }}>{primaryDosha}</h1>
          <p className="font-display italic text-xl opacity-60">{info.element} · {info.symbol}</p>
        </motion.div>

        {/* Primary + Secondary Dosha cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Primary */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-6 text-center"
            style={{ borderColor: `${info.color}30` }}>
            <p className="text-xs tracking-widest uppercase mb-4 opacity-40">Primary Dosha</p>
            <ConfidenceRing confidence={confidence} color={info.color} size={130} />
            <h2 className="font-display text-3xl mt-4 mb-1" style={{ color: info.color }}>{primaryDosha}</h2>
            <p className="text-xs opacity-40">{Math.round(confidence * 100)}% confidence</p>
          </motion.div>

          {/* Secondary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="glass rounded-3xl p-6 text-center">
            <p className="text-xs tracking-widest uppercase mb-4 opacity-40">Secondary Dosha</p>
            <ConfidenceRing confidence={secondaryConfidence} color={secInfo?.color || '#888'} size={130} />
            <h2 className="font-display text-3xl mt-4 mb-1" style={{ color: secInfo?.color }}>{secondaryDosha}</h2>
            <p className="text-xs opacity-40">{Math.round(secondaryConfidence * 100)}% influence</p>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-6 mb-6">
          <p className="font-display italic text-lg mb-3 font-light" style={{ color: info.color }}>
            About Your Constitution
          </p>
          <p className="text-sm font-light leading-relaxed opacity-70">{info.description}</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs opacity-40 mb-2 tracking-wider uppercase">Natural Strengths</p>
              {info.qualities.map(q => (
                <div key={q} className="text-xs mb-1 flex items-center gap-2">
                  <span style={{ color: info.color }}>◆</span> {q}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs opacity-40 mb-2 tracking-wider uppercase">Watch For</p>
              {info.imbalanceSigns.map(s => (
                <div key={s} className="text-xs mb-1 flex items-center gap-2">
                  <span className="opacity-40">◇</span> {s}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Traits (XAI) */}
        {keyTraits && keyTraits.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-6 mb-6"
            style={{ borderColor: 'rgba(201, 168, 76, 0.15)' }}>
            <p className="text-xs tracking-widest uppercase mb-2 opacity-40">Why This Prediction?</p>
            <h3 className="font-display text-xl mb-4 font-light" style={{ color: '#C9A84C' }}>Key Traits Identified</h3>
            <div className="grid grid-cols-2 gap-2">
              {keyTraits.map((trait, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm">
                  <span style={{ color: '#C9A84C' }}>✓</span>
                  <span className="font-light opacity-70">{trait}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs opacity-30 mt-4 font-light">
              These traits most strongly influenced the model's prediction based on SHAP analysis of your responses.
            </p>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <p className="text-xs tracking-widest uppercase mb-4 opacity-40 text-center">Personalized Wellness</p>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {info.recommendations.map((rec, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="glass rounded-2xl p-5"
                style={{ borderColor: `${info.color}15` }}>
                <div className="text-2xl mb-3">{rec.icon}</div>
                <h4 className="font-medium text-sm mb-1" style={{ color: info.color }}>{rec.title}</h4>
                <p className="text-xs font-light opacity-50 leading-relaxed">{rec.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-center">
          <button onClick={onRetake}
            className="px-10 py-3 rounded-full text-sm font-medium transition-all"
            style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
            onMouseEnter={e => e.target.style.background = 'rgba(201,168,76,0.1)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}>
            ↺ Retake Assessment
          </button>
          <p className="mt-4 text-xs opacity-20">
            This assessment is for educational purposes only and does not constitute medical advice.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
