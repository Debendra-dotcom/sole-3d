import { useEffect, useRef } from 'react'

export default function StorySection({ id, align = 'left', label, title, body, stats }) {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible') },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '8rem 3rem',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <div ref={ref} className="reveal" style={{ maxWidth: 400 }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '1.2rem' }}>
          {label}
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1,
          color: '#f5f3ee', marginBottom: '1.5rem',
        }}>
          {title}
        </h2>
        <p style={{ fontSize: '0.93rem', fontWeight: 300, color: 'rgba(245,243,238,0.48)', lineHeight: 1.8 }}>
          {body}
        </p>
        {stats && (
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '3rem' }}>
            {stats.map(({ number, label: statLabel }) => (
              <div key={statLabel}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', color: '#c8a96e', lineHeight: 1 }}>
                  {number}
                </div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.32)', marginTop: '0.3rem' }}>
                  {statLabel}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
