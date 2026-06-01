import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 6 + 8,
}));

export default function Landing({ onStart }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #7B9E87 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #C8773A 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: '#C9A84C' }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Sanskrit header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="mb-6">
          <span className="text-sm tracking-[0.4em] uppercase font-light"
            style={{ color: '#C9A84C', fontFamily: 'DM Sans' }}>
            आयुर्वेद · Ancient Wisdom
          </span>
        </motion.div>

        {/* Logo/Title */}
        <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display mb-4 leading-none"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', color: '#F5F0E8', fontWeight: 300 }}>
          Ayurveda
          <span style={{ color: '#C9A84C' }}>AI</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="font-display italic mb-10 text-xl md:text-2xl font-light"
          style={{ color: 'rgba(245, 240, 232, 0.6)' }}>
          Discover your unique mind-body constitution
        </motion.p>

        {/* Dosha badges */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="flex justify-center gap-4 mb-12 flex-wrap">
          {[
            { name: 'Vata', element: 'Air & Space', color: '#7B9E87', symbol: '🌬️' },
            { name: 'Pitta', element: 'Fire & Water', color: '#C8773A', symbol: '🔥' },
            { name: 'Kapha', element: 'Earth & Water', color: '#5B7FA6', symbol: '🌊' },
          ].map((d, i) => (
            <motion.div key={d.name}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="glass rounded-xl px-5 py-3 text-center"
              style={{ borderColor: `${d.color}30` }}>
              <div className="text-lg mb-1">{d.symbol}</div>
              <div className="font-display text-lg" style={{ color: d.color }}>{d.name}</div>
              <div className="text-xs opacity-50 font-light">{d.element}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-sm md:text-base font-light leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: 'rgba(245, 240, 232, 0.5)' }}>
          Answer 11 simple questions about your natural constitution.
          Our AI model, trained on Ayurvedic principles, will reveal your dominant Dosha and provide personalized wellness guidance.
        </motion.p>

        {/* CTA Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <motion.button onClick={onStart}
            whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="relative px-12 py-4 rounded-full font-medium text-lg tracking-wide overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: '#0D0B09' }}>
            <span className="relative z-10">Begin Your Assessment</span>
            <motion.div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #E8CF80, #C9A84C)' }}
              initial={{ x: '-100%' }} whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }} />
          </motion.button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="mt-8 text-xs opacity-30 font-light">
          ⚕️ Educational wellness tool only · Not medical advice · Anonymous & private
        </motion.p>
      </div>

      {/* Bottom decorative line */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C40, transparent)' }} />
    </div>
  );
}
