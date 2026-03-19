import { useEffect, useRef } from 'react'

const FEATURES = [
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M17 2L2 11v9l15 12 15-12v-9L17 2z" stroke="#c8a96e" strokeWidth="1.5" />
        <path d="M17 2v22M2 11l15 9 15-9" stroke="#c8a96e" strokeWidth="1" opacity=".4" />
      </svg>
    ),
    title: 'Premium Leather',
    body: 'Full-grain Italian leather upper, tanned using century-old methods for unmatched durability and patina.',
  },
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="13" stroke="#c8a96e" strokeWidth="1.5" />
        <circle cx="17" cy="17" r="5" stroke="#c8a96e" strokeWidth="1" opacity=".5" />
        <path d="M17 4v4M17 26v4M4 17h4M26 17h4" stroke="#c8a96e" strokeWidth="1" opacity=".4" />
      </svg>
    ),
    title: 'Air Cushion',
    body: 'Patented micro-air pocket system distributes pressure evenly across every stride.',
  },
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M5 29L17 5l12 24H5z" stroke="#c8a96e" strokeWidth="1.5" />
        <path d="M9 21h16" stroke="#c8a96e" strokeWidth="1" opacity=".4" />
      </svg>
    ),
    title: 'Carbon Sole',
    body: 'Carbon-fiber reinforced outsole provides rigidity where needed, flex where it counts.',
  },
  {
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M8 17c0-5 4-9 9-9s9 4 9 9-4 9-9 9-9-4-9-9z" stroke="#c8a96e" strokeWidth="1.5" />
        <path d="M17 11v6l3.5 3.5" stroke="#c8a96e" strokeWidth="1" opacity=".5" />
      </svg>
    ),
    title: 'Lifetime Support',
    body: 'Complimentary resoling and conditioning for the life of the shoe. No asterisks.',
  },
]

function FeatureCard({ icon, title, body, index }) {
  const ref = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => ref.current?.classList.add('visible'), index * 100) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        background: 'rgba(245,243,238,0.03)',
        border: '1px solid rgba(245,243,238,0.06)',
        padding: '2.5rem',
        transition: 'opacity 0.6s ease, transform 0.6s ease, background 0.3s, border-color 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(200,169,110,0.05)'
        e.currentTarget.style.borderColor = 'rgba(200,169,110,0.18)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(245,243,238,0.03)'
        e.currentTarget.style.borderColor = 'rgba(245,243,238,0.06)'
      }}
    >
      <div style={{ marginBottom: '1.2rem', opacity: 0.8 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.55rem', color: '#f5f3ee', marginBottom: '0.7rem', letterSpacing: '0.04em' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(245,243,238,0.38)', lineHeight: 1.7 }}>
        {body}
      </p>
    </div>
  )
}

export default function Features() {
  const headerRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) headerRef.current?.classList.add('visible') },
      { threshold: 0.15 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" style={{ padding: '8rem 3rem' }}>
      <div ref={headerRef} className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem,8vw,7rem)', lineHeight: 1, color: '#f5f3ee' }}>
          WHY WE'RE<br />DIFFERENT
        </h2>
        <p style={{ fontSize: '0.93rem', fontWeight: 300, color: 'rgba(245,243,238,0.38)', marginTop: '1rem', maxWidth: '380px', marginInline: 'auto' }}>
          Every detail obsessed over. Every material tested. Built for those who demand more.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2px', maxWidth: '1200px', margin: '0 auto',
      }}>
        {FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
      </div>
    </section>
  )
}
