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
            Reach out to the SOLE 3D team with questions about our collection. Contact details below are provided for demo purposes only.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="btn-primary">Shop Collection</a>
            <a href="#" className="btn-ghost">Visit Store →</a>
          </div>
          <div className="contact-details">
            <a className="contact-detail" href="mailto:hello@sole3d.demo">
              <span className="contact-label">Email</span><span className="contact-value">hello@sole3d.demo</span>
            </a>
            <a className="contact-detail" href="tel:+15551234567">
              <span className="contact-label">Phone</span><span className="contact-value">+1 (555) 123-4567</span>
            </a>
            <div className="contact-detail">
              <span className="contact-label">Address</span><span className="contact-value">123 Fashion Avenue, New York, NY</span>
            </div>
            <a className="contact-detail" href="https://www.instagram.com/sole3d/" target="_blank" rel="noreferrer">
              <span className="contact-label">Instagram</span><span className="contact-value">@sole3d</span>
            </a>
            <div className="contact-detail">
              <span className="contact-label">Working Hours</span><span className="contact-value">Monday–Saturday, 10 AM–7 PM</span>
            </div>
          </div>
          <p className="demo-note">Demo information only. These are not real contact details.</p>
        </div>
      </section>

      <footer style={{
        padding: '2rem 3rem',
        borderTop: '1px solid rgba(245,243,238,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '0.7rem', color: 'rgba(245,243,238,0.18)',
      }}>
        <div className="footer-brand">
          <span>© 2025 SOLE 3D</span>
          <span>Luxury Sneakers Since 1998</span>
          <span className="footer-demo">Demo information only. These are not real contact details.</span>
        </div>
        <div className="footer-contact">
          <a href="mailto:hello@sole3d.demo">hello@sole3d.demo</a>
          <a href="tel:+15551234567">+1 (555) 123-4567</a>
          <span>123 Fashion Avenue, New York, NY</span>
          <a href="https://www.instagram.com/sole3d/" target="_blank" rel="noreferrer">@sole3d</a>
          <span>Monday–Saturday, 10 AM–7 PM</span>
        </div>
      </footer>
    </>
  )
}
