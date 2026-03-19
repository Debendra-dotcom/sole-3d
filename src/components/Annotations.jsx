import { useEffect, useState } from 'react'

const ANNOTATIONS = [
  'Premium leather upper',
  'Air-cushioned midsole',
  'Carbon rubber outsole',
]

export default function Annotations() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      position: 'fixed', right: '2.5rem', top: '50%',
      transform: 'translateY(-50%)', zIndex: 20,
      pointerEvents: 'none', display: 'flex',
      flexDirection: 'column', gap: '0.8rem',
    }}>
      {ANNOTATIONS.map((text, i) => (
        <div
          key={text}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.7rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(15px)',
            transition: `opacity 0.5s ease ${0.2 + i * 0.15}s, transform 0.5s ease ${0.2 + i * 0.15}s`,
          }}
        >
          <div style={{ width: 4, height: 4, background: '#c8a96e', borderRadius: '50%', flexShrink: 0 }} />
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.32)' }}>
            {text}
          </span>
        </div>
      ))}
    </div>
  )
}
