import { useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    text: '"Looking for shoes built just for you? SOLE 3D is the way to go. Love the design and build quality."',
    author: 'Marcus T. — Dallas, TX',
  },
  {
    text: '"I love the shoes, the quality, and everything about them. Worth every single penny of the investment!"',
    author: 'Priya K. — New York, NY',
  },
  {
    text: '"The best and forever lasting shoes. Superb fit and comfort is literally the next level experience."',
    author: 'James R. — Chicago, IL',
  },
]

function TestimonialCard({ text, author, index }) {
  const ref = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => ref.current?.classList.add('visible'), index * 120) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref} className="reveal" style={{ padding: '2rem', border: '1px solid rgba(245,243,238,0.07)' }}>
      <div style={{ color: '#c8a96e', fontSize: '0.85rem', marginBottom: '1rem' }}>★★★★★</div>
      <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(245,243,238,0.62)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.5rem' }}>
        {text}
      </p>
      <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.28)' }}>
        {author}
      </div>
    </div>
  )
}

export default function Testimonials() {
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
    <section id="reviews" style={{
      padding: '8rem 3rem',
      background: 'rgba(200,169,110,0.03)',
      borderTop: '1px solid rgba(200,169,110,0.07)',
      borderBottom: '1px solid rgba(200,169,110,0.07)',
    }}>
      <div ref={headerRef} className="reveal" style={{ textAlign: 'center', marginBottom: '0' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem,8vw,7rem)', lineHeight: 1, color: '#f5f3ee' }}>
          WHAT PEOPLE<br />ARE SAYING
        </h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem', maxWidth: '1100px', margin: '3rem auto 0',
      }}>
        {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} {...t} index={i} />)}
      </div>
    </section>
  )
}
