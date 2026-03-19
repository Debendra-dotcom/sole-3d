import { useEffect, useRef } from 'react'

export default function Contact() {
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
    <>
      <section id="contact" style={{
        minHeight: '70vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '8rem 3rem', textAlign: 'center',
      }}>
        <div ref={ref} className="reveal" style={{ maxWidth: 600 }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3rem,8vw,6rem)', lineHeight: 0.95, marginBottom: '1.5rem',
          }}>
            STEP INTO<br /><span style={{ color: '#c8a96e' }}>THE FUTURE</span>
          </h2>
          <p style={{
            fontSize: '0.93rem', fontWeight: 300,
            color: 'rgba(245,243,238,0.42)', lineHeight: 1.7, marginBottom: '3rem',
          }}>
            Ready to experience footwear engineered for excellence? Visit us in Dallas or reach out —
            we're here for every step of your journey.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="btn-primary">Shop Collection</a>
            <a href="#" className="btn-ghost">Visit Store →</a>
          </div>
          <p style={{ marginTop: '3rem', fontSize: '0.7rem', color: 'rgba(245,243,238,0.18)', letterSpacing: '0.15em' }}>
            Dallas, Texas · +1 559 011 209 10
          </p>
        </div>
      </section>

      <footer style={{
        padding: '2rem 3rem',
        borderTop: '1px solid rgba(245,243,238,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '0.7rem', color: 'rgba(245,243,238,0.18)',
      }}>
        <span>© 2025 The Shoe Company</span>
        <span>Premium Footwear Since 1998</span>
      </footer>
    </>
  )
}
