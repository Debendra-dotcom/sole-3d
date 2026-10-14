import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Hero() {
  return (
    <section style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '0 3rem',
      position: 'relative', pointerEvents: 'none',
    }}>
      <motion.div
        initial="hidden" animate="visible" custom={0.3} variants={fadeUp}
        style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '1rem' }}
      >
        New Collection 2025
      </motion.div>

      <motion.h1
        initial="hidden" animate="visible" custom={0.5} variants={fadeUp}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(5rem, 12vw, 10rem)',
          lineHeight: 0.9, color: '#f5f3ee',
        }}
      >
        SOLE<br /><span style={{ color: '#c8a96e' }}>3D</span>
      </motion.h1>

      <motion.p
        initial="hidden" animate="visible" custom={0.7} variants={fadeUp}
        style={{
          marginTop: '2rem', fontSize: '1rem', fontWeight: 300,
          color: 'rgba(245,243,238,0.45)', maxWidth: '300px', lineHeight: 1.7,
        }}
      >
        Luxury sneakers, precision-engineered. Every step, perfected.
      </motion.p>

      <motion.div
        initial="hidden" animate="visible" custom={0.9} variants={fadeUp}
        style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', pointerEvents: 'all' }}
      >
        <a href="#features" className="btn-primary">Explore Now</a>
        <a href="#story" className="btn-ghost">Learn more →</a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          width: 1, height: 50,
          background: 'linear-gradient(to bottom, rgba(200,169,110,0.8), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.22)' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
